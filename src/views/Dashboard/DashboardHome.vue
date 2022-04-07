<template name="DashboardHome">
  <div :style="stylePaddings">
    <DashboardSkeleton v-if="loading" />
    <div v-else class="dashboard-container">
      <div class="header flex mb-4">
        <div class="left">
          <img
            src="@/assets/images/avatar.png"
            @click="$router.push('/profile')"
          />
          <div
            v-if="VerificationStatus === EKYCStatus.pending"
            class="verification"
          >
            {{ $t('views.dashboard.home.idVerification') }}
          </div>
          <div
            v-if="VerificationStatus === EKYCStatus.success"
            class="verification -verified"
          >
            {{ $t('views.dashboard.home.idVerified') }}
          </div>
          <div
            v-if="VerificationStatus === EKYCStatus.rejected"
            class="verification verification--failed"
          >
            {{ $t('views.dashboard.home.iDVerificationFailed') }}
          </div>
        </div>
        <div class="right">
          <img alt class="notification ml-auto" src="@/assets/icon/bell.svg" />
          <img
            alt
            class="refresh ml-auto"
            src="@/assets/icon/refresh.svg"
            @click="updateDashboardData"
          />
        </div>
      </div>
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
        <h1 class="title">{{ totalCurrency }} {{ totalBalance.sum }}</h1>
        <div class="circle-wrap" @click="isMenuOpen = !isMenuOpen">
          <img
            :class="{ '-reverted': isMenuOpen }"
            class="down"
            src="@/assets/icon/arrow-down.svg"
          />
        </div>
        <img
          alt="eurounion"
          class="ml-auto"
          src="@/assets/icon/currencies/euro.svg"
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
          :class="{ '-active': VerificationStatus === EKYCStatus.success }"
          :disabled="VerificationStatus !== EKYCStatus.success"
          class="btn"
          @click="$router.push('/deposit')"
        >
          {{ $t('views.dashboard.home.deposit') }}
        </button>
        <button
          :class="{ '-active': VerificationStatus === EKYCStatus.success }"
          :disabled="VerificationStatus !== EKYCStatus.success"
          class="btn"
        >
          {{ $t('views.dashboard.home.send') }}
        </button>
        <button
          :class="{ '-active': VerificationStatus === EKYCStatus.success }"
          :disabled="VerificationStatus !== EKYCStatus.success"
          class="btn"
        >
          ...
        </button>
      </div>
      <div class="transactions-header">
        <span class="title">{{ $t('views.dashboard.home.transactions') }}</span>
        <span
          :class="{ '-active': hasTransactions }"
          class="button"
          @click="$router.push({ name: Route.TransactionsAll })"
          >{{ $t('views.dashboard.home.seeAll') }}</span
        >
      </div>
      <div v-if="hasTransactions">
        <transactions-list :preview="preview" :transactions="transactions" />
      </div>
      <div v-else class="no-transactions">
        <img class="mr-2" src="@/assets/icon/clock.svg" />
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
        <VueAgile :nav-buttons="false" :slides-to-show="2">
          <div
            v-for="(item, index) in carousel"
            :key="index"
            class="carousel-item slide"
            @click="$router.push({ name: item.route })"
          >
            <img :src="item.imgSrc" />
            <h4
              :class="{
                'text-green': item.text === 'green',
                'text-black': item.text === 'black',
              }"
            >
              {{ item.status }}
            </h4>
            <p>{{ item.description }}</p>
          </div>
        </VueAgile>
      </div>
      <!--      <bottom-swipe-menu :is-menu-open="isMenuOpen" @close-menu="closeMenu" />-->
      <AccountListBottomSheet
        v-if="isMenuOpen"
        :accounts="accounts"
        @close="closeMenu"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  ComputedRef,
  getCurrentInstance,
  onMounted,
  Ref,
  ref,
} from 'vue';
import { VueAgile } from 'vue-agile';
import { useI18n } from 'vue-i18n';

import useSafeAreaPaddings from '@/helpers/safeArea';
import { useAccountStore } from '@/stores/account';
import { useProfileStore } from '@/stores/profile';
import transactionService from '@/services/transactionService';
import { INetTransaction } from '@/models/transaction/transaction';
import { EKYCStatus } from '@/models/profile/profile';

import { AccountListBottomSheet } from '@/components/ui';
import DashboardSkeleton from '@/components/ui/organisms/DashboardSkeleton.vue';
import TransactionsList from '@/components/ui/organisms/transactions/TransactionsList.vue';
import { IAccount } from '@/models/account/account';
import { Route } from '@/router/types';

let activeTab = ref(1);
const VerificationStatus = ref(EKYCStatus.success);

const { stylePaddings } = useSafeAreaPaddings();

const isMenuOpen = ref(false);
const loading = ref(false);

const accountStore = useAccountStore();
const profileStore = useProfileStore();

const accounts = computed(() => accountStore.getAccounts) as ComputedRef<
  IAccount[]
>;
const totalBalance = computed(() => accountStore.getTotalBalance);
const isDashboardSkeletonReady = computed(() => {
  return (
    !!accountStore.accountList[0]?.baseBalanceConversion &&
    !!accountStore.totalBalance?.sum
  );
});

const { tm } = useI18n();

//TODO: Put to store
let transactions: Ref<INetTransaction[]> = ref([]);
let preview = ref(3);

const { proxy } = getCurrentInstance();

/**
 * Lifecycle
 */
onMounted(async () => {
  await profileStore.init();
  const { kycStatus } = profileStore.getUser;

  VerificationStatus.value = kycStatus;

  if (!isDashboardSkeletonReady.value) {
    loading.value = true;
  }

  try {
    const [, , _transactions] = await Promise.all([
      accountStore.getAccountList(),
      accountStore.getAccountBalance(),
      transactionService.getTransactionList(),
    ]);
    transactions.value = _transactions;
    console.debug(transactions.value);
  } catch (error) {
    console.error(error);
    proxy.$sentry.capture(error, 'DashboardHome', 'onMounted');
  } finally {
    loading.value = false;
  }
});

function closeMenu() {
  isMenuOpen.value = false;
}

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
  } catch (error) {
    console.error(error);
    proxy.$sentry.capture(error, 'DashboardHome', 'updateDashboardData');
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

const carousel = [
  {
    status: tm('views.dashboard.home.carousel.inProgress'),
    description: tm('views.dashboard.home.carousel.verifying'),
    imgSrc: require('@/assets/icon/todo/empty-profile.svg'),
    text: 'blue',
    route: Route.DashboardVerifyingStory,
  },
  {
    status: tm('views.dashboard.home.carousel.required'),
    description: tm('views.dashboard.home.carousel.verify'),
    imgSrc: require('@/assets/icon/todo/mail.svg'),
    text: 'blue',
    route: Route.DashboardStory,
  },
  {
    status: tm('views.dashboard.home.carousel.recommend'),
    description: tm('views.dashboard.home.carousel.getYourCryptoProperty'),
    imgSrc: require('@/assets/icon/todo/wallet.svg'),
    text: 'green',
    route: Route.DashboardHome,
  },
  {
    status: '_',
    description: tm('views.dashboard.home.carousel.reach'),
    imgSrc: require('@/assets/icon/todo/mail.svg'),
    text: 'black',
    route: Route.DashboardTransferFundsToTreasuryStory,
  },
];

const hasTransactions = computed(() => transactions.value.length > 0);

const totalCurrency = computed(() =>
  totalBalance.value.currency === 'EUR' ? '€' : `${totalBalance.value.currency}`
);

const showWelcomeMessage = computed(() => {
  return !hasTransactions.value && totalBalance.value.sum == '0.00';
});
</script>

<style lang="scss" scoped>
.dashboard-container {
  padding: 0 15px;
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

      > .verification {
        margin-left: 8px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 131px;
        height: 31px;
        background: $color-yellow-100;
        border-radius: 100px;
        white-space: nowrap;
        font-size: 16px;
        line-height: 21px;
        letter-spacing: -0.0031em;
        color: $color-yellow-800;

        &.-verified {
          background: $color-green-100;
          color: $color-green-800;
        }

        &.-failed {
          width: 181px;
          background: $color-red-100;
          color: $color-red-700;
        }
      }
    }

    > .right {
      > .notification {
        opacity: 0.5;
        margin-right: 35px;
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
      width: 36px;

      > .down {
        width: 10px;

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
      background: $color-grey;
      border-radius: 8px;
      padding: 0 16px 0 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 109px;
      height: 40px;
      margin-right: 8px;
      color: $color-white;

      &.-active {
        background: $color-primary;
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
    // max-height: 360px;
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
</style>
