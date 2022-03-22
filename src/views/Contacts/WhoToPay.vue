<template name="who-topay">
  <div class="who-topay">
    <contacts-header />
    <h1 class="title">
      {{ $t('views.sendfunds.whopay') }}
    </h1>
    <BaseInput type="text">
      <template #label> Name, @id, phone, email </template>
    </BaseInput>

    <constacts-tab-switcher
      :liber-route="Route.PayRecepientsLiber"
      :all-route="Route.PayRecepientsPhone"
    />

    <router-view />
  </div>
</template>

<script setup lang="ts">
import { BaseInput } from '@/components/ui';
import ContactsHeader from '@/components/ui/molecules/ContactsHeader.vue';
import ConstactsTabSwitcher from '@/components/ui/molecules/ConstactsTabSwitcher.vue';

import { Route } from '@/router/types';
</script>

<style lang="scss" scoped>
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
}
</style>
