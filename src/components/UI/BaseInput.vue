<template>
  <div class="base-input">
    <div class="p-float-label">
      <component :is="currentComponent" v-bind="$attrs" />
      <label>
        <slot name="label" />
      </label>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

import PInput from 'primevue/inputtext';
import PInputNumber from 'primevue/inputnumber';

export default defineComponent({
  name: 'BaseInput',

  props: {
    type: {
      type: String,
      default: 'text',
    },
  },

  setup() {
    const isFocused = ref(false);

    return {
      isFocused,
    };
  },

  computed: {
    currentComponent() {
      switch (this.type) {
        case 'text':
          return PInput;
        case 'number':
          return PInputNumber;
        default:
          return PInput;
      }
    },
  },
});
</script>

<style lang="scss">
.base-input {
  background: var(--ion-color-input-background);
  border: 1px solid transparent;
  border-radius: 12px;
  height: 56px;
  padding: 4px 16px;

  .p-float-label {
    height: 100%;

    label {
      left: 0.1rem;
    }

    input:focus ~ label,
    input.p-filled ~ label,
    textarea:focus ~ label,
    textarea.p-filled ~ label,
    .p-inputwrapper-focus ~ label,
    .p-inputwrapper-filled ~ label {
      bottom: 50%;
      font-size: 11px;
      line-height: 13px;
      top: 10px;
    }
  }

  &:focus-within {
    background: #fff;
    border: 1px solid var(--ion-color-ui-primary-500);
  }

  .p-inputtext,
  .p-inputnumber {
    background: transparent;
    border: 0;
    color: var(--ion-color-brand-primary);
    height: 100%;
    padding: 0;
    width: 100%;

    &:enabled:focus {
      border-color: transparent;
      box-shadow: none;
      outline: none;
    }
  }
}
</style>
