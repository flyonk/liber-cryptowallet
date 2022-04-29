import { setUser, captureException } from '@sentry/browser';
import { cloneDeep } from 'lodash';

import { useProfileStore } from '@/stores/profile';
import { IProfile } from '@/models/profile/profile';
import { CaptureContext } from '@sentry/types/types/scope';
import { Primitive } from '@sentry/types/types/misc';
import { AxiosError } from 'axios';

export default {
  setUser(): void {
    const userStore = useProfileStore();
    const user: Partial<IProfile> = userStore.user.id
      ? userStore.user
      : {
          user: 'Unknown user',
        };
    setUser(user);
  },
  capture(
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
    error: Error | AxiosError | any,
    componentName: string,
    componentContext: string,
    description?: string,
    _extra: Record<string, unknown> = {},
    _tags: Record<string, Primitive> = {}
  ): void {
    // additional information
    const extra = cloneDeep(_extra);
    const tags = cloneDeep(_tags);

    tags.api = false;
    tags.isAxiosError = error.isAxiosError;
    const component = `${componentName}@${componentContext}`;
    tags.component = component;

    if (error.message) {
      tags.originalMessage = error.message;

      const message = description
        ? `${component}: ${description} | Original description: ${error.message}`
        : `${component}: ${error.message}`;
      error.message = message;
    }

    // for xhr errors we have 3 cases to handle:
    // case #1:
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    // It contains `error.response` property at least
    // case #2:
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser
    // case #3:
    // Something happened in setting up the request that triggered an Error
    if (error.response) {
      // case 1
      if (error.response?.status && error.response?.config) {
        tags.api = true;
        extra.method = error.response.config.method;
        extra.url = error.response.config.url;
      }

      if (error.response?.config?.data) {
        extra.params = JSON.parse(error.response.config.data);
      }

      if (error.response.data && error.response.data.errorCode) {
        tags.errorCode = error.response.data.errorCode;
      }
    } else if (error.request) {
      // case #2
      if (error.request) {
        tags.api = true;
      }

      if (error.request?.errorCode) {
        tags.errorCode = error.request.errorCode;
      }

      if (error.request?.responseURL) {
        extra.url = error.request.responseURL;
      }
    }

    const context: CaptureContext = {
      extra,
      tags,
    };

    captureException(error, context);
  },
};
