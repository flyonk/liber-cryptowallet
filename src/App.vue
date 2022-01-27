<template>
  <p-toast />

  <router-view />
</template>

<script setup lang="ts">
import PToast from 'primevue/toast';

import { useAccountStore } from './stores/account';

const store = useAccountStore();
store.init();
</script>

<style lang="scss" scoped>
.main-nav {
  padding: 30px;

  > .link {
    font-weight: bold;
    color: #2c3e50;
    /* stylelint-disable*/
    &.router-link-exact-active {
      /* stylelint-enable*/
      color: #42b983;
    }
  }
}
</style>
