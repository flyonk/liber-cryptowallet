<template>
  <div class="template-top-navigation">
    <div class="top-navigation">
      <top-navigation
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
      </top-navigation>
    </div>

    <div class="content">
      <slot name="content" />
    </div>

    <div v-if="withFixedFooter" class="footer">
      <slot name="fixed-footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { TopNavigation } from '@/components/ui';

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
});

defineEmits(['click:left-icon']);
</script>

<style lang="scss" scoped>
.template-top-navigation {
  padding: 10px 16px 0;

  > .content {
    margin-top: 25px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  > .footer {
    position: fixed;
    bottom: 50px;
    left: 16px;
    right: 16px;
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
</style>
