<template>
  <div class="base-input">
    <div class="p-float-label">
      <PInput v-bind="$attrs" />
      <label>
        <slot name="label" />
      </label>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'BaseInput',

  setup() {
    const isFocused = ref(false);

    return {
      isFocused
    };
  }
});
</script>

<style lang='scss'>
.base-input {
  background: #edf0fb;
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

  .p-inputtext {
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
