<template name="send-to">
  <t-top-navigation
    @click:left-icon="$router.push({ name: ServicesRoutes.GetCouponsEmail })"
  >
    <template #top-right>
      <span class="header-email">{{ email }}</span>
    </template>
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
import { computed } from 'vue';
import OChangeCurrency from '@/applications/servicesapp/components/ui/organisms/transfers/OChangeCurrency.vue';
import { ServicesRoutes } from '@/applications/servicesapp/router/types';
import { TTopNavigation } from '@/components/ui';
import { useLiberSaveStore } from '@/applications/servicesapp/stores/libersave';

const store = useLiberSaveStore();
const email = computed(() => {
  return store.getEmail;
});
</script>

<style lang="scss" scoped>
.send-to {
  height: 100vh;
  flex-grow: 1;
  overflow: auto;
}

.header-email {
  flex-grow: 1;
  text-align: left;
}
</style>
