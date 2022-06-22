<template>
  <div :class="`-${status}`" class="status-container">
    {{ text }}
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue';
import { useI18n } from 'vue-i18n';

import { ETransactionStatus } from '@/models/transaction/transaction';

const { tm } = useI18n();

const props = defineProps({
  status: {
    type: String as PropType<ETransactionStatus>,
    required: true,
  },
});

const text = computed(() => tm(`transactions.status.${props.status}`));
</script>

<style lang="scss" scoped>
.status-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px 12px;
  border-radius: 100px;
  background-color: $color-yellow-100;
  color: $color-yellow-800;

  &.-finished {
    background-color: $color-green-100;
    color: $color-green-800;
  }

  &.-pending {
    background-color: $color-yellow-100;
    color: $color-yellow-800;
  }

  &.-reverted,
  &.-failed {
    background-color: $color-grey-500;
    color: $color-brand-2-400;
  }
}
</style>
