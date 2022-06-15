import axios from 'axios';
import apiServiceCommon from '@/services/apiService';
import apiServiceLiber from '@/applications/liber/services/apiService';

import profileMapper, { IProfile } from '@/models/profile/profile';
import claimMapper, { IClaim } from '@/models/profile/claim';
import { EMfaHeaders } from '@/stores/mfa';

import {
  TConfigureAppData,
  TSuccessResponse,
  TVerification,
} from '@/types/api';

export default {
  async getProfile(): Promise<IProfile> {
    const res = await axios.get(apiServiceLiber.profile.baseUrl());
    return profileMapper.deserialize(res.data);
  },

  async updateProfile(data: Partial<IProfile>): Promise<IProfile> {
    const res = await axios.patch(
      apiServiceLiber.profile.baseUrl(),
      profileMapper.requestSerialize(data)
    );
    return profileMapper.deserialize(res.data);
  },

  async updateProfileAvatar(data: File): Promise<TSuccessResponse> {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    return (await axios.patch(apiServiceLiber.profile.avatar(), data, config))
      .data;
  },

  async closeProfile(): Promise<TSuccessResponse> {
    return (await axios.post(apiServiceLiber.profile.close())).data;
  },

  async enableVerificationByApp(): Promise<TConfigureAppData> {
    const res = await axios.get(apiServiceCommon.authenticators.secret());
    return res.data;
  },

  async confirmVerificationApp(data: {
    secret: string;
    code: string;
  }): Promise<TSuccessResponse> {
    return await axios.post(apiServiceCommon.authenticators.enable(), data, {
      headers: {
        [EMfaHeaders.totp]: data.code,
      },
    });
  },

  async disableVerificationApp(data: {
    code: string;
  }): Promise<TSuccessResponse> {
    return (await axios.post(apiServiceCommon.authenticators.disable(), data))
      .data;
  },

  async verificationBySMS(data: { otp: string }): Promise<TVerification> {
    return (await axios.post(apiServiceCommon.verification.bySMS(), data)).data;
  },

  async verificationByApp(data: { code: string }): Promise<TVerification> {
    return (await axios.post(apiServiceCommon.authenticators.verify(), data))
      .data;
  },

  //TODO: fix any
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  async kycCreateClaim(data: any): Promise<IClaim> {
    const res = await axios.post(apiServiceLiber.profile.kycClaim(), data);
    return claimMapper.deserialize(res.data);
  },

  //TODO: fix any
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  async kycHook(data: any): Promise<TSuccessResponse> {
    return (await axios.post(apiServiceLiber.profile.kycHook(), data)).data;
  },

  async kycGetClaimById(id: number): Promise<IClaim> {
    const res = await axios.get(`${apiServiceLiber.profile.kycClaim()}/${id}`);
    return claimMapper.deserialize(res.data);
  },

  async kycProceedClaimById(id: number): Promise<TSuccessResponse> {
    return (
      await axios.post(`${apiServiceLiber.profile.kycClaim()}/${id}/proceed`)
    ).data;
  },

  async kycDeleteFileById(
    id: number,
    fileId: number
  ): Promise<TSuccessResponse> {
    return (
      await axios.delete(
        `${apiServiceLiber.profile.kycClaim()}/${id}/file/${fileId}`
      )
    ).data;
  },

  async kycAddFileById(id: number, fileId: number): Promise<TSuccessResponse> {
    return (
      await axios.post(
        `${apiServiceLiber.profile.kycClaim()}/${id}/file/${fileId}`
      )
    ).data;
  },
};
