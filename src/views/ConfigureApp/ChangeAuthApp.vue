<template>
  <t-top-navigation
    with-fixed-footer
    @click:left-icon="$router.push({ name: Route.ProfileSettings })"
  >
    <template #title> {{ $t('common.googleAuthenticator') }}</template>
    <template #content>
      <div class="content-wrapper">
        <p class="auth-item" style="margin-bottom: 15px">
          <img
            src="@/assets/brands/ga.png"
            alt="Google Authenticator"
            class="auth-app-icon"
          />
        </p>
        <p class="text-default">
          {{ $t('configureApp.changeAppMessage') }}
        </p>
      </div>
    </template>
    <template #fixed-footer>
      <base-button block @click="onContinue">{{
        $t('configureApp.changeAppCTA')
      }}</base-button>
    </template>
  </t-top-navigation>

  <base-toast v-model:visible="showPopup" :severity="'attention'">
    <template #description>
      <div class="popup-description">
        <h1 class="title">{{ $t('configureApp.ChangeAppPopupTitle') }}</h1>
        <p class="description">
          {{ $t('configureApp.ChangeAppMessage') }}
        </p>
      </div>
    </template>
    <template #footer>
      <div class="popup-footer">
        <BaseButton class="btn mb-3" size="large" @click="onConfirm">
          {{ $t('common.continueCta') }}
        </BaseButton>
        <BaseButton
          class="btn"
          size="large"
          view="secondary"
          @click="showPopup = false"
        >
          {{ $t('common.cancelCta') }}
        </BaseButton>
      </div>
    </template>
  </base-toast>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { ref } from 'vue';

import TTopNavigation from '@/components/ui/templates/TTopNavigation.vue';
import { BaseButton, BaseToast } from '@/components/ui';
import { useRouter } from 'vue-router';
import { Route } from '@/router/types';

import { use2faStore } from '@/stores/2fa';
import { useMfaStore } from '@/stores/mfa';
import { useProfileStore } from '@/stores/profile';

const router = useRouter();

const twofaStore = use2faStore();
const pStore = useProfileStore();
const showPopup = ref(false);

const onContinue = () => {
  showPopup.value = true;
};

const onConfirm = () => {
  showPopup.value = false;
  if (pStore.user.is2FAConfigured) {
    const mfaStore = useMfaStore();
    mfaStore.show({
      successRoute: Route.InstallApp,
    });
    twofaStore.disable();
  } else {
    router.push({
      name: Route.InstallApp,
    });
  }
};
</script>

<style lang="scss" scoped>
.page-wrapper {
  margin: 15px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.text-default {
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: -0.0043em;
  color: $color-brand-primary;
  text-align: center;
  max-width: 16em;
}

.auth-item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.auth-app-icon {
  max-width: 120px;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
}

.popup-description {
  margin-bottom: 65px;

  > .title {
    font-weight: 600;
    font-size: 22px;
    line-height: 34px;
    text-align: center;
    letter-spacing: -0.0026em;
    color: $color-brand-550;
    margin-bottom: 8px;
  }

  > .description {
    font-weight: 400;
    font-size: 17px;
    line-height: 22px;
    text-align: center;
    letter-spacing: -0.0043em;
    color: $color-brand-2-300;
  }
}

.popup-footer {
  display: flex;
  flex-direction: column;
}
</style>
