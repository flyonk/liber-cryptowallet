<template name="DashboardHome">
  <div class="dashboard">
    <div class="header flex mb-4">
      <img src="@/assets/images/avatar.png">
      <div class="verification">
        ID Verification
      </div>
      <img
        src="@/assets/icon/bell.svg"
        class="ml-auto"
      >
    </div>
    <ul class="tabs flex">
      <li
        v-for="tab in tabs"
        :key="tab.id"
        class="tab-item"
        :class="{'active': activeTab === tab.id}"
        @click="activeTab = tab.id"
      >
        {{ tab.name }}
      </li>
    </ul>
    <div class="currencies flex items-center">
      <h1 class="title">
        € 0.00
      </h1>
      <div class="circle-wrap">
        <img
          class="down"
          src="@/assets/icon/arrow-down.svg"
        >
      </div>
      <img
        class="ml-auto"
        src="@/assets/icon/currencies/euro.svg"
        alt="eurounion"
      >
    </div>
    <h3 class="heading-gray-md mb-4">
      All Accounts
    </h3>
    <div class="main">
      <h1 class="title">
        Get your first crypto asset
      </h1>
      <h4 class="description">
        Your account has no assets. <br> Deposit your first crypto coins!
      </h4>
    </div>
    <div class="controls">
      <button class="btn">
        Deposit
      </button>
      <button class="btn">
        Send
      </button>
      <button class="btn">
        ...
      </button>
    </div>
    <div class="transactions">
      <div class="flex justify-content-between items-center w-full mb-3">
        <p class="text-dark-gray">
          Transactions
        </p>
        <p class="heading-gray-md">
          See All
        </p>
      </div>
      <div class="flex items-center mb-5">
        <img
          src="@/assets/icon/clock.svg"
          class="mr-2"
        >
        <p class="text-dark-gray">
          No Transaction Yet
        </p>
      </div>
      <h4 class="heading-gray-md mb-3">
        Todo
      </h4>
      <div class="carousel">
        <VueAgile
          :slides-to-show="2"
          :nav-buttons="false"
        >
          <div
            v-for="(item, index) in carousel"
            :key="index"
            class="carousel-item slide"
          >
            <img :src="item.imgSrc">
            <h4 :class="{'text-green' : item.text === 'green', 'text-black': item.text === 'black'}">
              {{ item.status }}
            </h4>
            <p>{{ item.description }}</p>
          </div>
        </VueAgile>
      </div>
    </div>
    <bottom-nav />
  </div>
</template>

<script setup lang="ts">
import { VueAgile } from 'vue-agile'
import BottomNav from '@/components/UI/BottomNav.vue'
// import { toRefs } from 'vue';
const activeTab = 1;
const tabs = [
  {
    id: 1,
    name: 'Dashboard'
  },
  {
    id: 2,
    name: 'Treasury'
  },
  {
    id: 3,
    name: 'Loans'
  }
]

const carousel = [
  {
    status: 'In Progress',
    description: 'We’re verifying your ID',
    imgSrc: '@/assets/icon/todo/empty-profile.svg',
    text: 'blue'
  },
  {
    status: 'Required',
    description: 'Verify your email address',
    imgSrc: '@/assets/icon/todo/mail.svg',
    text: 'blue'
    
  },
  {
    status: 'Recommend',
    description: 'Get your first crypto property',
    imgSrc: '@/assets/icon/todo/wallet.svg',
    text: 'green'
  },
  {
    status: '_',
    description: 'How can we reach you?',
    imgSrc: '@/assets/icon/todo/mail.svg',
    text: 'black'
  }
]


defineProps({
  msg: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.dashboard {
  height: 100vh;
  padding: 15px;
  background: #FAFAFE;

  >.header {
    align-items: center;
    >.verification {
      margin-left: 8px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      width: 131px;
      height: 31px;
      background: #FFEBB0;
      border-radius: 100px;
      white-space: nowrap;
      font-size: 16px;
      line-height: 21px;
      letter-spacing: -0.0031em;
      color: #8C6900;
    }
  }

  >.tabs {
    margin-bottom: 24px;
    >.tab-item {
      color: #0D1F3C;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 101px;
      height: 40px;
    }
    >.active {
      background: #36416A;
      color: white;
    }
  }

  >.currencies {
    display: flex;
    align-items: center;

    >.title {
      margin-right: 8px;
    }
    >.circle-wrap {
      border-radius: 50%;
      background: #EDF0FB;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 36px;
      width: 36px;
    }
  }

  >.main {
    margin-bottom: 24px;
    >.title {
      font-weight: 600;
      font-size: 16px;
      line-height: 21px;
      letter-spacing: -0.0031em;
      margin-bottom: 8px;
    }

    >.description {
      font-weight: normal;
      font-size: 13px;
      line-height: 18px;
      letter-spacing: -0.0008em;
    }
  }

  >.controls {
    display: flex;
    margin-bottom: 32px;

    >.btn {
      background: #AFB3C3;
      border-radius: 8px;
      padding: 0px 16px 0px 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 109px;
      height: 40px;
      margin-right: 8px;
      color: white;

      &:last-child {
        width: 40px;
        height: 40px;
        margin: 0;
      }
    }
  }

.carousel {
  display: flex;
  margin-bottom: 20px;
}
.carousel-item {
  width: 160px;
  padding: 16px;
  height: 160px;
  border-radius: 16px;
  margin-right: 8px;
  background: #EDF0FB;

  img {
    margin-bottom: 20px;
  }

  h4 {
    color: #2862FF;
    font-weight: 800;
    font-size: 10px;
    line-height: 13px;
    margin-bottom: 5px;
  }

  &:nth-child(3) {
    background: #ECF9EE;
  }

  &:last-child {
    background: #FFF9E6;
  }
}


  &__header {
    margin-bottom: 16px;
  }

  &__tabs {
    display: flex;

    &--item {
      color: #0D1F3C;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 101px;
      height: 40px;

      &.active {
        background: #36416A;
        color: white;
      }
    }
  }

  &__currencies {
    margin-top: 30px;

    &--wrap {
      margin: 0 6px 5px 0;
    }

    &--down {
      width: 24px;
      height: 24px;
      background: #EDF0FB;
      border-radius: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  &__controls {
    display: flex;
    margin-bottom: 32px;

    &--btn {
      background: #AFB3C3;
      border-radius: 8px;
      padding: 0px 16px 0px 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 109px;
      height: 40px;
      margin-right: 8px;
      color: white;

      &:last-child {
        width: 40px;
        height: 40px;
        margin: 0;
      }
    }
  }

  &__carousel {
    display: flex;
    margin-bottom: 20px;

    &--item {
      width: 160px;
      padding: 16px;
      height: 160px;
      border-radius: 16px;
      margin-right: 8px;
      background: #EDF0FB;

      img {
        margin-bottom: 20px;
      }

      h4 {
        color: #2862FF;
        font-weight: 800;
        font-size: 10px;
        line-height: 13px;
        margin-bottom: 5px;
      }

      &:nth-child(3) {
        background: #ECF9EE;
      }

      &:last-child {
        margin-right: 0;
        background: #FFF9E6;
      }
    }
  }
}

#id-verification {
  margin-left: 8px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px 12px;
  width: 131px;
  height: 31px;
  background: #FFEBB0;
  border-radius: 100px;
  white-space: nowrap;
  font-size: 16px;
  line-height: 21px;
  letter-spacing: -0.0031em;
  color: #8C6900;
}

#currency {
  font-style: normal;
  font-weight: 600;
  font-size: 28px;
  line-height: 34px;
  letter-spacing: 0.0038em;
  color: #000000;
  margin-right: 8px;
}

.agile {
  width: 100%;
}

.text-green {
  color: #3EAF4D !important;
}

.text-black {
  color: black !important;
}
</style>