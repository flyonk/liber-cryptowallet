import {
  IApiService,
  IContactsService,
  TInviteLink,
  TIPhoneContacts,
  TLiberContact,
  TLiberContacts,
  TPaymentLink,
  TSuccessResponse,
  TErrorResponse,
} from '@/types/api';
import { AUTH_API_URL } from '@/constants';
import OldApiService from '@/services/OldApiService';

const URL = AUTH_API_URL;

class ContactsService implements IContactsService {
  private _apiServiceInstance: IApiService;

  private url: string;

  constructor() {
    this.url = 'contacts';

    if (URL) {
      this.url = URL;
    }

    this._apiServiceInstance = OldApiService.getInstance();
  }

  async getFriends() {
    const url = `${this.url}`;
    const res: TLiberContacts | TErrorResponse =
      await this._apiServiceInstance.fetch.get(url);
    return res;
  }

  async createContact(data: TLiberContact) {
    const url = `${this.url}`;
    const res: TSuccessResponse | TErrorResponse =
      await this._apiServiceInstance.fetch.post(url, data);
    return res;
  }

  async editContact(
    id: string,
    data: TLiberContact
  ): Promise<TSuccessResponse | TErrorResponse> {
    const url = `${this.url}/${id}`;
    const res: TSuccessResponse | TErrorResponse =
      await this._apiServiceInstance.fetch.put(url, data);
    return res;
  }

  async syncContacts(
    data: TIPhoneContacts
  ): Promise<TLiberContacts | TErrorResponse> {
    const url = 'contacts-sync';
    const res: TLiberContacts | TErrorResponse =
      await this._apiServiceInstance.fetch.post(url, data);
    return res;
  }

  async getInviteLink(): Promise<TInviteLink | TErrorResponse> {
    const url = 'invite';
    const res: TInviteLink | TErrorResponse =
      await this._apiServiceInstance.fetch.get(url);
    return res;
  }

  async getPaymentLink(): Promise<TPaymentLink | TErrorResponse> {
    const url = 'payment-link';
    const res: TPaymentLink | TErrorResponse =
      await this._apiServiceInstance.fetch.get(url);
    return res;
  }
}

export default ContactsService;
