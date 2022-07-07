<template name="send-to">
  <t-top-navigation
    @click:left-icon="$router.push({ name: ServicesRoutes.GetCouponsEmail })"
  >
    <template #title>{{ $t('services.convert.title') }}</template>
    <template #content>
      <div class="send-to">
        <div class="sendto-main">
          <o-change-currency />
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
import OChangeCurrency from '@/components/ui/organisms/transfers/OChangeCurrency.vue';
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
