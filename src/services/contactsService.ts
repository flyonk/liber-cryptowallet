import axios from 'axios';
import apiService from '@/services/apiService';
import {
  TInviteLink,
  TIPhoneContacts,
  TLiberContact,
  TLiberContacts,
  TPaymentLink,
  TErrorResponse,
  TSuccessResponse,
} from '@/types/api';

//TODO: deserialize api responses - every method should return mapped model

export default {
  async getFriends(): Promise<TLiberContacts | TErrorResponse> {
    return await axios.get(apiService.recipients.contacts());
  },

  async createContact(
    data: TLiberContact
  ): Promise<TSuccessResponse | TErrorResponse> {
    return await axios.post(apiService.recipients.contacts(), data);
  },

  async editContact(
    id: string,
    data: TLiberContact
  ): Promise<TSuccessResponse | TErrorResponse> {
    return await axios.put(`${apiService.recipients.contacts()}/${id}`, data);
  },

  async syncContacts(
    data: TIPhoneContacts
  ): Promise<TLiberContacts | TErrorResponse> {
    return await axios.post(apiService.recipients.sync(), data);
  },

  async getInviteLink(): Promise<TInviteLink | TErrorResponse> {
    return await axios.get(apiService.recipients.invite());
  },

  async getPaymentLink(): Promise<TPaymentLink | TErrorResponse> {
    return await axios.get(apiService.recipients.payment());
  },
};
