import axios from 'axios';

import { TSuccessResponse } from '@/types/api';
import apiService from '@/services/apiService';

export interface IPasscodeRequestBody {
  pass_code: string;
}

export interface IPasscodeUpdateRequestBody {
  new_pass_code: string;
  old_pass_code: string;
}

export default {
  async create(data: IPasscodeRequestBody): Promise<TSuccessResponse> {
    const response = await axios.post(apiService.passcode.global(), data);

    return response.data as TSuccessResponse;
  },

  async verify(data: IPasscodeRequestBody): Promise<TSuccessResponse> {
    const response = await axios.post(
      `${apiService.passcode.global()}/verify`,
      data
    );

    return response.data as TSuccessResponse;
  },

  async update(data: IPasscodeUpdateRequestBody): Promise<TSuccessResponse> {
    const response = await axios.put(apiService.passcode.global(), data);

    return response.data;
  },

  async delete(): Promise<TSuccessResponse> {
    return await axios.delete(apiService.passcode.global());
  },
};
