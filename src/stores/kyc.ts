import { EStepDirection } from './../types/base-component';
import { defineStore } from 'pinia';
import { EDocumentSide } from '@/types/document';

// === KYC Types ===

export interface IKYCStep {
  personal: number;
}

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
  postal_code: string;
  state: string;
  city: string;
}

export interface IKYCState {
  steps: IKYCStep;

  proof_type: EKYCProofType | null;

  completed_percentage: number;

  data: IKYCFormData;

  image: IKYCImage;
}

// === KYC Store ===

export const useKYCStore = defineStore('kyc', {
  state: (): IKYCState => ({
    steps: {
      personal: 0,
    },

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
    getStep: ({ steps }) => steps,

    getProofType: ({ proof_type }) => proof_type,

    getData: ({ data }) => data,

    getPercentage: ({ completed_percentage }) => completed_percentage,

    getImage: ({ image }) => image,
  },

  actions: {
    changeData(key: keyof IKYCFormData, value: string) {
      this.data[key] = value;
    },

    setProofType(type: EKYCProofType) {
      this.proof_type = type;
    },

    setPercentage(percentage: number) {
      this.completed_percentage = percentage;
    },

    setStep(step: number | EStepDirection) {
      if (step === EStepDirection.next) {
        this.steps.personal += 1;

        return;
      }

      if (step === EStepDirection.prev) {
        this.steps.personal -= 1;

        return;
      }

      this.steps.personal = step;
    },

    setImage(image: string | null, side: EDocumentSide) {
      this.image[side] = image;
    },

    setData(data: Partial<IKYCFormData>) {
      Object.assign(this.data, data);
    },
  },
});