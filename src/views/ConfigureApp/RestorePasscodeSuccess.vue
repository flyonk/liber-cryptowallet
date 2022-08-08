<template>
  <t-top-navigation with-fixed-footer @click:left-icon="onGoBack">
    <template #title>
      {{ $t('auth.passcodeRestoreSuccess.title') }}
    </template>
    <template #subtitle>
      {{ $t('auth.passcodeRestoreSuccess.description') }}
    </template>
    <template #content>
      <img :src="imgPath" alt="shield" />
    </template>
    <template #fixed-footer>
      <m-base-button block @click="onGoBack">
        {{ $t('auth.passcodeRestoreSuccess.gotIt') }}
      </m-base-button>
    </template>
  </t-top-navigation>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue';
import { useRouter } from 'vue-router';

import { uiKitKey } from '@/types/symbols';
import { STATIC_BASE_URL } from '@/constants';
import { Route } from '@/router/types';

import { UiKitInterface } from '@/types/uiKit';
import { TTopNavigation } from '@/components/ui';

const uiKit = inject(uiKitKey);
const { MBaseButton } = uiKit as UiKitInterface;

const router = useRouter();

const imgPath = computed(
  () => `${STATIC_BASE_URL}/static/illustrations/shield.png`
);

const onGoBack = () => {
  router.push({ name: Route.Login });
};
</script>

<style lang="scss" scoped></style>
