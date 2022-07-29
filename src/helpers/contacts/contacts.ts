import type {
  ContactsPlugin,
  PermissionStatus,
  Contact,
  NewContact,
} from './definitions';

const UNIMPLEMENTED_CODE_ERROR = 'UNIMPLEMENTED';

function ContactException(message: string, code: string) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  this.message = message;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  this.code = code;
}

export class ContactsPluginWeb implements ContactsPlugin {
  async getPermissions(): Promise<PermissionStatus> {
    throw new (ContactException as any)(
      'getPermissions - Not implemented on web.',
      UNIMPLEMENTED_CODE_ERROR
    );
  }

  async getContacts(): Promise<{ contacts: Contact[] }> {
    throw new (ContactException as any)(
      'getContacts - Not implemented on web.',
      UNIMPLEMENTED_CODE_ERROR
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async saveContact(_: NewContact): Promise<void> {
    throw new (ContactException as any)(
      'saveContact - Not implemented on web.',
      UNIMPLEMENTED_CODE_ERROR
    );
  }
}

const Contacts = new ContactsPluginWeb();

export { Contacts };
