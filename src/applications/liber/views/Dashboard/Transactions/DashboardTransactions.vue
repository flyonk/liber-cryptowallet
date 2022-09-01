<template name="DashboardTransactions">
  <div class="page-wrapper">
    <t-top-navigation @click:left-icon="$router.push('/home')">
      <template #title>
        2.12345678
        <span class="currency">USDT</span>
      </template>
      <template #subtitle> €594.41 </template>
      <template #right>
        <img
          alt="currency"
          class="icon"
          width="56"
          height="56"
          :src="`${STATIC_BASE_URL}/static/currencies/tether.svg`"
      /></template>
      <template #content>
        <div class="account-transactions">
          <div class="header">
            <VueAgile
              :nav-buttons="false"
              :slides-to-show="2"
              class="carousel-slider"
            >
              <div
                v-for="(item, index) in carousel"
                :key="index"
                class="item-slide"
                @click="$router.push('/home/story')"
              >
                <img :src="item.img" class="image" />
                <p class="name">{{ item.name }}</p>
              </div>
            </VueAgile>
            <div v-if="showControls" class="controls">
              <button class="btn">
                <img class="label" src="@/assets/icon/plus.svg" />{{
                  $t('transactions.deposit')
                }}
              </button>
              <button class="btn">
                <img
                  class="label"
                  src="@/assets/icon/arrow-right-white.svg"
                />{{ $t('transactions.send') }}
              </button>
              <button class="btn">
                <img class="label" src="@/assets/icon/repeat.svg" />{{
                  $t('transactions.exchange')
                }}
              </button>
            </div>
          </div>
          <div>
            <div class="main-tabs">
              <div
                :class="{ active: activeTab === 1 }"
                class="tab"
                @click="activeTab = 1"
              >
                {{ $t('common.history') }}
              </div>
              <div
                :class="{ active: activeTab === 2 }"
                class="tab"
                @click="activeTab = 2"
              >
                {{ $t('transactions.walletAddress') }}
              </div>
            </div>
            <ul
              v-if="activeTab === 1"
              ref="dashboardTransactions"
              class="dashboard-transactions"
            >
              <li
                v-for="(transaction, index) in transactions"
                :key="index"
                class="item"
                @click="$router.push('/transactions/details')"
              >
                <img :src="transaction.img" class="icon" />
                <div class="info">
                  <div class="flex">
                    <h1 class="text-default">{{ transaction.info }}</h1>
                    <p :class="{ received: transaction.sum.startsWith('+') }">
                      {{ transaction.sum }}
                    </p>
                  </div>
                  <div class="flex">
                    <div class="text--footnote color-dark-gray">
                      {{ transaction.from }}
                    </div>
                    <div
                      v-if="transaction.status"
                      :class="{ pending: transaction.status === 'Pending' }"
                      class="flex"
                    >
                      <i class="icon-clock mr-1" />
                      <p>
                        {{ transaction.status }}
                      </p>
                    </div>
                    <p v-else class="text--footnote color-dark-gray text-right">
                      {{ transaction.sum }}
                    </p>
                  </div>
                </div>
              </li>
            </ul>

            <div v-if="activeTab === 2" class="wallet">
              <img alt="qr-code" class="qr" src="@/assets/images/qr-code.png" />
              <div class="wallet-address">
                <h4 class="text--footnote text-dark-gray mb-1">
                  {{ $t('transactions.walletAddress') }}
                </h4>
                <div class="account">
                  <div class="crypto-number">
                    <p class="text-default">
                      {{ wallet }}
                      <br />
                      <span class="font-bold">Opa139z0l</span>
                    </p>
                  </div>
                  <img alt="folders" src="@/assets/icon/folders.svg" />
                </div>
                <h2 class="bluetitle">
                  {{ $t('transactions.generateAddress') }}
                </h2>
                <div class="controls">
                  <button class="btn">
                    {{ $t('common.saveImage') }}
                  </button>
                  <button class="btn" @click="shareAddress">
                    {{ $t('transactions.shareAddress') }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </t-top-navigation>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { VueAgile } from 'vue-agile';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';

import { check, share } from '@/helpers/nativeShare';

import { TTopNavigation } from '@/components/ui';
import { STATIC_BASE_URL } from '@/constants';

const toast = useToast();

const dashboardTransactions = ref();

onMounted(() => {
  dashboardTransactions.value.style.maxHeight = `${transactions.length * 40}px`;
});

let showControls = ref(false);
const { tm } = useI18n();

const wallet = ref('1Mtree35df4543sdgErtrryryEe13rr');

const activeTab = ref(1);
const transactions = [
  {
    info: `${tm('transactions.operations.crypto.income')} USDT`,
    from: `${tm('common.from')} andrew@gmail.com`,
    sum: '+ 0.0001 BTC',
    status: 'Pending',
    img: `${STATIC_BASE_URL}/static/transactions/received.svg`,
  },
  {
    info: `${tm('transactions.operations.crypto.deposit')} BTC`,
    from: `${tm('common.from')} Bitcoin address`,
    sum: '+ 0.0001 BTC',
    img: `${STATIC_BASE_URL}/static/transactions/sent.svg`,
  },
  {
    info: `${tm('transactions.operations.crypto.send')} USDT`,
    from: `${tm('common.to')} andrew@gmail.com`,
    sum: '- 13.55 USDT',
    img: `${STATIC_BASE_URL}/static/transactions/exchange.svg`,
  },
  {
    info: `${tm('transactions.operations.crypto.income')} USDT`,
    from: `${tm('common.from')} andrew@gmail.com`,
    sum: '+ 13.55 USDT',
    status: tm('transactions.operations.crypto.pending'),
    img: `${STATIC_BASE_URL}/static/transactions/received.svg`,
  },
  {
    info: `${tm('transactions.operations.crypto.deposit')} USDT`,
    from: `${tm('common.from')} Bitcoin address`,
    sum: '+ 125.00 USDT',
    img: `${STATIC_BASE_URL}/static/transactions/sent.svg`,
  },
  {
    info: `${tm('transactions.operations.crypto.send')} USDT`,
    from: `${tm('common.from')} andrew@gmail.com`,
    sum: '- 13.55 USDT',
    img: `${STATIC_BASE_URL}/static/transactions/exchange.svg`,
  },
];

const carousel = [
  {
    name: tm('transactions.carousel.deposit'),
    img: require('@/assets/icon/transactions/carousel/deposit.svg'),
  },
  {
    name: tm('transactions.carousel.sendFunds'),
    img: require('@/assets/icon/transactions/carousel/send.svg'),
  },
  {
    name: tm('transactions.carousel.convert'),
    img: require('@/assets/icon/transactions/carousel/convert.svg'),
  },
  {
    name: tm('transactions.carousel.withdraw'),
    img: require('@/assets/icon/transactions/carousel/send.svg'),
  },
];

const shareAddress = async () => {
  const canShare = await check();

  if (!canShare) {
    return toast.add({
      severity: 'error',
      summary: tm('views.deposit.wallet.deviceIsNotSupportedToShare') as string,
      life: 3000,
      closable: false,
    });
  }

  await share({
    title: 'Share address',
    text: wallet.value,
    dialogTitle: 'Share address',
  });
};
</script>

<style lang="scss" scoped>
.page-wrapper {
  background: $color-light-grey-100;
  height: 100vh;
}

.account-transactions {
  touch-action: none;
  background: $color-light-grey-100;
  height: 95%;
  overflow: hidden;
  flex-grow: 1;

  > .header {
    > .count {
      > .flex {
        > .icon {
          height: 56px;
          width: 56px;
          margin-left: auto;
        }
      }

      > .subtitle {
        margin-bottom: 28px;
      }
    }

    > .controls {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 32px;

      > .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 109px;
        height: 40px;
        background: $color-primary;
        color: $color-white;
        border-radius: 10px;

        > .label {
          margin-right: 9px;
        }
      }
    }
  }
}

.dashboard-transactions {
  overflow-y: auto;
  padding-right: 10px;

  > .item {
    display: flex;
    width: 100%;
    margin-bottom: 24px;

    > .icon {
      margin-right: 12px;
      width: 40px;
      height: 40px;
    }

    > .info {
      width: 100%;

      > .flex {
        width: 100%;
        justify-content: space-between;

        > .pending {
          color: $color-yellow-600;
        }

        > .received {
          color: $color-green-600;
        }
      }
    }
  }
}

.wallet {
  display: flex;
  height: 370px;
  flex-direction: column;
  align-items: center;
  padding-top: 24px;
  overflow-y: auto;

  > .qr {
    margin-bottom: 56px;
  }
}

.main-tabs {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 4px;
  border-radius: 8px;
  background: $color-light-grey;
  margin-bottom: 30px;
  touch-action: none;

  > .tab {
    width: 49%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $color-dark-grey;
    height: 32px;
    background: $color-light-grey;
    font-weight: 600;
    font-size: 13px;
    line-height: 18px;
  }

  > .active {
    background: $color-white;
    color: $color-brand-secondary;
  }
}

.carousel-slider {
  margin-bottom: 24px;
}

.item-slide {
  width: 104px;
  height: 104px;
  padding: 12px;
  background: $color-white;
  box-shadow: 0 2px 24px -12px rgb(0 0 0 / 34%);
  border-radius: 13px;
  margin-left: 5px;

  > .image {
    margin-bottom: 8px;

    &:last-child {
      transform: rotate(-90deg);
    }
  }

  > .name {
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    color: $color-brand-primary;
  }
}

.wallet-address {
  width: 100%;
  background: $color-white;
  box-shadow: 0 0 24px rgb(64 70 105 / 8%);
  padding: 34px 32px 50px;

  > .account {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  > .bluetitle {
    font-weight: 600;
    font-size: 17px;
    line-height: 22px;
    letter-spacing: -0.0043em;
    color: $color-primary;
    text-shadow: 0 1px 2px rgb(0 0 0 / 4%);
    margin-bottom: 43px;
  }

  > .controls {
    display: flex;

    > .btn {
      width: 166px;
      height: 48px;
      background: $color-light-grey;
      border-radius: 13px;
      font-weight: 600;
      font-size: 17px;

      &:first-child {
        margin-right: 12px;
        color: $color-primary;
        text-shadow: 0 1px 2px rgb(0 0 0 / 4%);
      }

      &:last-child {
        background: $color-primary;
        color: $color-white;
      }
    }
  }
}
</style>
