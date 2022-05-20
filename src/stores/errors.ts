import { defineStore } from 'pinia';
import errorService from '@/services/errorService';
import { AxiosError } from 'axios';

interface IError {
  err: AxiosError | Error | unknown;
  name: string;
  ctx: string;
  description?: string;
}

interface IErrors {
  errors: Array<IError>;
}

export const useErrorsStore = defineStore('errors', {
  state: (): IErrors => ({
    errors: [],
  }),

  getters: {
    displayCurrent: (state: IErrors) => state.errors.length > 0,
    isSingleError: (state: IErrors) => state.errors.length === 1,
    isMultipleErrors: (state: IErrors) => state.errors.length > 1,
  },

  actions: {
    async handle(
      /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
      err: AxiosError | Error | any,
      name: string,
      ctx: string,
      description?: string
    ): Promise<void> {
      this.errors.push({ err, name, ctx, description });
      // await errorService.logError(err, name, ctx, description);
    },

    async multiErrorHandler(
      /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
      errors: Array<AxiosError | Error | any>,
      name: string,
      ctx: string,
      description?: string
    ): Promise<void> {
      this.errors.push(
        ...errors.map((err) => {
          return { err, name, ctx, description };
        })
      );

      await Promise.all(
        errors.map((err) => errorService.logError(err, name, ctx, description))
      );
    },

    async hideCurrent(): Promise<void> {
      if (this.errors.length > 0) {
        this.errors.splice(0, 1);
      }
    },

    getErrorMessage(): string {
      return this.errors.length > 0
        ? errorService.makeErrorMessage(this.errors?.[0])
        : '';
    },
  },
});
