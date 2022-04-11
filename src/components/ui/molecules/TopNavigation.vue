<template>
  <header class="page-header">
    <div class="header-top">
      <button type="button" class="controls" @click="$emit('click:left-icon')">
        <i class="icon-header" :class="leftIconName" />
      </button>
      <slot name="top-right" />
    </div>
    <h1 class="page-title">
      <slot />
    </h1>
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
</style>
