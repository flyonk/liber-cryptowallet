<template>
  <p-dialog
    position="bottom"
    :show-header="false"
    modal
    class="base-toast"
    v-bind="$attrs"
    dismissable-mask
  >
    <div class="close-wrapper" />
    <div class="image-block">
      <img :src="currentImage" :alt="severity" class="image" />
    </div>
    <div class="header">
      <slot name="header" />
    </div>
    <div class="description text--title-3">
      <slot name="description" />
    </div>
    <div
      v-if="$slots.footer"
      class="footer text--footnote font-weight--semibold"
    >
      <slot name="footer" />
    </div>
  </p-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue-demi';

const props = defineProps({
  severity: {
    type: String,
    default: 'error',
  },
});

const currentImage = computed(() => {
  switch (props.severity) {
    case 'error':
      return require('@/assets/images/sapphire-error.svg');
    case 'confirmation':
      return require('@/assets/images/confirmation.svg');
    case 'attention':
      return require('@/assets/images/attention.svg');
    default:
      return require('@/assets/images/sapphire-error.svg');
  }
});
</script>

<style lang="scss">
.base-toast {
  margin: 0 16px 16px;
  width: 100%;
  border-radius: 32px !important;
  text-align: center;

  > .p-dialog-content {
    padding: 0 10px 10px;
    border-radius: inherit;

    > .close-wrapper {
      width: 64px;
      height: 5px;
      background: $color-grey;
      border-radius: 24px;
      margin: 8px auto 0;
    }

    > .image-block {
      margin-top: 42px;
      margin-bottom: 24px;

      > .image {
        color: $color-red;
        width: 50px;
        height: 50px;
      }
    }

    > .description {
      margin: 0 0 20px;
    }

    > .footer {
      margin-top: 42px;
      color: $color-dark-grey;

      > .link {
        color: $color-primary;
      }
    }
  }
}
</style>
