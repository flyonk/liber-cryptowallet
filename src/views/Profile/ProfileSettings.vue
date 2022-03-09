<template name="AccountSettings">
  <div class="account-settings">
    <div class="header">
      <div class="left">
        <img
          class="back"
          src="@/assets/icon/arrow-left.svg"
          alt="arrow-left"
          @click="$router.push('/home')"
        />
        <h1 class="title">
          {{ accountName }}
        </h1>
        <div class="flex">
          <p class="account">
            My ID: <a class="link">{{ accountID }}</a>
          </p>
          <!-- <img
            src="@/assets/icon/edit.svg"
            alt="edit"
          > -->
        </div>
      </div>
      <div class="right">
        {{ nameInitials }}
      </div>
    </div>
    <div class="controls">
      <button class="btn -blue">
        <img class="icon" src="@/assets/icon/user_heart.svg" />
        {{ $t('views.profile.profileSettings.invite') }}
      </button>
      <button class="btn -white">
        {{ $t('views.profile.profileSettings.copy') }}
      </button>
    </div>
    <div class="main">
      <h6 class="subtitle">
        {{ $t('views.profile.profileSettings.profile') }}
      </h6>
      <ul class="list list--profile">
        <li class="item" @click="$router.push('/account/profile')">
          <img class="icon" src="@/assets/icon/qr-mini.svg" />
          <p class="text">{{ $t('views.profile.profileSettings.QRCode') }}</p>
        </li>
        <router-link to="/profile/details/1" class="item">
          <img class="icon" src="@/assets/icon/user_circle.svg" />
          <p class="text">{{ $t('views.profile.profileSettings.details') }}</p>
        </router-link>
        <router-link to="/account" class="item">
          <img class="icon" src="@/assets/icon/data.svg" />
          <p class="text">
            {{ $t('views.profile.profileSettings.allAccounts') }}
          </p>
        </router-link>
        <router-link to="/profile/help" class="item">
          <img class="icon" src="@/assets/icon/help_circle.svg" />
          <p class="text">{{ $t('views.profile.profileSettings.help') }}</p>
        </router-link>
      </ul>
      <h6 class="subtitle">
        {{ $t('views.profile.profileSettings.security') }}
      </h6>
      <ul class="list security--profile">
        <router-link to="/passcode" class="item">
          <img class="icon" src="@/assets/icon/lock.svg" />
          <p class="text">
            {{ $t('views.profile.profileSettings.changePasscode') }}
          </p>
        </router-link>
        <li class="item">
          <img class="icon" src="@/assets/icon/shield.svg" />
          <p class="text">{{ $t('views.profile.profileSettings.privacy') }}</p>
        </li>
        <li class="item">
          <img class="icon" src="@/assets/icon/google.svg" />
          <p class="text">
            {{ $t('views.profile.profileSettings.2FAGoogle') }}
          </p>
        </li>
        <router-link to="/profile/devices" class="item">
          <img class="icon" src="@/assets/icon/devices.svg" />
          <p class="text">{{ $t('views.profile.profileSettings.devices') }}</p>
        </router-link>
        <li class="item">
          <img class="icon" src="@/assets/icon/touchid.svg" />
          <p class="text">{{ $t('views.profile.profileSettings.signIn') }}</p>
          <InputSwitch v-model="isTouchIdOn" class="switcher" />
        </li>
      </ul>
      <h6 class="subtitle">{{ $t('views.profile.profileSettings.label') }}</h6>
      <ul class="list label--profile">
        <li class="item" @click="showCloseAccount = true">
          <img class="icon" src="@/assets/icon/circle_close.svg" />
          <p class="text">{{ $t('views.profile.profileSettings.close') }}</p>
        </li>
        <li class="item">
          <img class="icon" src="@/assets/icon/log_out.svg" />
          <p class="text">{{ $t('views.profile.profileSettings.logOut') }}</p>
        </li>
      </ul>
    </div>
    <div class="footer">
      <p class="text">{{ $t('views.profile.profileSettings.version') }}</p>
      <p class="text">{{ $t('views.profile.profileSettings.copyright') }}</p>
    </div>
  </div>
  <CloseAccount :show-menu="showCloseAccount" @close-menu="closeMenu" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import InputSwitch from 'primevue/inputswitch';
import CloseAccount from '@/components/UI/CloseAccount.vue';

const accountName = 'Abraham Watson';
const accountID = '@abrahamwatson';
const isTouchIdOn = ref(false);
const showCloseAccount = ref(false);

const nameInitials = computed(() => {
  let parts = accountName.split(' ');
  return parts[0][0] + parts[1][0];
});

function closeMenu() {
  showCloseAccount.value = false;
  console.log(showCloseAccount.value);
}
</script>

<style lang="scss" scoped>
.account-settings {
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

      > .account {
        font-size: 20px;
        line-height: 25px;
        display: flex;
        align-items: center;
        letter-spacing: -0.0045em;
        color: $color-dark-grey;
      }
    }

    > .right {
      height: 56px;
      width: 56px;
      background: $color-yellow-100;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      align-self: center;
    }
  }

  > .controls {
    display: flex;
    margin-bottom: 24px;

    > .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 13px;
      line-height: 18px;
      letter-spacing: -0.0008em;

      &.-blue {
        width: 143px;
        background: $color-primary;
        color: $color-white;
        margin-right: 8px;
      }

      &.-white {
        width: 117px;
        background: $color-light-grey;
        color: $color-primary;
      }

      > .icon {
        margin-right: 9px;
      }
    }
  }

  > .main {
    > .subtitle {
      font-weight: 600;
      font-size: 13px;
      line-height: 18px;
      letter-spacing: -0.0008em;
      color: $color-dark-grey;
      margin-bottom: 10px;
    }

    > .list {
      display: flex;
      flex-direction: column;
      margin-bottom: 24px;

      > .item {
        display: flex;
        align-items: center;
        height: 56px;
        border-top: 1px solid rgb(175 179 195 / 30%);

        &:last-child {
          border-bottom: 1px solid rgb(175 179 195 / 30%);
        }

        > .icon {
          margin-right: 12px;
        }

        > .text {
          font-weight: 500;
          font-size: 16px;
          line-height: 21px;
          display: flex;
          align-items: center;
          letter-spacing: -0.0031em;
          color: $color-brand-primary;
        }

        > .switcher {
          margin-left: auto;
        }
      }
    }
  }

  > .footer {
    > .text {
      font-weight: 600;
      text-align: center;
      font-size: 13px;
      line-height: 18px;
      letter-spacing: -0.0008em;
      color: $color-dark-grey;
      margin-bottom: 4px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
