<template name="Recepients">
  <div class="who-topay">
    <contacts-header :avatarIcon="true" :routeBack="Route.ProfileSettings" />
    <h1 class="title">
      {{ $t('views.recepients.recepients') }}
    </h1>
    <BaseInput type="text">
      <template #label> Name, @id, phone, email </template>
    </BaseInput>
    <div class="contact-tabs flex">
      <router-link
        :to="{ name: Route.RecepientsLiber }"
        class="contact-tabs-item"
      >
        {{ $t('ui.friends.liber') }}
      </router-link>
      <router-link
        :to="{ name: Route.RecepientsPhone }"
        class="contact-tabs-item"
        :class="{
          'router-link-exact-active': route.name === Route.RecepientsPhone,
        }"
      >
        {{ $t('ui.friends.all') }}
      </router-link>
    </div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { BaseInput } from '@/components/ui';
import ContactsHeader from '@/components/ui/molecules/ContactsHeader.vue';

import { useRoute } from 'vue-router';

import { Route } from '@/router/types';

const route = useRoute();
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

.contact-tabs {
  margin-bottom: 24px;
}

.contact-tabs-item {
  white-space: nowrap;
  padding: 11px 16px;
  color: $color-brand-primary;
  margin-right: 8px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 114px;
  height: 40px;
  background: #edf0fb;
  font-weight: 600;
  font-size: 13px;
  line-height: 18px;
  letter-spacing: -0.0008em;
}

.router-link-exact-active {
  background: $color-brand-secondary;
  color: $color-white;
}
</style>
