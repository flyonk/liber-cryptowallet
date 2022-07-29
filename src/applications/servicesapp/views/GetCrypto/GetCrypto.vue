<template name="send-to">
  <t-top-navigation
    @click:left-icon="$router.push({ name: ServicesRoutes.GetCryptoCoin })"
  >
    <template #title>{{ $t('services.getcrypto.title') }}</template>
    <template #content>
      <div class="send-to">
        <div class="sendto-main">
          <o-change-currency :min-amount="50" :max-amount="1000" />
        </div>
      </div>
    </template>
  </t-top-navigation>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import OChangeCurrency from '@/applications/servicesapp/components/ui/organisms/transfers/OChangeCurrency.vue';
import { ServicesRoutes } from '@/applications/servicesapp/router/types';
import { TTopNavigation } from '@/components/ui';
</script>

<style lang="scss" scoped>
.send-to {
  height: 100vh;
  flex-grow: 1;
  overflow: auto;
}
</style>
