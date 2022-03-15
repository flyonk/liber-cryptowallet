<template name="DashboardHome">
  <div :style="stylePaddings">
    <DashboardSkeleton v-if="loading" />
    <div v-else class="dashboard-container">
      <div class="header flex mb-4">
        <img
          src="@/assets/images/avatar.png"
          @click="$router.push('/profile')"
        />
        <div v-if="VerificationStatus === 'in_progress'" class="verification">
          {{ $t('views.dashboard.home.idVerification') }}
        </div>
        <div
          v-if="VerificationStatus === 'verified'"
          class="verification -verified"
        >
          {{ $t('views.dashboard.home.idVerified') }}
        </div>
        <div
          v-if="VerificationStatus === 'failed'"
          class="verification verification--failed"
        >
          {{ $t('views.dashboard.home.iDVerificationFailed') }}
        </div>
        <img src="@/assets/icon/bell.svg" class="ml-auto" />
      </div>
      <ul class="tabs flex">
        <li
          v-for="tab in tabs"
          :key="tab.id"
          class="tab-item"
          :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          {{ tab.name }}
        </li>
      </ul>
      <div class="currencies flex items-center">
        <h1 class="title">€ 0.00</h1>
        <div class="circle-wrap">
          <img
            class="down"
            :class="{ '-reverted': isMenuOpen }"
            src="@/assets/icon/arrow-down.svg"
            @click="isMenuOpen = !isMenuOpen"
          />
        </div>
        <img
          class="ml-auto"
          src="@/assets/icon/currencies/euro.svg"
          alt="eurounion"
          @click="$router.push('/transactions')"
        />
      </div>
      <h3 class="heading-gray-md mb-4">
        {{ $t('views.dashboard.home.allAccounts') }}
      </h3>
      <div class="main">
        <h1 class="title">
          {{ $t('views.dashboard.home.getYourCryptoAsset') }}
        </h1>
        <h4 class="description">
          {{ $t('views.dashboard.home.noAssets') }} <br />
          {{ $t('views.dashboard.home.depositFirstCoins') }}
        </h4>
      </div>
      <div class="controls">
        <button
          class="btn"
          :class="{ '-active': VerificationStatus === 'verified' }"
          :disabled="VerificationStatus !== 'verified'"
          @click="$router.push('/deposit')"
        >
          {{ $t('views.dashboard.home.deposit') }}
        </button>
        <button
          class="btn"
          :class="{ '-active': VerificationStatus === 'verified' }"
          :disabled="VerificationStatus !== 'verified'"
        >
          {{ $t('views.dashboard.home.send') }}
        </button>
        <button
          class="btn"
          :class="{ '-active': VerificationStatus === 'verified' }"
          :disabled="VerificationStatus !== 'verified'"
        >
          ...
        </button>
      </div>
      <div class="transactions">
        <div class="flex justify-content-between items-center w-full mb-3">
          <p class="text-dark-gray">
            {{ $t('views.dashboard.home.transactions') }}
          </p>
          <p class="heading-gray-md">
            {{ $t('views.dashboard.home.seeAll') }}
          </p>
        </div>
        <div class="flex items-center mb-5">
          <ul v-if="hasTransactions" class="transactions">
            <li
              v-for="(transaction, index) in transactions"
              :key="index"
              class="item"
              @click="$router.push('/transactions/details')"
            >
              <img class="icon" :src="transaction.img" />
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
          <template v-else>
            <img src="@/assets/icon/clock.svg" class="mr-2" />
            <p class="text-dark-gray">
              {{ $t('views.dashboard.home.noTransactions') }}
            </p>
          </template>
        </div>
        <h4 class="heading-gray-md mb-3">
          {{ $t('views.dashboard.home.todo') }}
        </h4>
        <div class="carousel">
          <VueAgile :slides-to-show="2" :nav-buttons="false">
            <div
              v-for="(item, index) in carousel"
              :key="index"
              class="carousel-item slide"
              @click="$router.push('/home/story')"
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
      </div>
      <bottom-swipe-menu :is-menu-open="isMenuOpen" @close-menu="closeMenu" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { VueAgile } from 'vue-agile';
import { useI18n } from 'vue-i18n';

import useSafeAreaPaddings from '@/helpers/safeArea';

import BottomSwipeMenu from '@/components/UI/BottomSwipeMenu/BottomSwipeMenu.vue';
import DashboardSkeleton from '@/components/UI/organisms/DashboardSkeleton.vue';

let activeTab = ref(1);
const VerificationStatus = ref('verified');

const { stylePaddings } = useSafeAreaPaddings();

let isMenuOpen = ref(false);
// TODO: check if there is a data in store
let loading = ref(true);

const { tm } = useI18n();

setTimeout(() => {
  loading.value = false;
}, 1500);

function closeMenu() {
  isMenuOpen.value = false;
}

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
  },
  {
    status: tm('views.dashboard.home.carousel.required'),
    description: tm('views.dashboard.home.carousel.verify'),
    imgSrc: require('@/assets/icon/todo/mail.svg'),
    text: 'blue',
  },
  {
    status: tm('views.dashboard.home.carousel.recommend'),
    description: tm('views.dashboard.home.carousel.getYourCryptoProperty'),
    imgSrc: require('@/assets/icon/todo/wallet.svg'),
    text: 'green',
  },
  {
    status: '_',
    description: tm('views.dashboard.home.carousel.reach'),
    imgSrc: require('@/assets/icon/todo/mail.svg'),
    text: 'black',
  },
];

const transactions = ref([
  {
    info: `${tm('transactions.operations.received')} BTC`,
    from: `${tm('common.from')} test@cryptowize.tech`,
    sum: '+ 0.0001 BTC',
    status: 'Completed',
    img: require('@/assets/icon/transactions/received.svg'),
  },
]);

const hasTransactions = computed(() => transactions.value.length > 0);
</script>

<style lang="scss" scoped>
.dashboard-container {
  padding: 0 15px;
  background: $color-light-grey-100;
  overflow: auto;
  flex-grow: 1;

  > .header {
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

  // TODO: extract to component
  > .transactions {
    > .carousel {
      display: flex;
      margin-bottom: 20px;
      position: relative;
      left: -37px;
      width: 113%;
    }

    max-height: 360px;
    overflow-y: auto;
    padding-right: 10px;
    width: 100%;

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

  /**
  I consider it a legacy, but I will keep it
  */
  // &__header {
  //   margin-bottom: 16px;
  // }

  // &__tabs {
  //   display: flex;

  //   &--item {
  //     color: $color-brand-primary;
  //     border-radius: 8px;
  //     display: flex;
  //     justify-content: center;
  //     align-items: center;
  //     width: 101px;
  //     height: 40px;

  //     &.active {
  //       background: $color-brand-secondary;
  //       color: $color-white;
  //     }
  //   }
  // }

  // &__currencies {
  //   margin-top: 30px;

  //   &--wrap {
  //     margin: 0 6px 5px 0;
  //   }

  //   &--down {
  //     width: 24px;
  //     height: 24px;
  //     background: $color-light-grey;
  //     border-radius: 100px;
  //     display: flex;
  //     justify-content: center;
  //     align-items: center;
  //   }
  // }

  // &__controls {
  //   display: flex;
  //   margin-bottom: 32px;

  //   &--btn {
  //     background: $color-grey;
  //     border-radius: 8px;
  //     padding: 0 16px 0 12px;
  //     display: flex;
  //     justify-content: center;
  //     align-items: center;
  //     width: 109px;
  //     height: 40px;
  //     margin-right: 8px;
  //     color: $color-white;

  //     &:last-child {
  //       width: 40px;
  //       height: 40px;
  //       margin: 0;
  //     }
  //   }
  // }

  // &__carousel {
  //   display: flex;
  //   margin-bottom: 20px;

  //   &--item {
  //     width: 160px;
  //     padding: 16px;
  //     height: 160px;
  //     border-radius: 16px;
  //     margin-right: 8px;
  //     background: $color-light-grey;

  //     img {
  //       margin-bottom: 20px;
  //     }

  //     h4 {
  //       color: $color-primary;
  //       font-weight: 800;
  //       font-size: 10px;
  //       line-height: 13px;
  //       margin-bottom: 5px;
  //     }

  //     &:nth-child(3) {
  //       background: $color-green-50;
  //     }

  //     &:last-child {
  //       margin-right: 0;
  //       background: $color-yellow-50;
  //     }
  //   }
  // }
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
