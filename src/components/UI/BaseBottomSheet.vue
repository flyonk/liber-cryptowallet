<template>
  <PDialog
    v-bind="$attrs"
    id="sheet"
    :show-header="false"
    class="base-bottom-sheet"
    modal
    position="bottom"
  >
    <div
      id="content"
      style="overflow-y: scroll;"
      @scroll="onScroll"
    >
      <slot />
    </div>
  </PDialog>
</template>
// TODO check this https://www.primefaces.org/primevue/showcase/#/sidebar
<script lang="ts" setup>
import { watch, useAttrs, nextTick, onMounted, onUnmounted, ref } from 'vue';

const attrs = useAttrs();

defineEmits(['update:visible']);

let windowHeight = ref(window.innerHeight)

const onHeightChange = () => windowHeight.value = window.innerHeight

onMounted(() => {
  window.addEventListener('resize', onHeightChange)
})
onUnmounted(() => {
  window.removeEventListener('resize', onHeightChange)
})

watch(() => attrs.visible, async (visible) => {
  if (visible) {
    await nextTick(() => {
      console.debug(document.getElementById('content')?.clientHeight)
    });
  }
})

const onScroll = (info) => {
  console.debug('here', info)
}
</script>

<style lang="scss">
.base-bottom-sheet {
  margin: 0 !important;
  width: 100%;
  height: 100%;
  max-height: 50% !important;

  > .p-dialog-content {
    border-radius: 10px 10px 0 0;
    height: 100%;
  }
}
</style>
