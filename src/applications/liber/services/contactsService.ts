import axios from 'axios';
import apiService from '@/applications/liber/services/apiService';

import contactsMapper, {
  ILiberContact,
} from '@/applications/liber/models/recipient/liberContact';
import IPhoneContactMapper, {
  IIPhoneContact,
} from '@/applications/liber/models/recipient/iPhoneContact';

import { TInviteLink, TPaymentLink, TSuccessResponse } from '@/types/api';

export default {
  async getFriends(): Promise<ILiberContact[]> {
    const res = await axios.get(apiService.recipients.contacts());
    return res.data.map(contactsMapper.deserialize);
  },

  async createContact(data: ILiberContact): Promise<TSuccessResponse> {
    const res = await axios.post(
      apiService.recipients.contacts(),
      contactsMapper.requestSerialize(data)
    );
    return res.data;
  },

  async editContact(
    id: string,
    data: Partial<ILiberContact>
  ): Promise<TSuccessResponse> {
    return (await axios.put(`${apiService.recipients.contacts()}/${id}`, data))
      .data;
  },

  async syncContacts(data: IIPhoneContact[]): Promise<ILiberContact[]> {
    const contactsToSync = data.map(IPhoneContactMapper.requestSerialize);
    const res = await axios.post(apiService.recipients.sync(), contactsToSync);
    return res.data.map(contactsMapper.deserialize);
  },

  async getInviteLink(): Promise<TInviteLink> {
    return (await axios.get(apiService.recipients.invite())).data;
  },

  async getPaymentLink(): Promise<TPaymentLink> {
    return (await axios.get(apiService.recipients.payment())).data;
  },
};
