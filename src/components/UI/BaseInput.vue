<template>
  <div class="base-input">
    <div class="input">
      <div
        class="p-float-label"
        :class="{ appendIcon: 'p-input-icon-right' }"
      >
        <component
          :is="currentComponent"
          v-bind="$attrs"
        />
        <label>
          <slot name="label" />
        </label>
        <!-- <i class="ci-search" /> -->
      </div>
    </div>
    <div
      v-if="$slots.message"
      class="message text--caption-2"
    >
      <slot name="message" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import PInput from 'primevue/inputtext';
import PInputNumber from 'primevue/inputnumber';
import PInputMask from 'primevue/inputmask';

const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
  appendIcon: {
    type: Boolean,
    default: false,
  },
});

const currentComponent = computed(() => {
  switch (props.type) {
    case 'text':
      return PInput;
    case 'number':
      return PInputNumber;
    case 'mask':
      return PInputMask;
    default:
      return PInput;
  }
});
</script>

<style lang="scss">
.base-input {
  margin: 0 0 16px 0;

  .input {
  background: $color-input-bg;
  border: 1px solid transparent;
  border-radius: 12px;
  height: 56px;
  padding: 4px 16px;

  .message {
    height: 24px;
    width: 100%;
  }

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
    background: $color-white;
    border: 1px solid $color-primary;
  }

  .p-inputtext,
  .p-inputnumber {
    background: transparent;
    border: 0;
    color: $color-brand-primary;
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

  .message {
    padding: 8px 16px 0 16px;
    color: $color-grey;
    display: flex;
    align-items: center;
  }
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
