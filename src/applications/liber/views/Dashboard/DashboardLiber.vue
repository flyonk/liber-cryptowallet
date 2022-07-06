<template>
  <div class="dashboard-container">
    <MDashboardCoinInfo
      :accounts="accounts"
      :verification-status="10"
      :total-balance="totalBalance"
      :show-welcome-message="showWelcomeMessage"
      :selected-account="currentAccount"
      @coin-select="onSelectAccount"
      @click-account="$router.push({ name: Route.AccountMain })"
    >
      <template #controllers>
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
      </template>
    </MDashboardCoinInfo>
    <template v-if="TRANSACTIONS_ENABLED">
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
        <i class="icon-clock mr-2" />
        <p class="text-dark-gray">
          {{ $t('views.dashboard.home.noTransactions') }}
        </p>
      </div>
    </template>

    <div class="carousel-header">
      <span class="title">{{ $t('views.dashboard.home.todo') }}</span>
    </div>

    <div class="carousel">
      <stories-swiper />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ComputedRef, onBeforeMount, Ref, ref } from 'vue';

import { useAccountStore } from '@/applications/liber/stores/account';
import { useProfileStore } from '@/stores/profile';
import { useErrorsStore } from '@/stores/errors';
import { useUIStore } from '@/stores/ui';
import transactionService from '@/applications/liber/services/transactionService';
import { INetTransaction } from '@/models/transaction/transaction';
import { EKYCStatus } from '@/models/profile/profile';
import { STATIC_BASE_URL, TRANSACTIONS_ENABLED } from '@/constants';
import { IAccount } from '@/models/account/account';
import { Route } from '@/router/types';

import { MDashboardCoinInfo, TransactionsList } from '@/components/ui';
import StoriesSwiper from '@/components/ui/organisms/dashboard/OStoriesSwiper.vue';

const VerificationStatus = ref(EKYCStatus.success);

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
  baseBalanceConversion: '',
  baseBalanceConversionCode: '',
});

//TODO: Put to store
let transactions: Ref<INetTransaction[]> = ref([]);
let preview = ref(3);

/**
 * Lifecycle
 */
onBeforeMount(async () => {
  uiStore.setLoadingState('dashboard', true);

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
    uiStore.setLoadingState('dashboard', false);
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
      baseBalanceConversion: '',
      baseBalanceConversionCode: '',
    };

    return;
  }

  const {
    code,
    balance,
    imageUrl: imgSrc,
    baseBalanceConversion,
    baseBalanceConversionCode,
  } = accounts.value.find(({ code }) => coinCode === code) as IAccount;

  currentAccount.value = {
    code: code.toUpperCase(),
    imgSrc,
    balance,
    baseBalanceConversion,
    baseBalanceConversionCode,
  };
};

const onSelectAccount = (coinCode: string) => {
  setCurrentAccount(coinCode);
};

const hasTransactions = computed(() => transactions.value.length > 0);

const showWelcomeMessage = computed(() => {
  return !hasTransactions.value && totalBalance.value.sum == '0.00';
});
</script>

<style scoped lang="scss">
.controls {
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
