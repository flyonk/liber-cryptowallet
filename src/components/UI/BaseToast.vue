<template>
  <p-dialog
    :visible="toast.open"
    position="bottom"
    :show-header="false"
    modal
    class="base-toast"
    v-bind="$attrs"
    dismissable-mask
    @update:visible="onClose"
  >
    <div class="close-wrapper" />
    <div class="image-block">
      <img
        :src="currentImage"
        :alt="toast.severity"
        class="image"
      >
    </div>
    <div
      class="header"
      v-html="toast.header"
    />
    <div
      class="description"
      v-html="toast.description"
    />
    <div
      class="footer"
      v-html="toast.footer"
    />
  </p-dialog>    
</template>

<script setup lang="ts">
import { IToastStore } from '@/types/toast';
import { computed, PropType } from 'vue-demi';

import { useToastStore } from '@/stores/ui/toast';

const toastStore = useToastStore();

const props = defineProps(
    {
    toast: {
        type: Object as PropType<IToastStore>,
        required: true
    }
}
)

const currentImage = computed(() => {
    switch(props.toast.severity) {
        case 'error':
            return require('@/assets/images/sapphire-error.svg')
        default: ''
            return require('@/assets/images/sapphire-error.svg')
    }
})

function onClose(): void {
    toastStore.closeToast();
}
</script>

<style lang="scss">
.base-toast {
    margin: 0 16px 16px 16px;
    width: 100%;
    border-radius: 32px !important;
    text-align: center;

    > .p-dialog-content {
        padding:0 10px 10px 10px;
        border-radius: inherit;

        > .close-wrapper {
            width: 64px;
            height: 5px;
            background: $color-grey;
            border-radius: 24px;
            margin: 8px auto 0 auto;
        }
    }
    
    .image-block {
        margin-top: 42px;
        margin-bottom: 24px;

        .image {
            color: red;
        }
    }
}
</style>