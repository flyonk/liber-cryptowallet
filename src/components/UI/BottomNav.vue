<template name="BottomNav">
  <div class="bottom-nav">
    <ul class="navbar-list">
      <router-link
        style="text-decoration: none"
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
          :class="{ 'label--active': activeTab === 1 }"
        >
          Home
        </p>
      </router-link>
      <router-link
        style="text-decoration: none"
        to="/account"
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
          :class="{ 'label--active': activeTab === 2 }"
        >
          Account
        </p>
      </router-link>
      <li
        class="item"
        @click="changeTab(3)"
      >
        <img
          class="icon center-image"
          src="@/assets/icon/navbar/send.svg"
          alt="Send"
        >
        <p
          class="label"
          :class="{ 'label--active': activeTab === 3 }"
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
          :class="{ 'label--active': activeTab === 4 }"
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
          :class="{ 'label--active': activeTab === 5 }"
        >
          Invite
        </p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeTab = ref(1);

function changeTab(tabNum: number) {
  activeTab.value = tabNum;
}
</script>

<style lang="scss" scoped>
.bottom-nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 15px rgb(0 0 0 / 10%);
  width: 100%;
  position: absolute;
  bottom: 0;
}

.navbar-list {
  background: $color-white;
  margin-top: auto;
  width: 100%;
  height: 65px;
  display: flex;
  justify-content: space-around;
  margin-bottom: 15px;

  > .item {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;

    > .label {
      text-decoration: none;

      &--active {
        color: $color-primary;
      }
    }

    > .svg {
      width: 24px;
      height: 24px;
      fill: $color-red;
    }

    > .center-image {
      position: relative;
      top: -10px;
    }
  }
}
</style>
