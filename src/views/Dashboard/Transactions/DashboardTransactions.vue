<template name="DashboardTransactions">
  <div class="account-transactions">
    <div class="header">
      <img
        alt="arrow-left"
        class="back"
        src="@/assets/icon/arrow-left.svg"
        @click="$router.push('/home')"
      />
      <div class="count">
        <div class="flex">
          <h1 class="title title-currency">
            2.12345678
            <span class="currency">USDT</span>
          </h1>
          <img
            alt="currency"
            class="icon"
            src="@/assets/icon/currencies/tether.svg"
          />
        </div>
        <p class="subtitle heading-gray-md">€594.41</p>
      </div>
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
          <img class="label" src="@/assets/icon/arrow-right-white.svg" />{{
            $t('transactions.send')
          }}
        </button>
        <button class="btn">
          <img class="label" src="@/assets/icon/repeat.svg" />{{
            $t('transactions.exchange')
          }}
        </button>
      </div>

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
      <ul v-if="activeTab === 1" class="transactions">
        <li
          v-for="(transaction, index) in transactions"
          :key="index"
          class="item"
          @click="$router.push('/transactions/details')"
        >
          <img :src="transaction.img" class="icon" />
          <div class="info">
            <div class="flex">
              <h1 class="title">{{ transaction.info }}</h1>
              <p :class="{ received: transaction.sum.startsWith('+') }">
                {{ transaction.sum }}
              </p>
            </div>
            <div class="flex">
              <div class="subtitle">{{ transaction.from }}</div>
              <p
                v-if="transaction.status"
                :class="{ pending: transaction.status === 'Pending' }"
              >
                {{ transaction.status }}
              </p>
              <p v-else class="sum">{{ transaction.sum }}</p>
            </div>
          </div>
        </li>
      </ul>

      <div v-if="activeTab === 2" class="wallet">
        <img alt="qr-code" class="qr" src="@/assets/images/qr-code.png" />
        <div class="wallet-address">
          <h4 class="title">
            {{ $t('transactions.walletAddress') }}
          </h4>
          <div class="account">
            <div class="crypto-number">
              <p class="text">
                {{ wallet }}
                <br />sd21213
                <span class="bold">Opa139z0l</span>
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

<script lang="ts" setup>
import { ref } from 'vue';
import { VueAgile } from 'vue-agile';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';

import { check, share } from '@/helpers/nativeShare';

const toast = useToast();

let showControls = ref(false);
const { tm } = useI18n();

const wallet = ref('1Mtree35df4543sdgErtrryryEe13rr');

const activeTab = ref(1);
const transactions = [
  {
    info: `${tm('transactions.operations.received')} USDT`,
    from: `${tm('common.from')} andrew@gmail.com`,
    sum: '+ 0.0001 BTC',
    status: 'Pending',
    img: require('@/assets/icon/transactions/received.svg'),
  },
  {
    info: `${tm('transactions.operations.deposit')} BTC`,
    from: `${tm('common.from')} Bitcoin address`,
    sum: '+ 0.0001 BTC',
    img: require('@/assets/icon/transactions/sent.svg'),
  },
  {
    info: `${tm('transactions.operations.sent')} USDT`,
    from: `${tm('common.to')} andrew@gmail.com`,
    sum: '- 13.55 USDT',
    img: require('@/assets/icon/transactions/exchange.svg'),
  },
  {
    info: `${tm('transactions.operations.received')} USDT`,
    from: `${tm('common.from')} andrew@gmail.com`,
    sum: '+ 13.55 USDT',
    status: tm('transactions.operations.pending'),
    img: require('@/assets/icon/transactions/received.svg'),
  },
  {
    info: `${tm('transactions.operations.deposit')} USDT`,
    from: `${tm('common.from')} Bitcoin address`,
    sum: '+ 125.00 USDT',
    img: require('@/assets/icon/transactions/sent.svg'),
  },
  {
    info: `${tm('transactions.operations.sent')} USDT`,
    from: `${tm('common.from')} andrew@gmail.com`,
    sum: '- 13.55 USDT',
    img: require('@/assets/icon/transactions/exchange.svg'),
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
.account-transactions {
  background: $color-light-grey-100;
  height: 85%;
  padding: 35px 0 0;
  overflow-x: hidden;
  overflow-y: auto;
  flex-grow: 1;

  > .header {
    padding: 0 16px;

    > .count {
      > .flex {
        > .icon {
          height: 56px;
          width: 56px;
          margin-left: auto;
        }

        > .title {
          font-weight: 600;
          font-size: 28px;
          line-height: 34px;
          letter-spacing: 0.0038em;
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

    > .transactions {
      max-height: 360px;
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

            > .title {
              font-weight: 500;
              font-size: 16px;
              line-height: 21px;
              letter-spacing: -0.0031em;
            }

            > .subtitle {
              font-size: 13px;
              line-height: 18px;
              letter-spacing: -0.0008em;
              color: $color-dark-grey;
            }

            > .pending {
              color: $color-yellow-600;
            }

            > .received {
              color: $color-green-600;
            }

            > .sum {
              font-size: 13px;
              line-height: 18px;
              text-align: right;
              letter-spacing: -0.0008em;
              color: $color-dark-grey;
            }
          }
        }
      }
    }
  }

  > .wallet {
    display: flex;
    height: 370px;
    flex-direction: column;
    align-items: center;
    padding-top: 24px;

    > .qr {
      margin-bottom: 56px;
    }
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

.title-currency {
  & > .currency {
    font-weight: 600;
    font-size: 22px;
    line-height: 34px;
    letter-spacing: -0.0026em;
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

.crypto-number {
  > .text {
    font-size: 16px;
    line-height: 21px;
    letter-spacing: -0.0031em;
    color: $color-black;

    > .bold {
      font-weight: bold;
    }
  }
}

.wallet-address {
  width: 100%;
  background: $color-white;
  box-shadow: 0 0 24px rgb(64 70 105 / 8%);
  padding: 34px 32px 50px;

  > .title {
    font-size: 13px;
    line-height: 18px;
    letter-spacing: -0.0008em;
    color: $color-dark-grey;
    margin-bottom: 4px;
  }

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
