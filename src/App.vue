<template>
  <!-- <p-toast /> -->
  <app-layout-switcher>
    <router-view />
  </app-layout-switcher>
</template>

<script setup lang="ts">
// import PToast from 'primevue/toast';
import AppLayoutSwitcher from './components/Common/AppLayoutSwitcher.vue';
import { useAccountStore } from './stores/account';


const store = useAccountStore();
store.init();
</script>

<style lang="scss">
#app {
  font-family: Inter, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

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
