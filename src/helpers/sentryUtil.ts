import { setUser, captureException } from '@sentry/browser';
import { cloneDeep } from 'lodash';

//TODO: This is a stub interface - import interface from model
interface IUser {
  id?: string;
  userName?: string;
  email?: string;
}

export default {
  setUser(): void {
    //TODO: get user data from store
    const user: IUser = {
      id: '1234',
      userName: 'cw user',
      email: 'cwtestuser@mail.com',
    };
    setUser({
      id: user?.id,
      username: user?.userName,
      email: user?.email,
    });
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
