<template>
  <div class="transaction-filters">
    <a-filter-items :filters="timeFilters" />
    <a-filter-items :filters="typeFilters" class="-gap" />
    <a-filter-items :filters="accountFilters" />
  </div>
</template>

<script lang="ts" setup>
import { inject } from 'vue';

import { uiKitKey } from '@/types/symbols';

const uiKit = inject(uiKitKey);
const { AFilterItems } = uiKit!;

const timeFilters = [
  {
    name: 'Last Month',
    value: 'month',
  },
];
const typeFilters = [
  {
    name: 'Any type',
    value: 'any',
  },
];
const accountFilters = [
  {
    name: 'All accounts',
    value: 'all',
  },
];
</script>

<style lang="scss" scoped>
.transaction-filters {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
</style>
