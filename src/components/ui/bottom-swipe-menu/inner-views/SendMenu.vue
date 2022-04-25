<template>
  <ul class="send-menu">
    <li class="menu-item" @click="onClick('borrow')">
      <i class="icon icon-borrow" />
      <p class="text">Borrow stablecoin</p>
    </li>
    <li class="menu-item" @click="onClick('ask')">
      <i class="icon icon-ask-for-funds" />
      <p class="text">Ask a user for funds</p>
    </li>
    <li class="menu-item" @click="onClick('withdraw')">
      <i class="icon icon-withdraw" />
      <p class="text">Withdraw</p>
    </li>
    <li class="menu-item" @click="onClick('download')">
      <i class="icon icon-send" />
      <p class="text">Download Statement</p>
    </li>
    <li class="menu-item" @click="onClick('add')">
      <i class="icon icon-convert" />
      <p class="text">Add account</p>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import { useUIStore } from '@/stores/ui';
import { Route } from '@/router/types';

const uiStore = useUIStore();
const router = useRouter();

const onClick = (action: string) => {
  switch (action) {
    case 'borrow':
      break;
    case 'ask':
      break;
    case 'withdraw':
      break;
    case 'download':
      break;
    case 'add':
      router.push({ name: Route.AccountAdd });
      break;
    default:
      break;
  }

  uiStore.setStateModal('sendMenu', false);
};
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
    color: $color-primary-500;
    font-size: 40px;
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
