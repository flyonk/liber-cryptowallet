import { defineStore } from 'pinia';
import { EDocumentSide } from '@/types/document';

// === KYC Types ===

export enum EKYCProofType {
  licence = 'licence',
  passport = 'passport',
  national_id = 'national_id',
}

export interface IKYCImage {
  [EDocumentSide.back]: string | null;
  [EDocumentSide.front]: string | null;
}

export interface IKYCFormData {
  citizenship: string;
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

    setData(data: Partial<IKYCFormData>): void {
      Object.assign(this.data, data);
    },
  },
});
