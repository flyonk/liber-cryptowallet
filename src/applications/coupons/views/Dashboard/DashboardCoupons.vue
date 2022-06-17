<template>
  <div class="dashboard-container">
    <MDashboardCoinInfo accounts="" :verification-status="10">
      <template #controllers>
        <div class="controls">
          <base-button
            view="finance-action"
            size="medium"
            icon-left="icon-plus_circle"
          >
            test
          </base-button>
        </div>
      </template>
    </MDashboardCoinInfo>
  </div>
</template>

<script lang="ts" setup>
import { BaseButton, MDashboardCoinInfo } from '@/components/ui';
</script>

<style lang="scss" scoped>
.controls {
  display: flex;
  margin-bottom: 32px;
}
</style>
