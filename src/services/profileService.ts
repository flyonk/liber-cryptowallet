import axios from 'axios';
const reduce = require('image-blob-reduce')();

import apiService from '@/services/apiService';

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
    let binaryFile = '' as string | Blob;
    const data = new FormData();
    const type = file.split(';')[0].split('/')[1];
    await fetch(file)
      .then((r) => r.blob())
      .then((blobFile) =>
        //Hack for Safari
        //TODO: REFACTOR ME!!!! need a separate compress methode
        reduce.toBlob(blobFile, { max: 1000 }).then((blob: Blob) => {
          binaryFile = new File([blob], `${fileType}-${side}.${type}`, {
            type: `image/${type}`,
          });
        })
      );
    data.append('file', binaryFile);

    return (
      await axios.post(
        `${apiService.profile.kycClaim()}/${id}/file/${fileType}?side=${side}&country=${country}`,
        data,
        config
      )
    ).data;
  },

  async kycAddFile(id: string, file: File, country: string): Promise<void> {
    const data = new FormData();
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    let binaryFile = '' as string | Blob;

    const reader = new FileReader();
    reader.onload = async (readedFile: any) => {
      if (readedFile?.target?.result) {
        const blob = new Blob([readedFile?.target?.result], {
          type: file.type,
        });
        //TODO: REFACTOR ME!!!!
        await reduce.toBlob(blob, { max: 1000 }).then((newBlob: Blob) => {
          binaryFile = new File([newBlob], file.name, {
            type: file.type,
          });
        });
        data.append('file', binaryFile);

        return (
          await axios.post(
            `${apiService.profile.kycClaim()}/${id}/file/residence?country=${country}&side=front`,
            data,
            config
          )
        ).data;
      }
    };
    reader.readAsArrayBuffer(file);
  },
};
