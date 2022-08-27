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
        <div class="flex">
          <img
            class="icon"
            :src="`${STATIC_BASE_URL}/static/menu/google.svg`"
          />
          <p class="text">
            {{ $t('views.profile.profileSettings.2FAGoogle') }}
          </p>
          <InputSwitch v-model="is2FAConfigured" class="switcher" />
        </div>
      </div>
    </template>
    <template #fixed-footer>
      <m-base-button block @click="onContinue">{{
        $t('configureApp.changeAppCTA')
      }}</m-base-button>
    </template>
  </t-top-navigation>

  <m-base-toast
    v-model:visible="showPopup"
    content-style="border-radius:32px"
    @update:visible="onCancel"
  >
    <template #image>
      <div class="popup-image">
        <img
          :src="`${STATIC_BASE_URL}/static/media/attention.svg`"
          class="image"
        />
      </div>
    </template>
    <template #description>
      <div class="popup-description">
        <h1 class="title">{{ $t('configureApp.ChangeAppPopupTitle') }}</h1>
        <p class="description">
          {{ $t('configureApp.ChangeAppMessage') }}
        </p>
      </div>
    </template>
    <template #content-footer>
      <div class="popup-footer">
        <m-base-button class="btn mb-3" size="large" @click="onConfirm">
          {{ $t('common.continueCta') }}
        </m-base-button>
        <m-base-button
          class="btn"
          size="large"
          view="secondary"
          @click="onCancel"
        >
          {{ $t('common.cancelCta') }}
        </m-base-button>
      </div>
    </template>
  </m-base-toast>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { inject, ref, watch } from 'vue';

import { TTopNavigation } from '@/components/ui';
import { useRouter } from 'vue-router';
import { Route } from '@/router/types';

import { use2faStore } from '@/stores/2fa';
import { useMfaStore } from '@/stores/mfa';
import { useProfileStore } from '@/stores/profile';
import { STATIC_BASE_URL } from '@/constants';

import InputSwitch from 'primevue/inputswitch';
import { uiKitKey } from '@/types/symbols';

const uiKit = inject(uiKitKey);
const { MBaseToast, MBaseButton } = uiKit!;

const router = useRouter();

const twofaStore = use2faStore();
const pStore = useProfileStore();
const showPopup = ref(false);

const is2FAConfigured = ref(pStore.user.is2FAConfigured);

const onContinue = () => {
  showPopup.value = true;
};

const onConfirm = () => {
  showPopup.value = false;
  if (pStore.user.is2FAConfigured) {
    const mfaStore = useMfaStore();
    const routePath = router.resolve({ name: Route.ProfileSettings }).path;

    mfaStore.show({
      successRoute: routePath,
      async callback() {
        // update profile info about 2fa is enabled or not
        await pStore.init();
      },
    });
    twofaStore.disable();
  } else {
    router.push({
      name: Route.InstallApp,
    });
  }
};

const onCancel = () => {
  showPopup.value = false;
  is2FAConfigured.value = pStore.getUser.is2FAConfigured;
};

watch(is2FAConfigured, (val) => {
  if (val) {
    onContinue();
  } else {
    if (pStore.user.is2FAConfigured) {
      const mfaStore = useMfaStore();
      const routePath = router.resolve({ name: Route.ProfileSettings }).path;

      mfaStore.show({
        successRoute: routePath,
        async callback() {
          // update profile info about 2fa is enabled or not
          await pStore.init();
        },
      });
      twofaStore.disable();
    }
  }
});
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

.flex {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
}

.popup-image {
  display: flex;
  justify-content: center;
  width: 100%;

  > .image {
    width: 50px;
    height: 50px;
  }
}
</style>
