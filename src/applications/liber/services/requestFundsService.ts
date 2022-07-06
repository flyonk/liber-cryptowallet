import axios from 'axios';
import apiService from '@/applications/liber/services/apiService';

import paymentLinkMapper, {
  IPaymentLink,
} from '@/models/transaction/paymentLink';
import {
  TCreateRequestFundsData,
  TStatement,
  TSuccessResponse,
} from '@/types/api';

export default {
  async downloadStatement(id: string): Promise<TStatement> {
    return (
      await axios.post(
        `${apiService.transactions.requestFunds()}/${id}/statement`
      )
    ).data;
  },

  async getPaymentLink(id: string): Promise<IPaymentLink> {
    const res = await axios.get(
      `${apiService.transactions.requestFunds()}/${id}`
    );
    return paymentLinkMapper.deserialize(res.data);
  },

  async cancelRequestFunds(id: string): Promise<TSuccessResponse> {
    return (
      await axios.post(`${apiService.transactions.requestFunds()}/${id}/cancel`)
    ).data;
  },

  async sendRequestedFunds(id: string): Promise<TSuccessResponse> {
    return (
      await axios.post(`${apiService.transactions.requestFunds()}/${id}/send`)
    ).data;
  },

  async declineRequestedFunds(id: string): Promise<TSuccessResponse> {
    return (
      await axios.post(
        `${apiService.transactions.requestFunds()}/${id}/decline`
      )
    ).data;
  },

  async createRequestFunds(
    id: string,
    data: TCreateRequestFundsData
  ): Promise<TSuccessResponse> {
    return (await axios.post(apiService.transactions.requestFunds(), data))
      .data;
  },
};
