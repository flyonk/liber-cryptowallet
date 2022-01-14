<template>
  <PDialog
    :show-header="false"
    class="base-bottom-sheet"
    modal
    position="bottom"
    v-bind="$attrs"
  >
    <slot />
  </PDialog>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent(
  {
    name: 'BaseBottomSheet'
  }
);
</script>

<style lang='scss'>
.base-bottom-sheet {
  margin: 0 !important;
  width: 100%;
  height: 100%;
  max-height: 95% !important;

  .p-dialog-content {
    border-radius: 10px 10px 0 0;
    height: 100%;
  }
}
</style>
