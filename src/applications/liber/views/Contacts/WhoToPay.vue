<template name="who-topay">
  <div class="who-topay">
    <contacts-header />
    <h1 class="title">
      {{ $t('views.sendfunds.whopay') }}
    </h1>
    <MBaseInput v-model="filterContacts" type="text" class="m-base-input">
      <template #label> Name, @id, phone, email </template>
    </MBaseInput>

    <constacts-tab-switcher
      :liber-route="Route.PayRecipientsLiber"
      :all-route="Route.PayRecipientsPhone"
    />

    <router-view :filter="filterContacts" />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue';

import ContactsHeader from '@/components/ui/molecules/ContactsHeader.vue';
import ConstactsTabSwitcher from '@/components/ui/molecules/ConstactsTabSwitcher.vue';

import { Route } from '@/router/types';

const MBaseInput = defineAsyncComponent(() => {
  return import(`@liber-biz/crpw-ui-kit-${process.env.VUE_APP_BRAND}`).then(
    (lib) => lib.MBaseInput
  );
});

const filterContacts = ref('');
</script>

<style lang="scss" scoped>
.m-base-input {
  margin: 0 0 16px;
}

.who-topay {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 60px 16px 0;
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

  > .base-input:deep {
    margin-bottom: 16px;
  }
}
</style>
