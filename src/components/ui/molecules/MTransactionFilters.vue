<template>
  <div class="transaction-filters">
    <AFilterItems :filters="timeFilters" />
    <AFilterItems :filters="typeFilters" class="-gap" />
    <AFilterItems :filters="accountFilters" />
  </div>
</template>

<script lang="ts" setup>
import AFilterItems from '@/components/ui/atoms/AFilterItems.vue';

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
