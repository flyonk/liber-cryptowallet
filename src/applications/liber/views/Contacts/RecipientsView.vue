<template name="RecipientsView">
  <div class="view-wrapper">
    <t-top-navigation nav-with-custom-top-left class="-contacts">
      <template #top-left>
        <img
          src="@/assets/images/avatar.png"
          @click="$router.push({ name: props.routeBack })"
        />
      </template>
      <template #top-right>
        <div class="flex">
          <img
            class="mr-3"
            :src="`${STATIC_BASE_URL}/static/menu/system_qr.svg`"
            alt="circle-add"
          />
          <i
            class="icon-plus_circle circle-add"
            @click="$router.push({ name: Route.ContactsAddNewContact })"
          />
        </div>
      </template>
      <template #title>{{ $t('views.recipients.recipients') }}</template>
      <template #content>
        <div class="who-topay">
          <m-base-input
            v-model="filterContacts"
            class="m-base-input"
            type="text"
          >
            <template #label> Name, @id, phone, email </template>
          </m-base-input>

          <constacts-tab-switcher />

          <router-view :filter="filterContacts" />
        </div>
      </template>
    </t-top-navigation>
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue';

import { TTopNavigation } from '@/components/ui';
import { STATIC_BASE_URL } from '@/constants';

import ConstactsTabSwitcher from '@/components/ui/molecules/ConstactsTabSwitcher.vue';

import { Route } from '@/router/types';
import { uiKitKey } from '@/types/symbols';

const uiKit = inject(uiKitKey);
const { MBaseInput } = uiKit!;

const filterContacts = ref('');
</script>

<style lang="scss" scoped>
.view-wrapper {
  height: calc(100vh - 96px);
}

.who-topay {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: auto;
  position: relative;

  > .base-input:deep {
    margin-bottom: 16px;
  }
}

.circle-add {
  font-size: 33px;
  color: $color-primary;
}
</style>
