<template name="AccountSettings">
  <t-top-navigation
    left-icon-name="icon-app-navigation-close"
    @click:left-icon="$router.push({ name: Route.DashboardHome })"
  >
    <template #title>
      <div class="left">
        <h1 class="text--title-1 mb-2">{{ accountName }}</h1>
        <div class="flex">
          <p class="text--title-3">
            {{ $t('views.profile.profileSettings.myID') }}
          </p>
          <a class="text--title-3">{{ accountID }}</a>
        </div>
      </div>
    </template>
    <template #right>
      <div class="initials-wrapper">
        <a-contact-initials :name="accountName" />
      </div>
    </template>
    <template #content>
      <div v-if="!showCloseAccount" class="account-settings">
        <div class="controls" style="display: none">
          <button class="btn -blue">
            <img class="icon" :src="`${menuStaticFolder}user_heart.svg`" />
            {{ $t('views.profile.profileSettings.invite') }}
          </button>
          <button class="btn -white">
            {{ $t('views.profile.profileSettings.copy') }}
          </button>
        </div>
        <div class="main">
          <h6 class="text--footnote mb-2 font-medium">
            {{ $t('views.profile.profileSettings.profile') }}
          </h6>
          <ul class="list list--profile">
            <li
              class="item"
              @click="$router.push({ name: Route.ProfileMyQrCode })"
            >
              <img class="icon" :src="`${menuStaticFolder}qr-mini.svg`" />
              <p class="text-default text-brand-primary">
                {{ $t('views.profile.profileSettings.QRCode') }}
              </p>
            </li>
            <router-link
              :to="{ name: Route.ProfileEdit, params: { id: '1' } }"
              class="item"
            >
              <img class="icon" :src="`${menuStaticFolder}user_circle.svg`" />
              <p class="text-default text-brand-primary">
                {{ $t('views.profile.profileSettings.details') }}
              </p>
            </router-link>
            <router-link
              :to="{ name: Route.ProfilePhonesAndEmails }"
              class="item"
            >
              <img
                class="icon"
                :src="`${menuStaticFolder}circle_check_outline.svg`"
              />
              <p class="text-default">
                {{
                  $t('views.profile.profileSettings.acceptedPhonesAndEmails')
                }}
              </p>
            </router-link>
            <router-link :to="{ name: Route.AccountMain }" class="item">
              <img class="icon" :src="`${menuStaticFolder}data.svg`" />
              <p class="text-default">
                {{ $t('views.profile.profileSettings.allAccounts') }}
              </p>
            </router-link>
            <router-link :to="{ name: Route.ProfileHelp }" class="item">
              <img class="icon" :src="`${menuStaticFolder}help_circle.svg`" />
              <p class="text-default">
                {{ $t('views.profile.profileSettings.help') }}
              </p>
            </router-link>
          </ul>
          <h6 class="text--footnote mb-2 font-medium">
            {{ $t('views.profile.profileSettings.security') }}
          </h6>
          <ul class="list security--profile">
            <router-link :to="{ name: Route.ChangePasscode }" class="item">
              <img class="icon" :src="`${menuStaticFolder}lock.svg`" />
              <p class="text-default">
                {{ $t('views.profile.profileSettings.changePasscode') }}
              </p>
            </router-link>
            <li
              class="item"
              @click="$router.push({ name: Route.ProfilePrivacy })"
            >
              <img class="icon" :src="`${menuStaticFolder}shield.svg`" />
              <p class="text-default">
                {{ $t('views.profile.profileSettings.privacy') }}
              </p>
            </li>
            <router-link :to="{ name: Route.ChangeAuthapp }" class="item">
              <img class="icon" :src="`${menuStaticFolder}google.svg`" />
              <p class="text-default">
                {{ $t('views.profile.profileSettings.2FAGoogle') }}
              </p>
              <p class="text selected-language">
                {{ is2FAConfigured ? $t('common.on') : $t('common.off') }}
              </p>
            </router-link>
            <router-link class="item" disabled to="/profile/devices">
              <img class="icon" :src="`${menuStaticFolder}devices.svg`" />
              <p class="text-default">
                {{ $t('views.profile.profileSettings.devices') }}
              </p>
            </router-link>
          </ul>
          <h6 class="text--footnote mb-2 font-medium">
            {{ $t('views.profile.profileSettings.appearance') }}
          </h6>
          <ul class="list label--profile">
            <li
              class="item"
              @click="showLanguageSelect = true"
              @close="showLanguageSelect = false"
            >
              <img class="icon" :src="`${menuStaticFolder}world.svg`" />
              <p class="text-default">
                {{ $t('views.profile.profileSettings.language') }}
              </p>
              <p class="text selected-language">{{ locale }}</p>
            </li>
          </ul>
          <h6 class="text--footnote mb-2 font-medium">
            {{ $t('views.profile.profileSettings.system') }}
          </h6>
          <ul class="list label--profile">
            <li class="item" @click="showCloseAccount = true">
              <img class="icon" :src="`${menuStaticFolder}circle_close.svg`" />
              <p class="text">
                {{ $t('views.profile.profileSettings.close') }}
              </p>
            </li>
            <li class="item" @click="onLogout">
              <img class="icon" :src="`${menuStaticFolder}log_out.svg`" />
              <p class="text-default">
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
        <template v-if="MULTI_LANGUAGE">
          <LanguageSwitcher
            v-if="showLanguageSelect"
            @close="showLanguageSelect = false"
          />
        </template>
      </div>
      <!-- TODO: fix close account behavior -->
      <CloseAccount :show-menu="showCloseAccount" @close-menu="closeMenu" />
    </template>
  </t-top-navigation>
  <ChangePasscodeSuccess />
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import { onMounted, ref, computed, inject } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

import { useAuthStore } from '@/stores/auth';
import { useProfileStore } from '@/stores/profile';
import { useErrorsStore } from '@/stores/errors';
import { STATIC_BASE_URL, MULTI_LANGUAGE } from '@/constants';

import { Route } from '@/router/types';
import { showConfirm } from '@/helpers/nativeDialog';

import CloseAccount from '@/components/ui/organisms/CloseAccount.vue';
import { TTopNavigation } from '@/components/ui';
import LanguageSwitcher from '@/components/ui/organisms/LanguageSwitcher.vue';
import { uiKitKey } from '@/types/symbols';
import ChangePasscodeSuccess from '@/views/ConfigureApp/ChangePasscodeSuccess.vue';

const uiKit = inject(uiKitKey);
const { AContactInitials } = uiKit!;

const route = useRouter();
const authStore = useAuthStore();
const errorsStore = useErrorsStore();
const { tm } = useI18n();

const menuStaticFolder = ref(`${STATIC_BASE_URL}/static/menu/`);

const profileStore = useProfileStore();
let { phone, firstName, lastName } = profileStore.getUser;

const is2FAConfigured = computed(() => profileStore.user.is2FAConfigured);

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
      errorsStore.handle({
        err,
        name: 'ProfileSettings',
        ctx: 'onMounted',
        description: 'Error during profile initialization',
      });
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

  await authStore.logout();

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

  //Hide scroll-bar on mobile device
  &::-webkit-scrollbar {
    display: none;
  }

  > .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    > .left {
      > .back {
        margin-bottom: 20px;
      }

      > .account {
        font-size: 20px;
        line-height: 25px;
        display: flex;
        align-items: center;
        letter-spacing: -0.0045em;
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
    touch-action: manipulation;

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

        > .selected-language {
          margin-left: auto;
          margin-right: 12px;
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
}

.initials-wrapper > :deep(.initials) {
  width: 56px;
  height: 56px;
  flex-shrink: 0;
}
</style>
