<template>
  <div
    class="template-top-navigation"
    :class="[
      { untouchable: !isTouchable, '-paddingless': disablePaddings },
      { '-paddingless': disablePaddings, 'h-full': fullHeight },
    ]"
  >
    <div class="top-navigation">
      <m-top-navigation
        :left-icon-name="leftIconName"
        :without-title="navWithoutTitle"
        :with-custom-top-left="navWithCustomTopLeft"
        @click:left-icon="$emit('click:left-icon')"
      >
        <slot name="title" />
        <template #top-left><slot name="top-left" /></template>
        <template #top-right><slot name="top-right" /></template>
        <template #subtitle><slot name="subtitle" /></template>
        <template #right><slot name="right" /></template>
      </m-top-navigation>
    </div>

    <div class="content" :class="{ '-pb-navbar': withNavbar && fullHeight }">
      <slot name="content" />
    </div>

    <div v-if="withFixedFooter" class="footer">
      <slot name="fixed-footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { uiKitKey } from '@/types/symbols';

const uiKit = inject(uiKitKey);
const { MTopNavigation } = uiKit!;

defineProps({
  leftIconName: {
    type: String,
    default: 'icon-app-navigation-back',
  },

  navWithoutTitle: {
    type: Boolean,
    default: false,
  },

  navWithCustomTopLeft: {
    type: Boolean,
    default: false,
  },

  withFixedFooter: {
    type: Boolean,
    default: false,
  },

  isTouchable: {
    type: Boolean,
    default: true,
  },

  disablePaddings: {
    type: Boolean,
    default: false,
  },
  fullHeight: {
    type: Boolean,
    default: false,
  },
  withNavbar: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['click:left-icon']);
</script>

<style lang="scss" scoped>
.template-top-navigation {
  padding: 24px 16px 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &.-paddingless {
    padding: 24px 0 0;
  }

  > .content {
    overflow: visible;
    margin-top: 25px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    max-height: 100%;
    touch-action: manipulation;

    &.-pb-navbar {
      padding-bottom: 70px;
      max-height: 80%;
    }
  }

  > .footer {
    position: fixed;
    bottom: 50px;
    left: 16px;
    right: 16px;

    @media (max-height: 680px) {
      bottom: 5%;
    }
  }
}

.template-top-navigation.-contacts {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  > .content {
    margin-top: 5px;
    overflow: hidden;
  }
}

.untouchable {
  touch-action: none;
}
</style>
