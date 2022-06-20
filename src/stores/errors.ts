import { defineStore } from 'pinia';
import errorService from '@/services/errorService';
import { AxiosError } from 'axios';
import { Component } from 'vue';

interface IError {
  err: AxiosError | Error | any;
  name: string;
  ctx: string;
  description?: string;
  display?: boolean;
  customErrorComponent?: Component;
}

interface ICustomError {
  err: AxiosError | Error | any;
  title: string;
  ctx: string;
  description: string;
  display?: boolean;
  severity?: 'error' | 'offline';
  customErrorComponent?: Component;
  confirmTitle: string;
  cancelTitle?: string;
  confirmCallback: () => void;
  cancelCallback?: () => void;
}

interface ErrorState {
  errors: Array<IError>;
  customError: ICustomError | undefined;
}

export const useErrorsStore = defineStore('errors', {
  state: (): ErrorState => ({
    errors: [],
    customError: undefined,
  }),

  getters: {
    displayCurrent: (state: ErrorState) => state.errors.length > 0,
    isSingleError: (state: ErrorState) => state.errors.length === 1,
    isMultipleErrors: (state: ErrorState) => state.errors.length > 1,
    getCustomComponent: (state: ErrorState) =>
      state.errors[0].customErrorComponent,
    severity: (state: ErrorState) => state.customError?.severity,
  },

  actions: {
    async handle({
      err,
      name,
      ctx,
      description,
      display = true,
      customErrorComponent,
    }: IError): Promise<void> {
      console.log(err.message);
      if (err.message.includes('Network Error')) return;
      if (display) {
        this.errors.push({
          err,
          name,
          ctx,
          description,
          customErrorComponent,
        });
      }
      await errorService.logError(err, name, ctx, description);
    },

    async handleCustom(config: ICustomError): Promise<void> {
      this.errors = [];
      this.customError = config;
      await errorService.logError(
        config.err,
        'Network Error',
        config.ctx,
        config.err.message
      );
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

    async hideError(): Promise<void> {
      if (this.customError) this.customError.display = false;
      this.customError = undefined;
    },

    getErrorMessage(): string {
      return this.errors.length > 0
        ? errorService.makeErrorMessage(this.errors?.[0])
        : '';
    },
  },
});
