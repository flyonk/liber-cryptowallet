<template>
  <t-top-navigation with-fixed-footer nav-with-custom-top-left>
    <template #content>
      <div class="image-wrapper">
        <img
          class="image"
          :src="`${STATIC_BASE_URL}/static/illustrations/phone.png`"
        />
      </div>
      <div class="content-wrapper">
        <h1 class="title">{{ $t('views.pPhoneVerified.title') }}</h1>
        <p class="description">{{ $t('views.pPhoneVerified.description') }}</p>
        <p class="phone">{{ phone }}</p>
      </div>
    </template>
    <template #fixed-footer>
      <div class="footer-wrapper">
        <m-base-button
          class="done"
          @click="$router.push({ name: Route.ProfilePhonesAndEmails })"
        >
          {{ $t('views.pPhoneVerified.done') }}</m-base-button
        >
      </div>
    </template>
  </t-top-navigation>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { STATIC_BASE_URL } from '@/constants';
import { Route } from '@/router/types';
import { useProfileStore } from '@/stores/profile';
import { computed } from 'vue-demi';
import { TTopNavigation } from '@/components/ui';
import { uiKitKey } from '@/types/symbols';

const uiKit = inject(uiKitKey);
const { MBaseButton } = uiKit!;

const pStore = useProfileStore();
const phone = computed(() => {
  return pStore?.getUser?.additionalPhones?.at(-1) || '+7 777 777 7777';
});
</script>

<style lang="scss" scoped>
.image-wrapper {
  margin-top: 60px;
  display: flex;
  justify-content: center;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 35px;
  margin-top: 50px;

  > .title {
    font-weight: 600;
    font-size: 22px;
    line-height: 34px;
    text-align: center;
    letter-spacing: -0.0026em;
  }

  > .description {
    font-weight: 400;
    font-size: 17px;
    line-height: 22px;
    text-align: center;
    letter-spacing: -0.0043em;
    margin-top: 16px;
  }

  > .phone {
    font-weight: 600;
    font-size: 17px;
    line-height: 22px;
    text-align: center;
    letter-spacing: -0.0043em;
    color: $color-brand-primary;
    margin-top: 16px;
  }
}

.footer-wrapper {
  display: flex;
  justify-items: center;
  padding: 0 16px;

  > .done {
    margin-top: 16px;
    width: 100%;
  }
}
</style>
