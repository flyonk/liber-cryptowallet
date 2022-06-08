<template>
  <base-toast
    v-bind="$attrs"
    severity="confirmation"
    @update:visible="$emit('update:visible', $event)"
  >
    <template #header>
      <div class="success-header font-weight--medium text--title-3">
        {{ $t('views.withdraw.success.title') }}
      </div>
    </template>
    <template #description>
      <div class="success-description text--body">
        {{ $t('views.withdraw.success.description') }}
      </div>
    </template>
  </base-toast>
</template>

<script lang="ts" setup>
import { BaseToast } from '@/components/ui';

defineEmits(['update:visible']);
</script>

<style lang="scss" scoped>
.success-header {
  color: $color-brand-primary;
  margin: 0 0 4px;
}

.success-description {
  color: $color-dark-grey;
}
</style>
