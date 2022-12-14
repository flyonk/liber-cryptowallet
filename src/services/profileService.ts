import axios from 'axios';

import apiService from '@/services/apiService';
import { compressFileOrBlob } from '@/helpers/image';

import profileMapper, { IProfile } from '@/models/profile/profile';
import claimMapper, { IClaim } from '@/models/profile/claim';
import { EMfaHeaders } from '@/stores/mfa';

import {
  TConfigureAppData,
  TSuccessResponse,
  TVerification,
} from '@/types/api';
import { EKYCProofType } from '@/stores/kyc';
import { EDocumentSide } from '@/types/document';

export default {
  async getProfile(): Promise<IProfile> {
    const res = await axios.get(apiService.profile.baseUrl());
    return profileMapper.deserialize(res.data);
  },

  async updateProfile(data: Partial<IProfile>): Promise<IProfile> {
    const res = await axios.patch(
      apiService.profile.baseUrl(),
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
    return (await axios.patch(apiService.profile.avatar(), data, config)).data;
  },

  async closeProfile(): Promise<TSuccessResponse> {
    return (await axios.post(apiService.profile.close())).data;
  },

  async enableVerificationByApp(): Promise<TConfigureAppData> {
    const res = await axios.get(apiService.authenticators.secret());
    return res.data;
  },

  async confirmVerificationApp(data: {
    secret: string;
    code: string;
  }): Promise<TSuccessResponse> {
    return await axios.post(apiService.authenticators.enable(), data, {
      headers: {
        [EMfaHeaders.totp]: data.code,
      },
    });
  },

  async disableVerificationApp(data: {
    code: string;
  }): Promise<TSuccessResponse> {
    return (await axios.post(apiService.authenticators.disable(), data)).data;
  },

  async verificationBySMS(data: { otp: string }): Promise<TVerification> {
    return (await axios.post(apiService.verification.bySMS(), data)).data;
  },

  async verificationByApp(data: { code: string }): Promise<TVerification> {
    return (await axios.post(apiService.authenticators.verify(), data)).data;
  },

  async kycCreateClaim(): Promise<IClaim> {
    const res = await axios.post(apiService.profile.kycClaim());
    return claimMapper.deserialize(res.data);
  },

  async kycGetClaim(): Promise<IClaim> {
    const res = await axios.get(apiService.profile.kycClaim());
    return claimMapper.deserialize(res.data);
  },

  async kycProceedClaimById(id: string): Promise<TSuccessResponse> {
    return await axios.post(`${apiService.profile.kycClaim()}/${id}/proceed`);
  },

  async kycDeleteFileById(
    id: number,
    fileId: number
  ): Promise<TSuccessResponse> {
    return (
      await axios.delete(
        `${apiService.profile.kycClaim()}/${id}/file/${fileId}`
      )
    ).data;
  },

  async kycAddFileFromCam(
    id: string,
    fileType: EKYCProofType,
    file: string,
    side: EDocumentSide = EDocumentSide.front,
    country: string
  ): Promise<TSuccessResponse> {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const data = new FormData();
    const type = file.split(';')[0].split('/')[1];
    await fetch(file)
      .then((r) => r.blob())
      .then(async (blobFile) => {
        const binaryFile = await compressFileOrBlob(
          blobFile,
          `${fileType}-${side}.${type}`,
          `image/${type}`
        );
        data.append('file', binaryFile);
      });

    return (
      await axios.post(
        `${apiService.profile.kycClaim()}/${id}/file/${fileType}?side=${side}&country=${country}`,
        data,
        config
      )
    ).data;
  },

  async kycAddFile(id: string, file: File, country: string): Promise<void> {
    const uploadFiles = new Promise((resolve, reject) => {
      const data = new FormData();
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const reader = new FileReader();
      reader.onload = async (readedFile: ProgressEvent<FileReader>) => {
        if (readedFile?.target?.result) {
          const blob = new Blob([readedFile?.target?.result], {
            type: file.type,
          });
          const binaryFile = await compressFileOrBlob(
            blob,
            file.name,
            file.type
          );
          data.append('file', binaryFile);

          try {
            const result = await axios.post(
              `${apiService.profile.kycClaim()}/${id}/file/residence?country=${country}&side=front`,
              data,
              config
            );
            resolve(result?.data);
          } catch (error) {
            reject(error);
          }
        }
      };
      reader.readAsArrayBuffer(file);
    });

    await uploadFiles;
  },

  async sendEmail(data: { email: string }): Promise<void> {
    return (await axios.post(apiService.profile.sendEmail(), data)).data;
  },

  async confirmEmail(data: { email: string }, otp: string): Promise<void> {
    const config = {
      headers: {
        [EMfaHeaders.otp]: otp,
      },
    };
    return (await axios.post(apiService.profile.confirmEmail(), data, config))
      .data;
  },
};
