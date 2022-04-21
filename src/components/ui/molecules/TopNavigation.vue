<template>
  <header class="page-header">
    <div class="header-top">
      <template v-if="withCustomTopLeft"> <slot name="top-left" /> </template>
      <button
        v-else
        class="controls"
        type="button"
        @click="$emit('click:left-icon')"
      >
        <i :class="leftIconName" class="icon-header" />
      </button>
      <slot name="top-right" />
    </div>
    <template v-if="!withoutTitle">
      <div class="header-container">
        <div class="left">
          <h1 class="page-title">
            <slot />
          </h1>
          <h1 class="page-subtitle">
            <slot name="subtitle" />
          </h1>
        </div>
        <slot name="right"></slot>
      </div>
    </template>
  </header>
</template>

<script lang="ts" setup>
defineProps({
  leftIconName: {
    type: String,
    default: 'icon-app-navigation-back',
  },
  withoutTitle: {
    type: Boolean,
    default: false,
  },
  withCustomTopLeft: {
    type: Boolean,
    default: false,
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

    > .left > .page-title {
      font-style: normal;
      font-weight: 800;
      font-size: 28px;
      line-height: 34px;
      letter-spacing: 0.0038em;
      margin-bottom: 10px;
      margin-top: 20px;
    }

    > .left > .page-subtitle {
      font-style: normal;
      font-weight: 400;
      font-size: 17px;
      line-height: 22px;
      letter-spacing: -0.0043em;
      color: $color-brand-primary;
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
