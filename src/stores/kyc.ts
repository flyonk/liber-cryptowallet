import { defineStore } from 'pinia';
import { EDocumentSide } from '@/types/document';
import { ICountryInformation } from '@/types/country-phone-types';
import profileService from '@/services/profileService';
import { IClaim } from '@/models/profile/claim';

// === KYC Types ===

export enum EKYCProofType {
  licence = 'driver',
  passport = 'passport',
  national_id = 'residence',
}

export interface IKYCImage {
  [EDocumentSide.back]: string | null;
  [EDocumentSide.front]: string | null;
}

export interface IKYCFormData {
  citizenship: ICountryInformation | string;
  street: string;
  flat: string;
  postal_code: string | null;
  state: string;
  city: string;
}

export interface IKYCState {
  proof_type: EKYCProofType | null;

  completed_percentage: number;

  data: IKYCFormData;

  image: IKYCImage;

  claimData: IClaim | null;
}

// === KYC Store ===

export const useKYCStore = defineStore('kyc', {
  state: (): IKYCState => ({
    proof_type: null,

    completed_percentage: 0.2,

    data: {
      citizenship: '',
      street: '',
      flat: '',
      postal_code: '',
      state: '',
      city: '',
    },

    image: {
      front: null,
      back: null,
    },

    claimData: null,
  }),

  getters: {
    getProofType: ({ proof_type }) => proof_type,

    getData: ({ data }) => data,

    getPercentage: ({ completed_percentage }) => completed_percentage,

    getImage: ({ image }) => image,
  },

  actions: {
    changeData(key: keyof IKYCFormData, value: string): void {
      this.data[key] = value;
    },

    setProofType(type: EKYCProofType): void {
      this.proof_type = type;
    },

    setPercentage(percentage: number): void {
      this.completed_percentage = percentage;
    },

    setImage(image: string | null, side: EDocumentSide): void {
      this.image[side] = image;
    },

    cleanupImages(): void {
      this.image[EDocumentSide.front] = null;
      this.image[EDocumentSide.back] = null;
    },

    setData(data: Partial<IKYCFormData>): void {
      Object.assign(this.data, data);
    },

    async claim() {
      try {
        this.claimData = await profileService.kycGetClaim();
      } catch (e: Error | any) {
        if (e?.response && e.response.status === 404) {
          this.claimData = await profileService.kycCreateClaim();
        }
      }
    },

    async uploadFile(
      fileBinary: string,
      claimId: string,
      side: EDocumentSide = EDocumentSide.front,
      country: string
    ) {
      try {
        await profileService.kycAddFile(
          claimId,
          this.proof_type as EKYCProofType,
          fileBinary,
          side,
          country
        );
      } catch (e) {
        console.error(e);
      }
    },
  },
});
