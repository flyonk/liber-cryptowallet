<template name="AccountSettings">
  <t-top-navigation
    left-icon-name="icon-app-navigation-close"
    @click:left-icon="$router.push({ name: Route.DashboardHome })"
  >
    <template #title>
      <div class="left">
        <h1 class="title">{{ accountName }}</h1>
        <div class="flex">
          <p class="account">
            My ID:
            <a class="link">{{ accountID }}</a>
          </p>
        </div>
      </div>
    </template>
    <template #right>
      <div class="initials-wrapper">
        <ContactInitials :name="accountName" />
      </div>
    </template>
    <template #content>
      <div v-if="!showCloseAccount" class="account-settings">
        <div class="controls" style="display: none">
          <button class="btn -blue">
            <img class="icon" alt src="@/assets/icon/user_heart.svg" />
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
            <li
              class="item"
              @click="$router.push({ name: Route.ProfileMyQrCode })"
            >
              <img class="icon" alt src="@/assets/icon/qr-mini.svg" />
              <p class="text">
                {{ $t('views.profile.profileSettings.QRCode') }}
              </p>
            </li>
            <router-link
              :to="{ name: Route.ProfileEdit, params: { id: '1' } }"
              class="item"
            >
              <img class="icon" alt src="@/assets/icon/user_circle.svg" />
              <p class="text">
                {{ $t('views.profile.profileSettings.details') }}
              </p>
            </router-link>
            <router-link :to="{ name: Route.AccountMain }" class="item">
              <img class="icon" alt src="@/assets/icon/data.svg" />
              <p class="text">
                {{ $t('views.profile.profileSettings.allAccounts') }}
              </p>
            </router-link>
            <router-link :to="{ name: Route.ProfileHelp }" class="item">
              <img class="icon" alt src="@/assets/icon/help_circle.svg" />
              <p class="text">{{ $t('views.profile.profileSettings.help') }}</p>
            </router-link>
          </ul>
          <h6 class="subtitle">
            {{ $t('views.profile.profileSettings.security') }}
          </h6>
          <ul class="list security--profile">
            <router-link :to="{ name: Route.ChangePasscode }" class="item">
              <img class="icon" alt src="@/assets/icon/lock.svg" />
              <p class="text">
                {{ $t('views.profile.profileSettings.changePasscode') }}
              </p>
            </router-link>
            <li
              class="item"
              @click="$router.push({ name: Route.ProfilePrivacy })"
            >
              <img class="icon" alt src="@/assets/icon/shield.svg" />
              <p class="text">
                {{ $t('views.profile.profileSettings.privacy') }}
              </p>
            </li>
            <router-link :to="{ name: Route.ChangeAuthapp }" class="item">
              <img class="icon" alt src="@/assets/icon/google.svg" />
              <p class="text">
                {{ $t('views.profile.profileSettings.2FAGoogle') }}
              </p>
            </router-link>
            <router-link class="item" disabled to="/profile/devices">
              <img class="icon" alt src="@/assets/icon/devices.svg" />
              <p class="text">
                {{ $t('views.profile.profileSettings.devices') }}
              </p>
            </router-link>
            <biometric-identifier-switcher-button />
          </ul>
          <h6 class="subtitle">
            {{ $t('views.profile.profileSettings.appearance') }}
          </h6>
          <ul class="list label--profile">
            <li
              class="item"
              @click="showLanguageSelect = true"
              @close="showLanguageSelect = false"
            >
              <img class="icon" alt src="@/assets/icon/world.svg" />
              <p class="text">
                {{ $t('views.profile.profileSettings.language') }}
              </p>
              <p class="text selected-language">{{ locale }}</p>
            </li>
          </ul>
          <h6 class="subtitle">
            {{ $t('views.profile.profileSettings.system') }}
          </h6>
          <ul class="list label--profile">
            <li class="item" @click="showCloseAccount = true">
              <img class="icon" alt src="@/assets/icon/circle_close.svg" />
              <p class="text">
                {{ $t('views.profile.profileSettings.close') }}
              </p>
            </li>
            <li class="item" @click="onLogout">
              <img class="icon" alt src="@/assets/icon/log_out.svg" />
              <p class="text">
                {{ $t('views.profile.profileSettings.logOut') }}
              </p>
            </li>
          </ul>
        </div>
        <div class="footer">
          <p class="text">{{ $t('views.profile.profileSettings.version') }}</p>
          <p class="text">
            {{ $t('views.profile.profileSettings.copyright') }}
          </p>
        </div>
        <LanguageSwitcher
          v-if="showLanguageSelect"
          @close="showLanguageSelect = false"
        />
      </div>
      <!-- TODO: fix close account behavior -->
      <CloseAccount :show-menu="showCloseAccount" @close-menu="closeMenu" />
    </template>
  </t-top-navigation>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

import { useAuthStore } from '@/stores/auth';
import { useProfileStore } from '@/stores/profile';
import { useErrorsStore } from '@/stores/errors';

import { Route } from '@/router/types';
import { showConfirm } from '@/helpers/nativeDialog';

import ContactInitials from '@/components/ui/atoms/ContactInitials.vue';
import CloseAccount from '@/components/ui/organisms/CloseAccount.vue';
import {
  TTopNavigation,
  BiometricIdentifierSwitcherButton,
} from '@/components/ui';
import LanguageSwitcher from '@/components/ui/organisms/LanguageSwitcher.vue';

const route = useRouter();
const authStore = useAuthStore();
const errorsStore = useErrorsStore();
const { tm } = useI18n();

const profileStore = useProfileStore();
let { phone, firstName, lastName } = profileStore.getUser;

if (firstName == null) {
  firstName = 'Name';
}
if (lastName == null) {
  lastName = 'Surname';
}
const accountName = ref(`${firstName} ${lastName}`);
const accountID = ref(`${phone}`);
const showCloseAccount = ref(false);
const showLanguageSelect = ref(false);
const { locale } = useI18n({ useScope: 'global' });

onMounted(async () => {
  if (!profileStore.getUser.id)
    try {
      await profileStore.init();
      const user = profileStore.getUser;
      phone = user?.phone;
      firstName = user?.firstName;
      lastName = user?.lastName;
      accountName.value = `${firstName} ${lastName}`;
      accountID.value = phone;
    } catch (err) {
      errorsStore.handle(err, 'ProfileSettings', 'onMounted');
    }
});

function closeMenu() {
  showCloseAccount.value = false;
}

async function onLogout() {
  const confirmed = await showConfirm({
    title: tm(
      'views.profile.profileSettings.logoutConfirmationTitle'
    ) as string,
    message: tm('views.profile.profileSettings.logoutConfirmation') as string,
    okButtonTitle: tm('views.profile.profileSettings.logoutAccept') as string,
    cancelButtonTitle: tm(
      'views.profile.profileSettings.logoutDecline'
    ) as string,
  });

  if (!confirmed) {
    return;
  }

  await authStore.logout(profileStore.getUser.id);

  await route.push({ name: Route.WelcomeLogoScreen });
}
</script>

<style lang="scss" scoped>
.account-settings {
  display: flex;
  flex-direction: column;
  max-height: 75vh;
  padding-top: 10px;
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

        > .selected-language {
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

.left {
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

  > .flex > .account {
    font-size: 20px;
    line-height: 25px;
    display: flex;
    align-items: center;
    letter-spacing: -0.0045em;
    color: $color-dark-grey;
    font-family: Inter, sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 25px;
  }
}

.initials-wrapper > :deep(.initials) {
  width: 56px;
  height: 56px;
}
</style>
