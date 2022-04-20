<template>
  <div class="template-top-navigation">
    <top-navigation
      class="top-navigation"
      :left-icon-name="leftIconName"
      :without-title="navWithoutTitle"
      @click:left-icon="$emit('click:left-icon')"
      ><slot name="title" />
      <template #top-right><slot name="top-right" /></template
    ></top-navigation>
    <slot name="content" />
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
});

defineEmits(['click:left-icon']);
</script>

<style lang="scss" scoped>
.template-top-navigation {
  padding: 30px 16px 0;
}
</style>
