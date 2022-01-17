<template name="DashboardTransactions">
  <div class="account-transactions">
    <img
      class="back"
      src="@/assets/icon/arrow-left.svg"
      alt="arrow-left"
      @click="$router.push('/home')"
    >
    <div class="count">
      <div class="flex">
        <h1 class="title">
          2.12345678 <span>USDT</span>
        </h1>
        <img
          class="icon"
          src="@/assets/icon/currencies/tether.svg"
          alt="currency"
        >
      </div>
      <p class="subtitle heading-gray-md">
        €594.41
      </p>
    </div>
    <div class="controls">
      <button class="control-btn">
        <img
          class="label"
          src="@/assets/icon/plus.svg"
        >Deposit
      </button>
      <button class="control-btn">
        <img
          class="label"
          src="@/assets/icon/arrow-right-white.svg"
        >Send
      </button>
      <button class="control-btn">
        <img
          class="label"
          src="@/assets/icon/repeat.svg"
        >Exchange
      </button>
    </div>
    <div class="tabs">
      <div
        class="tab"
        :class="{'active': activeTab === 1}"
        @click="activeTab = 1"
      >
        History
      </div>
      <div
        class="tab"
        :class="{'active': activeTab === 2}"
        @click="activeTab = 2"
      >
        Wallet Address
      </div>
    </div>
    <ul class="transactions">
      <li
        v-for="(transaction, index) in transactions"
        :key="index"
        class="item"
      >
        <img
          class="icon"
          :src="transaction.img"
        >
        <div class="info">
          <div class="flex">
            <h1 class="title">
              {{ transaction.info }}
            </h1>
            <p :class="{'received': transaction.sum.startsWith('+')}">
              {{ transaction.sum }}
            </p>
          </div>
          <div class="flex">
            <div class="subtitle">
              {{ transaction.from }}
            </div>
            <p
              v-if="transaction.status"
              :class="{'pending' : transaction.status === 'Pending'}"
            >
              {{ transaction.status }}
            </p>
            <p
              v-else
              class="second-sum"
            >
              {{ transaction.sum }}
            </p>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <bottom-nav />
</template>

<script setup lang="ts">
import BottomNav from '@/components/UI/BottomNav.vue'
import { ref } from 'vue'
  const activeTab = ref(1)
  const transactions = [
    {
      info: 'Received USDT',
      from: 'From andrew@gmail.com',
      sum: '+ 13.55 USDT',
      status: 'Pending',
      img: require('@/assets/icon/transactions/received.svg'),
    },
      {
      info: 'Deposit USDT',
      from: 'From Bitcoin address',
      sum: '+ 125.00 USDT',
      img: require('@/assets/icon/transactions/sent.svg')
    },
      {
      info: 'Sent USDT',
      from: 'To andrew@gmail.com',
      sum: '- 13.55 USDT',
      img: require('@/assets/icon/transactions/exchange.svg')
    },
    {
      info: 'Received USDT',
      from: 'From andrew@gmail.com',
      sum: '+ 13.55 USDT',
      status: 'Pending',
      img: require('@/assets/icon/transactions/received.svg')
    },
      {
      info: 'Deposit USDT',
      from: 'From Bitcoin address',
      sum: '+ 125.00 USDT',
      img: require('@/assets/icon/transactions/sent.svg')
    },
      {
      info: 'Sent USDT',
      from: 'To andrew@gmail.com',
      sum: '- 13.55 USDT',
      img: require('@/assets/icon/transactions/exchange.svg')
    }
  ]
</script>

<style lang="scss" scoped>
.account-transactions {
  background: #FAFAFE;
  height: 85%;
  padding: 60px 16px 0 16px;
  flex-grow: 1;
  overflow: auto;

  >.count {
    >.flex {
      >.icon {
        height: 56px;
        width: 56px;
        margin-left: auto;
      }

      >.title {
        font-weight: 600;
        font-size: 28px;
        line-height: 34px;
        letter-spacing: 0.0038em;

        span {
          font-weight: 600;
          font-size: 22px;
          line-height: 34px;
          letter-spacing: -0.0026em;
        }
      
      }
    }

    >.subtitle {
      margin-bottom: 28px;
    }
  }

  >.controls {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 32px;

    >.control-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 109px;
      height: 40px;
      background: #2862FF;
      color: white;
      border-radius: 10px;

      >.label {
        margin-right: 9px;
      }
    }
  }

  .tabs {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 4px;
    border-radius: 8px;
    background: #EDF0FB;
    margin-bottom: 30px;

    >.tab {
      width: 49%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #78809B;
      height: 32px;
      background: #EDF0FB;
      font-weight: 600;
      font-size: 13px;
      line-height: 18px;
    }

    >.active {
      background: white;
      color: #36416A;
    }
  }

  .transactions {
    max-height: 360px;
    overflow-y: auto;
    padding-right: 10px;

    >.item {
      display: flex;
      width: 100%;
      margin-bottom: 24px;

      >.icon {
        margin-right: 12px;
        width: 40px;
        height: 40px;
      }

      >.info {
        width: 100%;
        >.flex {
          width: 100%;
          justify-content: space-between;

          >.title {
            font-weight: 500;
            font-size: 16px;
            line-height: 21px;
            letter-spacing: -0.0031em;
          }

          >.subtitle {
            font-size: 13px;
            line-height: 18px;
            letter-spacing: -0.0008em;
            color: #78809B;
          }

          >.pending {
            color: #E8AD00;
          }

          >.received {
            color: #3EAF4D;
          }

          >.second-sum {
            font-size: 13px;
            line-height: 18px;
            text-align: right;
            letter-spacing: -0.0008em;
            color: #78809B;
          }

        }
      }
    }
  }
}
</style>