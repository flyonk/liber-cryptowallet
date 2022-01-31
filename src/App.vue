<template>
  <router-view :style="{ 'touch-action': 'manipulation' }" />
</template>

<script setup lang="ts">
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
