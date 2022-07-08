<template name="RecipientsView">
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
        <BaseInput v-model="filterContacts" type="text">
          <template #label> Name, @id, phone, email </template>
        </BaseInput>

        <constacts-tab-switcher />

        <router-view :filter="filterContacts" />
      </div>
    </template>
  </t-top-navigation>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { BaseInput, TTopNavigation } from '@/components/ui';
import { STATIC_BASE_URL } from '@/constants';

import ConstactsTabSwitcher from '@/components/ui/molecules/ConstactsTabSwitcher.vue';

import { Route } from '@/router/types';

const filterContacts = ref('');
</script>

<style lang="scss" scoped>
.who-topay {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: auto;
  position: relative;

  > .title {
    font-weight: 800;
    font-size: 28px;
    line-height: 34px;
    letter-spacing: 0.0038em;
    margin-bottom: 24px;
  }
}

.circle-add {
  font-size: 33px;
  color: $color-primary;
}
</style>
