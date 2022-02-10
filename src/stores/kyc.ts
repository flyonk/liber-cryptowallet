import { defineStore } from 'pinia';

// === KYC Types ===

export interface IKYCStep {
  personal: 0;
}

export enum EKYCProofType {
  licence = 'licence',
  passport = 'passport',
  national_id = 'national_id',
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

  data: IKYCFormData;
}

// === KYC Store ===

export const useKYCStore = defineStore('auth', {
  state: (): IKYCState => ({
    steps: {
      personal: 0,
    },

    proof_type: null,

    data: {
      citizenship: '',
      street: '',
      flat: '',
      postal_code: '',
      state: '',
      city: '',
    },
  }),

  getters: {
    getStep: ({ steps }) => steps,
  },

  actions: {},
});
