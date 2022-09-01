<template name="AccountProfile">
  <t-top-navigation
    with-fixed-footer
    @click:left-icon="$router.push('/profile')"
  >
    <template #title>{{ accountName }}</template>
    <template #subtitle>
      <div class="flex">
        <p class="text--title-3 mr-1">
          {{ $t('views.profile.profileSettings.myID') }}
        </p>
        <a class="link-to">{{ accountID }}</a>
        <img src="@/assets/icon/edit.svg" alt="edit" /></div
    ></template>
    <template #right
      ><div class="initials-wrapper">
        <a-contact-initials :name="accountName" />
      </div>
    </template>
    <template #content>
      <div class="account-profile">
        <div class="main">
          <img class="qrcode" src="@/assets/images/qr-code.png" alt="qr" />
          <p class="text--body">
            {{ $t('views.profile.profileQRCode.getPaid') }}
          </p>
          <div class="flex">
            <a class="link-to">{{ linkToCopy }}</a>
            <img
              :src="`${STATIC_BASE_URL}/static/menu/copy.svg`"
              alt="copy"
              @click="copyToClipboard"
            />
          </div>
        </div>
      </div>
    </template>
    <template #fixed-footer>
      <!-- <div class="controls">
        <button class="btn" type="button">
          {{ $t('views.profile.profileQRCode.scan') }}
        </button>
        <button class="btn active" type="button">
          {{ $t('views.profile.profileQRCode.code') }}
        </button>
      </div> -->
    </template>
  </t-top-navigation>
</template>

<script setup lang="ts">
import { onBeforeMount, computed, inject } from 'vue';
import { Clipboard } from '@/helpers/clipboard/clipboard';
import { useToast } from 'primevue/usetoast';
import { useI18n } from 'vue-i18n';

import { useProfileStore } from '@/stores/profile';

import { TTopNavigation } from '@/components/ui';
import { STATIC_BASE_URL } from '@/constants';
import { useErrorsStore } from '@/stores/errors';
import { uiKitKey } from '@/types/symbols';

const uiKit = inject(uiKitKey);
const { AContactInitials } = uiKit!;

const profileStore = useProfileStore();
const toast = useToast();
const errorsStore = useErrorsStore();
const { tm } = useI18n();

const accountName = computed(
  () => `${profileStore.user.firstName} ${profileStore.user.lastName}`
);
const link = computed(() => accountName.value.replaceAll(' ', ''));
const accountID = computed(() => profileStore.user.phone);
const linkToCopy = computed(() => `liber.me/${link.value}`);

onBeforeMount(() => {
  if (!profileStore.user.id) profileStore.init();
});

const copyToClipboard = async () => {
  try {
    await Clipboard.write({
      string: linkToCopy.value,
    });
    toast.add({
      summary: tm('common.copySuccess') as string,
      life: 3000,
      closable: false,
    });
  } catch (err) {
    errorsStore.handle({
      err,
      name: 'ConfigureApp',
      ctx: 'copyToClipboard',
      description: tm('common.copyFailure') as string,
    });
  }
};
</script>

<style lang="scss" scoped>
.account-profile {
  display: flex;
  flex-direction: column;
  padding: 60px 16px 50px;
  flex-grow: 1;
  overflow: auto;

  > .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    > .left {
      > .back {
        margin-bottom: 20px;
      }

      > .title {
        font-weight: 800;
        font-size: 28px;
        line-height: 34px;
        letter-spacing: 0.0038em;
        margin-bottom: 8px;
      }
    }
  }

  > .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;

    > .qrcode {
      margin-bottom: 40px;
    }

    > .controls {
      margin-top: auto;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 40px;
      background: $color-light-grey;
      border-radius: 8px;

      > .btn {
        width: 48%;
        font-size: 16px;
        line-height: 21px;
        letter-spacing: -0.0031em;
        color: $color-brand-primary;
      }

      > .active {
        height: 32px;
        left: 171px;
        top: 4px;
        background: $color-brand-primary;
        border-radius: 6px;
        color: white;
        font-weight: 600;
        font-size: 16px;
        line-height: 21px;
        text-align: center;
        letter-spacing: -0.0031em;
      }
    }
  }
}

.link-to {
  color: $color-primary;
  padding: 0 6px;
}

.controls {
  margin-top: auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  background: $color-light-grey;
  border-radius: 8px;

  > .btn {
    width: 48%;
    font-size: 16px;
    line-height: 21px;
    letter-spacing: -0.0031em;
    color: $color-brand-primary;
  }

  > .active {
    height: 32px;
    left: 171px;
    top: 4px;
    background: $color-brand-primary;
    border-radius: 6px;
    color: white;
    font-weight: 600;
    font-size: 16px;
    line-height: 21px;
    text-align: center;
    letter-spacing: -0.0031em;
  }
}

.initials-wrapper > :deep(.initials) {
  width: 56px;
  height: 56px;
  flex-shrink: 0;
}
</style>
