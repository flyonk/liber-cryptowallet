import axios from 'axios';
import apiService from '@/services/apiService';
import {
  TClaimFileList,
  TConfigureAppData,
  TErrorResponse,
  TProfile,
  TSuccessResponse,
  TUpdateProfile,
  TVerification,
} from '@/types/api';

//TODO: deserialize api responses - every method should return mapped model

export default {
  async getProfile(): Promise<TProfile | TErrorResponse> {
    return await axios.get(apiService.profile.baseUrl());
  },

  async updateProfile(
    data: TUpdateProfile
  ): Promise<TProfile | TErrorResponse> {
    return await axios.patch(apiService.profile.baseUrl(), data);
  },

  async updateProfileAvatar(
    data: File
  ): Promise<TSuccessResponse | TErrorResponse> {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    return await axios.patch(apiService.profile.avatar(), data, config);
  },

  async closeProfile(): Promise<TSuccessResponse | TErrorResponse> {
    return await axios.post(apiService.profile.close());
  },

  async configureApp(): Promise<TConfigureAppData | TErrorResponse> {
    return await axios.get(apiService.authenticators.configure());
  },

  async changeAuthenticator(data: {
    targetAuthenticator: string;
  }): Promise<TSuccessResponse | TErrorResponse> {
    return await axios.post(apiService.authenticators.change(), data);
  },

  async verificationBySMS(data: {
    otp: string;
  }): Promise<TVerification | TErrorResponse> {
    return await axios.post(apiService.verification.bySMS(), data);
  },

  async verificationByApp(data: {
    code: string;
  }): Promise<TVerification | TErrorResponse> {
    return await axios.post(apiService.verification.byApp(), data);
  },

  //TODO: fix any
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  async kycCreateClaim(data: any): Promise<TClaimFileList | TErrorResponse> {
    return await axios.post(apiService.profile.kycClaim(), data);
  },

  //TODO: fix any
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  async kycHook(data: any): Promise<TSuccessResponse | TErrorResponse> {
    return await axios.post(apiService.profile.kycHook(), data);
  },

  async kycGetClaimById(id: number): Promise<TClaimFileList | TErrorResponse> {
    return await axios.get(`${apiService.profile.kycClaim()}/${id}`);
  },

  async kycProceedClaimById(
    id: number
  ): Promise<TSuccessResponse | TErrorResponse> {
    return await axios.post(`${apiService.profile.kycClaim()}/${id}/proceed`);
  },

  async kycDeleteFileById(
    id: number,
    fileId: number
  ): Promise<TSuccessResponse | TErrorResponse> {
    return await axios.delete(
      `${apiService.profile.kycClaim()}/${id}/file/${fileId}`
    );
  },

  async kycAddFileById(
    id: number,
    fileId: number
  ): Promise<TSuccessResponse | TErrorResponse> {
    return await axios.post(
      `${apiService.profile.kycClaim()}/${id}/file/${fileId}`
    );
  },
};
