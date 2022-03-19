<template name="Recepients">
  <div class="who-topay">
    <div class="header">
      <img
        src="@/assets/images/avatar.png"
        @click="$router.push({ name: Route.ProfileMainView })"
      />
      <div class="flex">
        <img
          class="add mr-3"
          src="@/assets/icon/system_qr.svg"
          alt="circle-add"
        />
        <img
          class="add"
          src="@/assets/icon/circle-add.svg"
          alt="circle-add"
          @click="
            $router.push({
              name: Route.Deposit,
            })
          "
        />
      </div>
    </div>
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
        Liber Friends
      </router-link>
      <router-link
        :to="{ name: Route.RecepientsPhone }"
        class="contact-tabs-item"
      >
        All Contacts
      </router-link>
    </div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { BaseInput } from '@/components/ui';

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

  > .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

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
