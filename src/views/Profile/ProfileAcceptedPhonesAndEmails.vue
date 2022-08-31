<template name="ProfileEdit">
  <div class="page-wrapper">
    <t-top-navigation
      with-fixed-footer
      @click:left-icon="$router.push({ name: Route.ProfileSettings })"
    >
      <template #title>{{
        $t('views.profile.profilePhonesAndEmails.acceptedPhonesAndEmails')
      }}</template>
      <template #top-right>
        <i
          class="icon-plus_circle add"
          @click="$router.push({ name: Route.ProfileAddNewContactData })"
        />
      </template>
    </t-top-navigation>
    <div class="content-wrapper">
      <div v-if="KYCStatus !== EKYCStatus.success" class="status-container">
        <m-kyc-status-card
          :title="cardInfo.title"
          :description="cardInfo.description"
          :icon-name="cardInfo.imgSrc"
          :state-icon="cardInfo.stateIcon"
          :is-cta-required="!!cardInfo.isCtaRequired"
          :cta-text="$t('views.profile.profilePhonesAndEmails.verifyIdentity')"
          @click:cta-button="$router.push({ name: Route.KYCMain })"
        />
      </div>
      <div v-else class="profile-info">
        <h1 class="text--title-3 font-bold">
          {{ $t('views.profile.profilePhonesAndEmails.liberID') }}
        </h1>
        <div class="data-container">
          <div class="row">
            <div class="wrapper">
              <i class="icon-verification icon" />
              <div class="id">@AwesomeLiberId</div>
            </div>
            <i class="icon-copy icon" />
          </div>
        </div>
      </div>
      <br />
      <div class="body-container">
        <h1 class="text--title-3 font-bold">
          {{ $t('views.profile.profilePhonesAndEmails.acceptedContact') }}
        </h1>
        <ul class="data-list">
          <li
            v-for="(value, index) in [phone, ...additionalPhones]"
            :key="index"
            class="item"
          >
            <div class="text--caption-2 font-medium color-dark-gray">
              Phone {{ index + 1 }}
            </div>
            <div class="flex justify-between">
              <div class="text--body font-medium">{{ value }}</div>
              <i v-if="index !== 0" class="icon-trash_full icon" />
            </div>
          </li>
          <li
            v-for="(value, index) in [email, ...additionalEmails]"
            :key="index"
            class="item"
          >
            <div class="text--caption-2 font-medium color-dark-gray">
              Email {{ index + 1 }}
            </div>
            <div class="justify-between">
              <div class="text--body font-medium">{{ value }}</div>
              <i v-if="index !== 0" class="icon-trash_full icon" />
            </div>
          </li>
        </ul>
        <!--          <m-base-button-->
        <!--            class="data-adder"-->
        <!--            view="flat"-->
        <!--            icon-left="icon-plus"-->
        <!--            @click="$router.push({ name: Route.ProfileAddNewContactData })"-->
        <!--          >-->
        <!--            + {{ $t('views.newcontact.additionalphone') }}-->
        <!--          </m-base-button>-->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onBeforeMount } from 'vue';

import { Route } from '@/router/types';
import { TTopNavigation } from '@/components/ui';
import { EKYCStatus } from '@/models/profile/profile';
import { useProfileStore } from '@/stores/profile';
import { useKYCStore } from '@/stores/kyc';
import { STATIC_BASE_URL } from '@/constants';
import { useI18n } from 'vue-i18n';
import { uiKitKey } from '@/types/symbols';

const { tm } = useI18n();
const pStore = useProfileStore();
const kycStore = useKYCStore();

const uiKit = inject(uiKitKey);
const {
  MKycStatusCard,
  // MBaseButton
} = uiKit!;

const KYCStatus = computed(() => kycStore.getClaimData?.status || 10);
const phone = computed(() => pStore.getUser.phone);
const email = computed(() => pStore.getUser.email);

const additionalPhones = computed(() => {
  return pStore?.getUser?.additionalPhones || [];
});

const additionalEmails = computed(() => {
  return pStore?.getUser?.additionalEmails || [];
});

interface IKycStatusCard {
  title: string;
  description: string;
  isCtaRequired?: string;
  imgSrc: string;
  stateIcon: string;
}

const cardInfo: IKycStatusCard = computed(() => {
  switch (KYCStatus.value) {
    case EKYCStatus.not_started: {
      const title = tm(
        'views.profile.profilePhonesAndEmails.yourIdentityIsNotVerified'
      );
      const description = tm(
        'views.profile.profilePhonesAndEmails.friendsCanSendYouMoney'
      );
      const isCtaRequired = true;
      const imgSrc = `${STATIC_BASE_URL}/static/todo/empty-profile.svg`;
      const stateIcon = 'icon-attention_error';

      return { title, description, isCtaRequired, imgSrc, stateIcon };
    }
    case EKYCStatus.pending: {
      const title = tm(
        'views.profile.profilePhonesAndEmails.verificationInProgress'
      );
      const description = tm(
        'views.profile.profilePhonesAndEmails.weWillEmailAndSmsToYouVerification'
      );
      const imgSrc = `${STATIC_BASE_URL}/static/todo/empty-profile.svg`;
      const stateIcon = 'icon-attention_error';

      return { title, description, imgSrc, stateIcon };
    }
    case EKYCStatus.rejected: {
      const title = tm(
        'views.profile.profilePhonesAndEmails.yourIdentityIsNotVerified'
      );
      const description = tm(
        'views.profile.profilePhonesAndEmails.friendsCanSendYouMoney'
      );
      const isCtaRequired = true;
      const imgSrc = `${STATIC_BASE_URL}/static/todo/empty-profile.svg`;
      const stateIcon = 'icon-attention_error';

      return { title, description, isCtaRequired, imgSrc, stateIcon };
    }
    default: {
      return '';
    }
  }
});

onBeforeMount(async () => {
  await Promise.all([kycStore.claim(), pStore.init()]);
});
</script>

<style lang="scss" scoped>
.page-wrapper {
  > .content-wrapper {
    > .profile-info {
      > .data-container {
        > .row {
          border-bottom: 1px solid rgb(175 179 195 / 30%);
          padding: 16px 0;
          display: flex;
          justify-content: space-between;

          > .wrapper {
            display: flex;

            > .icon {
              color: $color-green-400;
              font-size: 20px;
            }
          }

          > .icon {
            color: $color-primary;
            font-size: 24px;
          }
        }
      }
    }

    > .body-container {
      padding: 24px 16px 0;

      > .data-list {
        > .item {
          border-bottom: 1px solid rgb(175 179 195 / 30%);
          padding: 16px 0;

          > .value {
            > .icon {
              color: $color-grey-500;
              font-size: 20px;
            }
          }
        }
      }

      > .data-adder {
        margin: 30px 0;
      }
    }
  }
}

.add {
  font-size: 32px;
  color: $color-primary;
}
</style>
