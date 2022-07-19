<template name="ProfileEdit">
  <t-top-navigation
    with-fixed-footer
    left-icon-name="icon-app-navigation-close"
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
    <template #content>
      <div class="content-wrapper">
        <div v-if="KYCStatus !== EKYCStatus.success" class="status-container">
          <m-status-card :kyc-status="KYCStatus" />
        </div>
        <div v-else class="profile-info">
          <h1 class="title">Liber ID</h1>
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
          <h1 class="title">
            {{ $t('views.profile.profilePhonesAndEmails.acceptedContact') }}
          </h1>
          <ul class="data-list">
            <li
              v-for="(value, index) in [phone, ...additionalPhones]"
              :key="index"
              class="item"
            >
              <div class="label">Phone {{ index + 1 }}</div>
              <div class="value">
                <div class="phone">{{ value }}</div>
                <i class="icon-trash_full icon" />
              </div>
            </li>
            <li
              v-for="(value, index) in [email, ...additionalEmails]"
              :key="index"
              class="item"
            >
              <div class="label">Email {{ index + 1 }}</div>
              <div class="value">
                <div class="email">{{ value }}</div>
                <i class="icon-trash_full icon" />
              </div>
            </li>
          </ul>
          <base-button
            class="data-adder"
            view="flat"
            icon-left="icon-plus"
            @click="$router.push({ name: Route.ProfileAddNewContactData })"
          >
            + {{ $t('views.newcontact.additionalphone') }}
          </base-button>
        </div>
      </div>
    </template>
  </t-top-navigation>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from 'vue';

import { Route } from '@/router/types';
import { EKYCStatus } from '@/models/profile/profile';
import { useProfileStore } from '@/stores/profile';
import { useKYCStore } from '@/stores/kyc';

import { BaseButton, MStatusCard, TTopNavigation } from '@/components/ui';

const pStore = useProfileStore();
const kycStore = useKYCStore();

const KYCStatus = computed(() => kycStore.getClaimData?.status || 10);
const phone = computed(() => pStore.getUser.phone);
const email = computed(() => pStore.getUser.email);

const additionalPhones = computed(() => {
  return pStore?.getUser?.additionalPhones || [];
});

const additionalEmails = computed(() => {
  return pStore?.getUser?.additionalEmails || [];
});

onBeforeMount(async () => {
  await Promise.all([kycStore.claim(), pStore.init()]);
});
</script>

<style lang="scss" scoped>
.content-wrapper {
  > .profile-info {
    > .title {
      font-weight: 600;
      font-size: 20px;
      line-height: 25px;
      letter-spacing: -0.0045em;
      color: $color-brand-primary;
    }

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

          > .id {
            margin-left: 5px;
            font-weight: 500;
            font-size: 17px;
            line-height: 22px;
            display: flex;
            align-items: center;
            letter-spacing: -0.0043em;
            color: $color-brand-primary;
          }
        }

        > .icon {
          color: $color-primary;
          font-size: 24px;
        }
      }
    }
  }

  > .status-container {
    position: relative;
    width: calc(100% + 40px);
    left: -20px;
    background: $color-light-grey-300;

    > .header {
      display: flex;
      justify-content: space-between;
      justify-items: start;

      > .icon {
        color: $color-primary;
        font-size: 20px;
      }
    }

    > .body {
      margin-top: 16px;

      > .title {
        font-weight: 700;
        font-size: 17px;
        line-height: 22px;
        letter-spacing: -0.0043em;
        color: $color-brand-primary;
      }

      > .description {
        margin-top: 8px;
        font-weight: 400;
        font-size: 17px;
        line-height: 22px;
        letter-spacing: -0.0043em;
        color: $color-brand-primary;
      }

      > .cta {
        margin-top: 16px;
        width: 100%;
      }
    }
  }

  > .body-container {
    margin-top: 24px;

    > .title {
      font-weight: 600;
      font-size: 20px;
      line-height: 25px;
      letter-spacing: -0.0045em;
      color: $color-brand-primary;
    }

    > .data-list {
      > .item {
        border-bottom: 1px solid rgb(175 179 195 / 30%);
        padding: 16px 0;

        > .label {
          font-weight: 500;
          font-size: 11px;
          line-height: 13px;
          letter-spacing: 0.0006em;
          color: $color-dark-grey;
        }

        > .value {
          display: flex;
          justify-content: space-between;

          > .phone {
            font-weight: 500;
            font-size: 17px;
            line-height: 22px;
            letter-spacing: -0.0043em;
          }

          > .email {
            font-weight: 500;
            font-size: 17px;
            line-height: 22px;
            letter-spacing: -0.0043em;
          }

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

.add {
  font-size: 32px;
  color: $color-primary;
}
</style>
