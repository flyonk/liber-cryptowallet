<template name="BottomNav">
  <div class="wrapper">
    <ul class="navbar">
      <router-link
        style="text-decoration: none;"
        to="/home"
        class="item"
        @click="changeTab(1)"
      >
        <svg
          v-if="activeTab === 1"
          class="svg"
        >
          <use xlink:href="@/assets/icon/navbar/sprite.svg#home-active" />
        </svg>
        <svg
          v-else
          class="svg"
        >
          <use xlink:href="@/assets/icon/navbar/sprite.svg#home" />
        </svg>
        <p
          class="label"
          :class="{'label--active': activeTab === 1}"
        >
          Home
        </p>
      </router-link>
      <router-link
        style="text-decoration: none;"
        to="/home/accounts"
        class="item"
        @click="changeTab(2)"
      >
        <svg
          v-if="activeTab === 2"
          class="svg"
        >
          <use xlink:href="@/assets/icon/navbar/sprite.svg#account-active" />
        </svg>
        <svg
          v-else
          class="svg"
        >
          <use xlink:href="@/assets/icon/navbar/sprite.svg#account" />
        </svg>
        <p
          class="label"
          :class="{'label--active': activeTab === 2}"
        >
          Account
        </p>
      </router-link>
      <li
        class="item"
        @click="changeTab(3)"
      >
        <img
          id="center-btn-img"
          class="icon"
          src="@/assets/icon/navbar/send.svg"
          alt="Send"
        >
        <p
          class="label"
          :class="{'label--active': activeTab === 3}"
        >
          Send
        </p>
      </li>
      <li
        class="item"
        @click="changeTab(4)"
      >
        <svg
          v-if="activeTab === 4"
          class="svg"
        >
          <use xlink:href="@/assets/icon/navbar/sprite.svg#recipients-active" />
        </svg>
        <svg
          v-else
          class="svg"
        >
          <use xlink:href="@/assets/icon/navbar/sprite.svg#recipients" />
        </svg>
        <p
          class="label"
          :class="{'label--active': activeTab === 4}"
        >
          Recipients
        </p>
      </li>
      <li
        class="item"
        @click="changeTab(5)"
      >
        <svg
          v-if="activeTab === 5"
          class="svg"
        >
          <use xlink:href="@/assets/icon/navbar/sprite.svg#gift-active" />
        </svg>
        <svg
          v-else
          class="svg"
        >
          <use xlink:href="@/assets/icon/navbar/sprite.svg#gift" />
        </svg>
        <p
          class="label"
          :class="{'label--active': activeTab === 5}"
        >
          Invite
        </p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeTab = ref(1)


function changeTab(tabNum: number) {
  activeTab.value = tabNum
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.navbar {
  background: white;
  margin-top: auto;
  width: 100%;
  height: 65px;
  display: flex;
  justify-content: space-around;
  margin-bottom: 15px;

  >.item {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;

    >.label {
      text-decoration: none;

      &--active {
        color: #2862FF;
      }
    }

    >.svg {
      width: 24px;
      height: 24px;
      fill: red;
    }

    #center-btn-img {
      position: relative;
      top: -10px;
    }

    
  }

}

</style>
