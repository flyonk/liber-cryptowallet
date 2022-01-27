import { EToastSeverity, IToastStore } from './../../types/toast';
import { defineStore } from 'pinia';

export const useToastStore = defineStore('toast', {
  state: (): IToastStore => ({
    open: false,

    description: null,
    header: null,
    footer: null,

    severity: EToastSeverity.success,
  }),

  getters: {
    state: (state) => state,
  },

  actions: {
    openToast(
      {
        description = null,
        header = null,
        footer = null,
      }: {
        description?: null | string;
        header?: null | string;
        footer?: null | string;
      },
      severity = EToastSeverity.success
    ) {
      this.open = true;

      this.description = description;
      this.header = header;
      this.footer = footer;

      this.severity = severity;
    },

    closeToast() {
      this.$reset();
    },
  },
});
