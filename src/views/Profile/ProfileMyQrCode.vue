<template name="AccountProfile">
  <div class="account-profile">
    <div class="header">
      <div class="left">
        <img
          class="back"
          src="@/assets/icon/arrow-left.svg"
          alt="arrow-left"
          @click="$router.push('/profile')"
        />
        <h1 class="title">
          {{ accountName }}
        </h1>
        <div class="flex">
          <p class="key">
            My ID: <a class="link-to">{{ accountID }}</a>
          </p>
          <img src="@/assets/icon/edit.svg" alt="edit" />
        </div>
      </div>
      <ContactInitials :name="accountName" />
    </div>
    <div class="main">
      <img class="qrcode" src="@/assets/images/qr-code.png" alt="qr" />
      <p class="text">{{ $t('views.profile.profileQRCode.getPaid') }}</p>
      <div class="flex">
        <a class="link-to"> liber.me/{{ link }}</a>
        <img src="@/assets/icon/copy.svg" alt="copy" />
      </div>
      <div class="controls">
        <button class="btn" type="button">
          {{ $t('views.profile.profileQRCode.scan') }}
        </button>
        <button class="btn active" type="button">
          {{ $t('views.profile.profileQRCode.code') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, computed } from 'vue';

import { useProfileStore } from '@/stores/profile';

import ContactInitials from '@/components/ui/atoms/ContactInitials.vue';

const profileStore = useProfileStore();

const accountName = computed(
  () => `${profileStore.user.firstName} ${profileStore.user.lastName}`
);
const link = computed(() => accountName.value.replaceAll(' ', ''));
const accountID = computed(() => profileStore.user.phone);

onBeforeMount(() => {
  if (!profileStore.user.id) profileStore.init();
});
</script>

<style lang="scss" scoped>
.account-profile {
  display: flex;
  flex-direction: column;
  height: 100vh;
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

      > .key {
        font-size: 20px;
        line-height: 25px;
        display: flex;
        align-items: center;
        letter-spacing: -0.0045em;
        color: $color-dark-grey;
      }
    }
  }

  > .main {
    padding-top: 46px;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;

    > .qrcode {
      margin-bottom: 40px;
    }

    > .text {
      font-weight: 500;
      font-size: 17px;
      line-height: 22px;
      text-align: center;
      letter-spacing: -0.0043em;
      color: $color-dark-grey;
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
</style>
