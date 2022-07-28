<template>
  <div class="auth-page-container">
    <m-top-navigation @click:left-icon="$router.push({ name: Route.Login })">
      {{ $t('auth.restore.step1Title') }}
    </m-top-navigation>
    <div class="description text--body">
      {{ $t('auth.restore.step1Description') }}
    </div>
    <div class="grid">
      <div class="col-4">
        <base-country-phone-input />
      </div>
      <div class="col-8 ml-auto">
        <m-base-input class="m-base-input" :use-grouping="false" type="number">
          <template #label>
            {{ $t('common.numberLabel') }}
          </template>
        </m-base-input>
      </div>
    </div>
    <div v-if="route.path !== '/restore/suspended'" class="sign-button-wrapper">
      <m-base-button block @click="$emit('next')">
        {{ $t('common.continueCta') }}
      </m-base-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent } from 'vue';
import { BaseCountryPhoneInput } from '@/components/ui';
import { onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { Route } from '@/router/types';

const route = useRoute();

onBeforeMount(() => console.log('beforeMount', route.path));

const MBaseInput = defineAsyncComponent(() => {
  return import(`@liber-biz/crpw-ui-kit-${process.env.VUE_APP_BRAND}`).then(
    (lib) => lib.MBaseInput
  );
});

const MBaseButton = defineAsyncComponent(() => {
  return import(`@liber-biz/crpw-ui-kit-${process.env.VUE_APP_BRAND}`).then(
    (lib) => lib.MBaseButton
  );
});

const MTopNavigation = defineAsyncComponent(() => {
  return import(`@liber-biz/crpw-ui-kit-${process.env.VUE_APP_BRAND}`).then(
    (lib) => lib.MTopNavigation
  );
});

defineEmits(['next', 'prev']);
</script>

<style lang="scss" scoped>
.m-base-input {
  margin: 0 0 16px;
}
</style>
