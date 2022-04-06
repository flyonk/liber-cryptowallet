import { setUser, captureException } from '@sentry/browser';
import { cloneDeep } from 'lodash';

import { useProfileStore } from '@/stores/profile';
import { IProfile } from '@/models/profile/profile';

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
    error: any,
    componentName: string,
    componentContext: string,
    description = '',
    _extra = {},
    _tags = {}
  ): void {
    const response = error.response;

    const extra = cloneDeep(_extra) as any;
    const tags = cloneDeep(_tags) as any;
    tags.api = false;

    const component = `${componentName}@${componentContext}`;
    tags.component = component;
    const message = description ? `${component} - ${description}` : component;

    if (response) {
      if (response.status) {
        tags.api = true;
        extra.method = response.config.method;
        extra.url = response.config.url;
        extra.params = JSON.parse(response.config.data);
      }

      if (response.data && response.data.errorCode) {
        tags.errorCode = response.data.errorCode;
      }
    }

    const context = {
      extra,
      tags,
    };

    error.message = message;
    captureException(error, context);
  },
};
