import axios from 'axios';
import apiService from '@/services/apiService';
import {
  TCreateRequestFundsData,
  TErrorResponse,
  TRequestFundsPaymentLink,
  TStatement,
  TSuccessResponse,
} from '@/types/api';

//TODO: deserialize api responses - every method should return mapped model

export default {
  async downloadStatement(id: string): Promise<TStatement | TErrorResponse> {
    return await axios.post(
      `${apiService.transactions.requestFunds()}/${id}/statement`
    );
  },

  async getPaymentLink(
    id: string
  ): Promise<TRequestFundsPaymentLink | TErrorResponse> {
    return await axios.get(`${apiService.transactions.requestFunds()}/${id}`);
  },

  async cancelRequestFunds(
    id: string
  ): Promise<TSuccessResponse | TErrorResponse> {
    return await axios.post(
      `${apiService.transactions.requestFunds()}/${id}/cancel`
    );
  },

  async sendRequestedFunds(
    id: string
  ): Promise<TSuccessResponse | TErrorResponse> {
    return await axios.post(
      `${apiService.transactions.requestFunds()}/${id}/send`
    );
  },

  async declineRequestedFunds(
    id: string
  ): Promise<TSuccessResponse | TErrorResponse> {
    return await axios.post(
      `${apiService.transactions.requestFunds()}/${id}/decline`
    );
  },

  async createRequestFunds(
    id: string,
    data: TCreateRequestFundsData
  ): Promise<TSuccessResponse | TErrorResponse> {
    return await axios.post(apiService.transactions.requestFunds(), data);
  },
};
