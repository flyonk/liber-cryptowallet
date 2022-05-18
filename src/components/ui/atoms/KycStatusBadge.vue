<template>
  <div
    class="kyc-status-badge text--callout font-weight--medium"
    :class="`-${type.replaceAll('_', '-')}`"
  >
    {{ title }}
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { TKYCStatuses } from '@/models/profile/profile';

const { tm } = useI18n();

const props = defineProps({
  statusNumber: {
    type: Number,
    required: true,
  },
});

const type = computed((): TKYCStatuses => {
  const statusNumber = props.statusNumber as 10 | 20 | 30 | 40;

  const status = {
    10: 'not_started',
    20: 'pending',
    30: 'rejected',
    40: 'success',
  };

  return (status[statusNumber] as TKYCStatuses) || status[20];
});

const title = computed(() => {
  const status = {
    not_started: tm('views.dashboard.home.notVerified'),
    pending: tm('views.dashboard.home.idVerification'),
    rejected: tm('views.dashboard.home.iDVerificationFailed'),
    success: tm('views.dashboard.home.idVerified'),
  };

  return status[type.value];
});
</script>

<style lang="scss" scoped>
.kyc-status-badge {
  padding: 5px 12px;
  border-radius: 100px;

  &.-not-started {
    background: $color-light-grey-500;
    color: $color-brand-2-400;
  }

  &.-pending {
    background: $color-yellow-100;
    color: $color-yellow-800;
  }

  &.-rejected {
    background: $color-red-100;
    color: $color-red-700;
  }

  &.-success {
    background: $color-green-100;
    color: $color-green-800;
  }
}
</style>
