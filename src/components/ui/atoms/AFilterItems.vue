<template>
  <div class="select">
    <div class="select-option">
      <p class="name">{{ props.filters[0].name }}</p>
      <img alt="list" :src="`${STATIC_BASE_URL}/static/menu/arrow-down.svg`" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { STATIC_BASE_URL } from '@/constants';

interface FilterItem {
  name: string;
  value: string;
}

const props = defineProps({
  filters: {
    type: Array as PropType<FilterItem[]>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.select {
  height: 40px;
  background: $color-white-light;
  border-radius: 8px;
  border: 0;
  flex-basis: 100%;
  flex-grow: 1;

  &.-gap {
    margin-left: 10px;
    margin-right: 10px;
  }
}

.select-option {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  > .name {
    font-weight: 600;
    font-size: 13px;
    line-height: 18px;
    letter-spacing: -0.0008em;
    color: $color-brand-550;
    margin-right: 8px;
  }
}
</style>
