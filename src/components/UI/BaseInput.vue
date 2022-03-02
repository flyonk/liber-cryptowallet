<template>
  <div class="base-input">
    <div class="input">
      <div
        class="p-float-label"
        :class="{ 'p-input-icon-right': $slots.append }"
      >
        <slot
          v-if="$slots.append"
          name="append"
        />
        <component
          :is="currentComponent"
          v-bind="$attrs"
        />
        <label>
          <slot name="label" />
        </label>
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
      width: 100%;

      label {
        left: 0.1rem;
        top: 9px;
        left: 0;
        font-size: 12px;
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

    > .p-input-icon-right {
      & i {
        margin-top: -0.7rem;
        font-size: 24px;
        position: absolute;
        top: 50%;

        &:last-of-type {
          right: 0.5rem;
          color: #6c757d;
        }
      }
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
