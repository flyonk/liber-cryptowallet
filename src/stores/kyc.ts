import { EStepDirection } from './../types/base-component';
import { defineStore } from 'pinia';

// === KYC Types ===

export interface IKYCStep {
  personal: number;
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

export const useKYCStore = defineStore('kyc', {
  state: (): IKYCState => ({
    steps: {
      personal: 2,
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

    getData: ({ data }) => data,
  },

  actions: {
    changeData(key: keyof IKYCFormData, value: string) {
      this.data[key] = value;
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
  },
});
