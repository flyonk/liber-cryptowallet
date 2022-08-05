<template name="who-topay">
  <div class="who-topay">
    <contacts-header @click:left-icon="handle" />
    <h1 class="text--title-1 mb-4">
      {{ $t('views.sendfunds.whopay') }}
    </h1>
    <m-base-input v-model="filterContacts" type="text">
      <template #label> Name, @id, phone, email </template>
    </m-base-input>

    <constacts-tab-switcher
      :liber-route="Route.PayRecipientsLiber"
      :all-route="Route.PayRecipientsPhone"
    />

    <router-view :filter="filterContacts" />
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue';

import ContactsHeader from '@/components/ui/molecules/ContactsHeader.vue';
import ConstactsTabSwitcher from '@/components/ui/molecules/ConstactsTabSwitcher.vue';

import { Route } from '@/router/types';
import { uiKitKey } from '@/types/symbols';
import { useRouter } from 'vue-router';
import { useAccountStore } from '@/applications/liber/stores/account';

const router = useRouter();

const uiKit = inject(uiKitKey);
const { MBaseInput } = uiKit!;

const accountStore = useAccountStore();

const handle = () => {
  /**
   *  This using for preselected sended coin in flow:
   * (dashboard -> accounts -> concrete coin account -> send -> contact )
   * */
  if (accountStore.accountToSend) accountStore.accountToSend = null;
  router.push({ name: Route.DashboardHome });
};

const filterContacts = ref('');
</script>

<style lang="scss" scoped>
.who-topay {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 96px);
  padding: 60px 16px 0;
  flex-grow: 1;
  overflow: auto;
  position: relative;

  > .base-input:deep {
    margin-bottom: 16px;
  }
}
</style>
