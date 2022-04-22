<template>
  <div class="template-top-navigation">
    <div class="top-navigation">
      <top-navigation
        :left-icon-name="leftIconName"
        :without-title="navWithoutTitle"
        :with-custom-top-left="navWithCustomTopLeft"
        @click:left-icon="$emit('click:left-icon')"
        ><slot name="title" />
        <template #top-left><slot name="top-left" /></template>
        <template #top-right><slot name="top-right" /></template>
        <template #subtitle><slot name="subtitle" /></template
      ></top-navigation>
    </div>

    <div class="content">
      <slot name="content" />
    </div>
  </div>
</template>

<script setup lang="ts">
import TopNavigation from '@/components/ui/molecules/TopNavigation.vue';

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
});

defineEmits(['click:left-icon']);
</script>

<style lang="scss">
.template-top-navigation {
  height: 100%;
  padding: 30px 16px 0;

  > .content {
    margin-top: 25px;
  }
}
</style>
