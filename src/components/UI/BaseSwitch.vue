<template>
  <div class="base-switch">
    <p-switch
      v-bind="$attrs"
    />
    <span @click="$emit('update:modelValue', !$attrs.modelValue)">
      <slot />
    </span>
  </div>
</template>

<script lang="ts" setup>
defineEmits(['update:modelValue'])
</script>

<style lang="scss">
.base-switch {
  display: grid;
  grid-template-columns: 55px 1fr;
  
  .p-inputswitch {
    &.p-focus {
      outline: none !important;

      > .p-inputswitch-slider {
      outline: none !important;
    }
    }

    &.p-inputswitch.p-inputswitch-checked .p-inputswitch-slider {
      background: $color-blue;
    }
  }

  span {
    user-select: none;
    padding-left: 16px;
  }
}

</style>