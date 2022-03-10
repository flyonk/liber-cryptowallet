<template>
  <div class="base-switch">
    <p-switch
      v-bind="$attrs"
      @click="$emit('update:modelValue', !$attrs.modelValue)"
    />
    <span @click="$emit('update:modelValue', !$attrs.modelValue)">
      <slot />
    </span>
  </div>
</template>

<script lang="ts" setup>
defineEmits(['update:modelValue']);
</script>

<style lang="scss" scoped>
.base-switch {
  display: grid;
  grid-template-columns: 55px 1fr;

  > :deep(.p-inputswitch) {
    &.p-focus {
      outline: none !important;

      // TODO: FIX Variant has no element: '.p-inputswitch-slider'
      // But the linter is fine if you pass the tag selector
      // > .p-inputswitch-slider {
      //   background-color: goldenrod !important;
      //   outline: none !important;
      // }
      > span {
        outline: none !important;
      }
    }

    &.p-inputswitch-checked {
      &.p-inputswitch-slider {
        background: $color-primary;
      }
    }
  }

  > span {
    user-select: none;
    padding-left: 16px;
  }
}
</style>
