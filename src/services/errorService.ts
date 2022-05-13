import SentryUtil from '@/helpers/sentryUtil';
import { AxiosError, AxiosResponse } from 'axios';
import { Primitive } from '@sentry/types/types/misc';

export default {
  async logError(
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    error: AxiosError | Error | any,
    componentName: string,
    componentContext: string,
    description?: string,
    _extra?: Record<string, unknown>,
    _tags?: Record<string, Primitive>
  ): Promise<void> {
    SentryUtil.capture(
      error,
      componentName,
      componentContext,
      description,
      _extra,
      _tags
    );
  },
  makeErrorMessage(
    description = 'Oops, something went wrong.',
    incidentId?: string
  ): string {
    // todo: for further incident tracking through system
    if (incidentId) {
      return (
        description +
        '\nIf you would like to contact us, please use the following reference in your correspondence, so that we can help you quickly: \n' +
        incidentId +
        '\n' +
        'We apologize for the inconvenience.\n'
      );
    }

    return description;
  },
  // use this custom catcher to get all failed responses from .allSettled promise method
  catchErrorsFromAxiosResponses(
    responses: Array<PromiseSettledResult<AxiosResponse>>
  ): Array<AxiosError> {
    return responses
      .filter((res): res is PromiseRejectedResult => res.status === 'rejected')
      .map((rejectedRes): AxiosError => rejectedRes.reason);
  },
};
