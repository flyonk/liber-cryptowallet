<template>
  <base-toast
    :toast="toast"
  />

  <router-view />
</template>

<script setup lang="ts">
import { BaseToast } from './components/UI';

import { computed } from 'vue';

import { useAccountStore } from './stores/account';
import { useToastStore } from './stores/ui/toast';


const toastStore = useToastStore();

const toast = computed(() => toastStore.state)

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
