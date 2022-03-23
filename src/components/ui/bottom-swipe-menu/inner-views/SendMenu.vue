<template>
  <ul class="send-menu">
    <router-link :to="{ name: Route.PayRecepientsLiber }" class="menu-item">
      <img
        class="icon"
        src="@/assets/icon/transactions/menu/send_funds.svg"
        alt="send"
      />
      <p class="text">Send Funds</p>
    </router-link>
    <li class="menu-item" @click="$router.push('/convert')">
      <img
        class="icon"
        src="@/assets/icon/transactions/menu/convert_funds.svg"
        alt="send"
      />
      <p class="text">Convert Funds</p>
    </li>
    <li class="menu-item">
      <img
        class="icon"
        src="@/assets/icon/transactions/menu/ask_for_funds.svg"
        alt="send"
      />
      <p class="text">Ask for Funds</p>
    </li>
    <li class="menu-item">
      <img
        class="icon"
        src="@/assets/icon/transactions/menu/borrow_funds.svg"
        alt="send"
      />
      <p class="text">Borrow Coin</p>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { Route } from '@/router/types';
</script>

<style lang="scss" scoped>
.send-menu {
  bottom: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 50px;
}

.menu-item {
  display: flex;
  align-items: center;
  margin-bottom: 30px;

  > .icon {
    margin-right: 20px;
  }

  > .text {
    font-weight: 500;
    font-size: 16px;
    line-height: 21px;
    letter-spacing: -0.0031em;
    color: $color-black;
  }
}
</style>
