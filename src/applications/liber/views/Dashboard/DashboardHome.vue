<template name="DashboardHome">
  <div class="page-wrapper" :style="stylePaddings">
    <DashboardSkeleton v-if="loading" />
    <t-top-navigation v-else nav-with-custom-top-left nav-without-title>
      <template #top-left>
        <div class="header">
          <div class="left">
            <img
              alt
              src="@/assets/images/avatar.png"
              @click="$router.push('/profile')"
            />
            <kyc-status-badge
              class="status"
              :status-number="VerificationStatus"
            />
          </div>
        </div>
      </template>
      <template #top-right>
        <div class="header">
          <div class="right">
            <i class="icon-bell notification ml-auto" />
            <img
              alt
              class="refresh ml-auto"
              src="@/assets/icon/refresh.svg"
              @click="updateDashboardData"
            />
          </div>
        </div>
      </template>
      <template #title></template>
      <template #content
        ><div :style="stylePaddings">
          <!-- <DashboardSkeleton v-if="loading" /> -->
          <div class="dashboard-container">
            <ul class="tabs flex">
              <li
                v-for="tab in tabs"
                :key="tab.id"
                :class="{ active: activeTab === tab.id }"
                class="tab-item"
                @click="activeTab = tab.id"
              >
                {{ tab.name }}
              </li>
            </ul>
            <div class="currencies flex items-center">
              <!--TODO: map currencies-->
              <h1 class="title">
                {{ currentAccount.code }} {{ currentAccount.balance }}
              </h1>
              <div class="circle-wrap" @click="isMenuOpen = !isMenuOpen">
                <i
                  class="down icon-ic16-arrow-down"
                  :class="{ '-reverted': isMenuOpen }"
                />
              </div>
              <img
                alt="currency"
                class="ml-auto"
                :src="currentAccount.imgSrc"
                @click="$router.push({ name: Route.AccountMain })"
              />
            </div>
            <h3 class="heading-gray-md mb-4">
              {{ $t('views.dashboard.home.allAccounts') }}
            </h3>
            <div v-show="showWelcomeMessage" class="main">
              <h1 class="title">
                {{ $t('views.dashboard.home.getYourCryptoAsset') }}
              </h1>
              <h4 class="description">
                {{ $t('views.dashboard.home.noAssets') }}
                <br />
                {{ $t('views.dashboard.home.depositFirstCoins') }}
              </h4>
            </div>

            <div class="controls">
              <button
                :class="{
                  '-active': VerificationStatus === EKYCStatus.success,
                }"
                :disabled="VerificationStatus !== EKYCStatus.success"
                class="btn"
                @click="$router.push('/deposit')"
              >
                <i
                  class="icon-btn icon-plus_circle"
                  :class="{
                    '-active': VerificationStatus === EKYCStatus.success,
                  }"
                />
                {{ $t('views.dashboard.home.deposit') }}
              </button>
              <button
                :class="{
                  '-active': VerificationStatus === EKYCStatus.success,
                }"
                :disabled="VerificationStatus !== EKYCStatus.success"
                class="btn"
                @click="$router.push({ name: Route.PayRecepientsLiber })"
              >
                <i
                  class="icon-btn icon-send"
                  :class="{
                    '-active': VerificationStatus === EKYCStatus.success,
                  }"
                />
                {{ $t('views.dashboard.home.send') }}
              </button>
              <button
                :class="{
                  '-active': VerificationStatus === EKYCStatus.success,
                }"
                :disabled="VerificationStatus !== EKYCStatus.success"
                class="btn"
                @click="openActionsSwiper"
              >
                ...
              </button>
            </div>
            <div class="transactions-header">
              <span class="title">{{
                $t('views.dashboard.home.transactions')
              }}</span>
              <span
                :class="{ '-active': hasTransactions }"
                class="button"
                @click="$router.push({ name: Route.TransactionsAll })"
                >{{ $t('views.dashboard.home.seeAll') }}</span
              >
            </div>
            <div v-if="hasTransactions">
              <transactions-list
                :preview="preview"
                :transactions="transactions"
              />
            </div>
            <div v-else class="no-transactions">
              <i class="icon-clock mr-2" />
              <p class="text-dark-gray">
                {{ $t('views.dashboard.home.noTransactions') }}
              </p>
            </div>
            <div class="carousel-header">
              <span class="title">{{ $t('views.dashboard.home.todo') }}</span>
              <!-- TODO: Uncomment seeAll when the card screen is ready -->
              <!-- <span class="button" :class="{ '-active': hasTransactions }">{{
          $t('views.dashboard.home.seeAll')
        }}</span> -->
            </div>
            <div class="carousel">
              <stories-swiper />
            </div>
            <!--      <bottom-swipe-menu :is-menu-open="isMenuOpen" @close-menu="closeMenu" />-->
            <AccountListBottomSheet
              v-if="isMenuOpen"
              :accounts="accounts"
              @close="closeMenu"
              @select="onSelectAccount"
            />
          </div></div
      ></template>
    </t-top-navigation>
  </div>
</template>

<script lang="ts" setup>
import { computed, ComputedRef, onMounted, Ref, ref } from 'vue';

import { useI18n } from 'vue-i18n';

import useSafeAreaPaddings from '@/helpers/safeArea';
import { useAccountStore } from '@/applications/liber/stores/account';
import { useProfileStore } from '@/stores/profile';
import { useErrorsStore } from '@/stores/errors';
import { useUIStore } from '@/stores/ui';
import transactionService from '@/applications/liber/services/transactionService';
import { INetTransaction } from '@/applications/liber/models/transaction/transaction';
import { EKYCStatus } from '@/models/profile/profile';
import { STATIC_BASE_URL } from '@/constants';

import {
  AccountListBottomSheet,
  KycStatusBadge,
  TransactionsList,
  TTopNavigation,
} from '@/components/ui';

import DashboardSkeleton from '@/components/ui/organisms/DashboardSkeleton.vue';

import { IAccount } from '@/models/account/account';
import { Route } from '@/router/types';
import StoriesSwiper from '@/components/ui/organisms/dashboard/OStoriesSwiper.vue';

let activeTab = ref(1);
const VerificationStatus = ref(EKYCStatus.success);

const { stylePaddings } = useSafeAreaPaddings();

const isMenuOpen = ref(false);
const loading = ref(false);

const accountStore = useAccountStore();
const profileStore = useProfileStore();
const errorsStore = useErrorsStore();
const uiStore = useUIStore();

const accounts = computed(() => accountStore.getAccounts) as ComputedRef<
  IAccount[]
>;
const totalBalance = computed(() => accountStore.getTotalBalance);

const allAccountInfo = ref({
  code: '€',
  imgSrc: `${STATIC_BASE_URL}/static/currencies/euro.svg`,
});

const currentAccount = ref({
  code: '',
  balance: '',
  imgSrc: '',
});

const { tm } = useI18n();

//TODO: Put to store
let transactions: Ref<INetTransaction[]> = ref([]);
let preview = ref(3);

/**
 * Lifecycle
 */
onMounted(async () => {
  loading.value = true;

  await profileStore.init();

  try {
    const [, , _transactions] = await Promise.all([
      accountStore.getAccountBalance(),
      accountStore.getAccountList(),
      transactionService.getTransactionList(),
    ]);
    transactions.value = _transactions;

    setCurrentAccount('all');
  } catch (err) {
    errorsStore.handle({
      err,
      name: 'DashboardHome',
      ctx: 'onMounted',
      description: 'Error receiving dashboard data',
    });
  } finally {
    loading.value = false;
  }
});

const openActionsSwiper = () => {
  uiStore.setStateModal('sendMenu', true);
};

const setCurrentAccount = (coinCode: string) => {
  if (coinCode === 'all') {
    currentAccount.value = {
      balance: totalBalance.value.sum,
      code: allAccountInfo.value.code,
      imgSrc: allAccountInfo.value.imgSrc,
    };

    return;
  }

  const {
    code,
    balance,
    imageUrl: imgSrc,
  } = accounts.value.find(({ code }) => coinCode === code) as IAccount;

  currentAccount.value = {
    code: code.toUpperCase(),
    imgSrc,
    balance,
  };
};

function closeMenu() {
  isMenuOpen.value = false;
}

const onSelectAccount = (coinCode: string) => {
  setCurrentAccount(coinCode);

  isMenuOpen.value = false;
};

// Temporary update method
const updateDashboardData = async () => {
  loading.value = true;
  try {
    const [, , _transactions] = await Promise.all([
      accountStore.getAccountList(),
      accountStore.getAccountBalance(),
      transactionService.getTransactionList(),
    ]);
    transactions.value = _transactions;
  } catch (err) {
    errorsStore.handle({
      err,
      name: 'DashboardHome.vue',
      ctx: 'updateDashboardData',
      description: 'Error receiving dashboard data',
    });
  } finally {
    loading.value = false;
  }
};

const tabs = [
  {
    id: 1,
    name: tm('views.dashboard.home.tabs.dashboard'),
  },
  {
    id: 2,
    name: tm('views.dashboard.home.tabs.treasury'),
  },
  {
    id: 3,
    name: tm('views.dashboard.home.tabs.loans'),
  },
];

const hasTransactions = computed(() => transactions.value.length > 0);

const showWelcomeMessage = computed(() => {
  return !hasTransactions.value && totalBalance.value.sum == '0.00';
});
</script>

<style lang="scss" scoped>
.page-wrapper {
  background-color: $color-light-grey-100;
}

.dashboard-container {
  background: $color-light-grey-100;
  overflow: auto;
  flex-grow: 1;

  > .header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    > .left {
      display: flex;
      align-items: center;
    }

    > .right {
      > .notification {
        margin-right: 35px;
        font-size: 24px;
      }
    }
  }

  > .tabs {
    margin-bottom: 24px;

    > .tab-item {
      color: $color-brand-primary;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 101px;
      height: 40px;
    }

    > .active {
      background: $color-brand-secondary;
      color: $color-white;
    }
  }

  > .currencies {
    display: flex;
    align-items: center;

    > .title {
      margin-right: 8px;
      font-family: Inter, sans-serif;
      font-style: normal;
      font-weight: 600;
      font-size: 28px;
      line-height: 34px;
      letter-spacing: 0.0038em;
      color: $color-black;
    }

    > .circle-wrap {
      border-radius: 50%;
      background: $color-light-grey;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 36px;
      min-height: 36px;
      width: 36px;
      min-width: 36px;

      > .down {
        &.-reverted {
          transform: rotate(180deg);
        }
      }
    }
  }

  > .main {
    margin-bottom: 24px;

    > .title {
      font-weight: 600;
      font-size: 16px;
      line-height: 21px;
      letter-spacing: -0.0031em;
      margin-bottom: 8px;
    }

    > .description {
      font-weight: normal;
      font-size: 13px;
      line-height: 18px;
      letter-spacing: -0.0008em;
    }
  }

  > .controls {
    display: flex;
    margin-bottom: 32px;

    > .btn {
      background: $color-brand-2-50;
      color: $color-light-grey-850;
      box-shadow: 0 2px 4px -3px rgb(64 70 105 / 21%);
      border-radius: 8px;
      padding: 0 16px 0 12px;
      font-weight: 600;
      font-size: 13px;
      line-height: 18px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 109px;
      height: 40px;
      margin-right: 8px;

      &.-active {
        background: $color-white;
      }

      &:last-child {
        width: 40px;
        height: 40px;
        margin: 0;
      }
    }
  }

  > .transactions-header {
    display: flex;
    justify-content: space-between;
    font-weight: 600;
    font-size: 13px;
    line-height: 18px;
    letter-spacing: -0.0008em;
    margin-bottom: 16px;

    > .title {
      color: $color-dark-grey;
    }

    > .button {
      color: $color-brand-2-200;

      &.-active {
        color: $color-primary;
      }
    }
  }

  > .carousel-header {
    display: flex;
    justify-content: space-between;
    font-weight: 600;
    font-size: 13px;
    line-height: 18px;
    letter-spacing: -0.0008em;
    margin-bottom: 16px;

    > .title {
      color: $color-dark-grey;
    }

    > .button {
      color: $color-brand-2-200;
    }
  }

  > .transactions-container {
    overflow-y: auto;
    padding-right: 10px;
    width: 100%;

    > .header {
      > .button {
        font-weight: 550;
        font-size: 13px;
        line-height: 18px;
        letter-spacing: -0.0008em;
        color: $color-primary;
      }
    }
  }

  > .no-transactions {
    display: flex;
    align-items: center;
    height: 60px;
  }
}

.carousel {
  margin-bottom: 120px;
}

.carousel-item {
  width: 160px;
  padding: 16px;
  height: 160px;
  border-radius: 16px;
  margin-right: 8px;
  background: $color-light-grey;

  > img {
    margin-bottom: 20px;
  }

  > h4 {
    color: $color-primary;
    font-weight: 800;
    font-size: 10px;
    line-height: 13px;
    margin-bottom: 5px;
  }

  &:nth-child(3) {
    background: $color-green-50;
  }

  &:last-child {
    background: $color-yellow-50;
  }
}

.agile {
  width: 100%;
}

.icon-btn {
  font-size: 20px;
  color: $color-light-grey-850;
  margin-right: 10px;

  &.-active {
    color: #2862ff;
  }
}

.header {
  > .left {
    display: flex;
    align-items: center;

    > .status {
      margin: 0 0 0 8px;
    }
  }

  > .right {
    > .notification {
      margin-right: 35px;
      font-size: 24px;
    }
  }
}

@keyframes topToBottom {
  0% {
    bottom: -100%;
    opacity: 0;
  }

  100% {
    bottom: 0;
    opacity: 1;
  }
}

.swiper {
  z-index: 0; //hides behind the bottom navigation
}
</style>
