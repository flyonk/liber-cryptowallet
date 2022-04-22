<template>
  <header class="page-header">
    <div class="header-top">
      <button class="controls" type="button" @click="$emit('click:left-icon')">
        <i :class="leftIconName" class="icon-header" />
      </button>
      <slot name="top-right" />
    </div>
    <div v-if="$slots.default" class="header-container">
      <h1 class="page-title">
        <slot />
      </h1>
      <slot name="right"></slot>
    </div>
  </header>
</template>

<script lang="ts" setup>
defineProps({
  leftIconName: {
    type: String,
    default: 'icon-app-navigation-back',
  },
});

defineEmits(['click:left-icon']);
</script>

<style lang="scss" scoped>
.page-header {
  margin-top: 30px;
  margin-bottom: 8px;

  > .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;

    > .page-title {
      font-style: normal;
      font-weight: 800;
      font-size: 28px;
      line-height: 34px;
      letter-spacing: 0.0038em;
      margin-bottom: 10px;
      margin-top: 20px;
    }
  }

  > .header-top {
    display: flex;
    justify-content: space-between;
  }

  > .header-top > .controls {
    background: transparent;
  }

  > .header-top > .controls > .icon-header {
    $size: 24px;

    width: $size;
    height: $size;
    font-size: $size;
  }
}
</style>
