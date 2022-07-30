<template>
  <t-top-navigation with-fixed-footer @click:left-icon="backToLogin">
    <template #title>{{ $t('auth.restore.contactSupport') }}</template>
    <template #subtitle>
      <div class="description">
        {{ $t('auth.restore.ifYouHaveLostAccessDescription') }}
        <a class="link" @click="contactSupport">{{ SUPPORT_EMAIL }}</a>
      </div>
    </template>
    <template #content>
      <div class="image-wrapper">
        <img
          class="image"
          src="@/assets/images/contact_envelope.svg"
          alt="contact envelope"
        />
      </div>
    </template>
    <template #fixed-footer>
      <div class="footer-wrapper">
        <m-base-button class="btn" @click="contactSupport">
          {{ $t('auth.restore.contact') }}
        </m-base-button>
      </div>
    </template>
  </t-top-navigation>
</template>

<script lang="ts" setup>
import { inject } from 'vue';
import { useRouter } from 'vue-router';

import { Route } from '@/router/types';
import { SUPPORT_EMAIL } from '@/constants';

import { uiKitKey } from '@/types/symbols';

const uiKit = inject(uiKitKey);
const { MBaseButton } = uiKit!;

import TTopNavigation from '@/components/ui/templates/TTopNavigation.vue';

const router = useRouter();

const backToLogin = (): void => {
  router.push({
    name: Route.Login,
  });
};

const contactSupport = (): void => {
  window.location.href = `mailto:${SUPPORT_EMAIL}?subject=Account restore request`;
};
</script>

<style lang="scss" scoped>
.image-wrapper {
  width: 100%;
  min-height: 352px;
  margin-top: 10%;
  display: flex;
  justify-content: center;
}

.footer-wrapper {
  display: flex;

  > .btn {
    flex-grow: 100;
  }
}

.link {
  user-select: none;
  cursor: pointer;
  text-decoration: none;
  color: $color-primary;
}
</style>
