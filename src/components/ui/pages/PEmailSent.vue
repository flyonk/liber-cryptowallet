<template>
  <t-cta-info>
    <template #image>
      <img :src="`${STATIC_BASE_URL}/static/illustrations/mail-sent.png`" />
    </template>
    <template #content>
      <div class="content-wrapper">
        <h1 class="title">{{ $t('views.pEmailSent.title') }}</h1>
        <p class="description">{{ $t('views.pEmailSent.description') }}</p>
        <p class="email">{{ email }}</p>
      </div>
    </template>
    <template #footer>
      <div class="footer-wrapper">
        <p class="description">
          {{ $t('views.pEmailSent.footerDescription') }}
        </p>
        <base-button
          class="inbox"
          @click="$router.push({ name: Route.ProfilePhonesAndEmails })"
        >
          {{ $t('views.pEmailSent.goToInbox') }}</base-button
        >
        <base-button view="flat" class="resend">
          {{ $t('views.pEmailSent.resend') }}</base-button
        >
      </div>
    </template>
  </t-cta-info>
</template>

<script setup lang="ts">
import { STATIC_BASE_URL } from '@/constants';
import { Route } from '@/router/types';
import { useProfileStore } from '@/stores/profile';
import { computed } from 'vue-demi';
import { BaseButton } from '..';
import TCtaInfo from '../templates/TCtaInfo.vue';

const pStore = useProfileStore();
const email = computed(() => {
  return pStore.getUser.additionalEmails.at(-1);
});
</script>

<style lang="scss" scoped>
.content-wrapper {
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

  > .email {
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
  flex-direction: column;
  justify-items: center;
  padding: 0 16px;

  > .description {
    font-weight: 400;
    font-size: 17px;
    line-height: 22px;
    text-align: center;
    letter-spacing: -0.0043em;
    color: $color-brand-primary;
    text-align: center;
  }

  > .inbox {
    margin-top: 16px;
  }

  > .resend {
    margin-top: 16px;
  }
}
</style>
