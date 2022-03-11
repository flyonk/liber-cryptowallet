<template>
  <p-toast position="center">
    <template #message="slotProps">
      <div class="toast-content">
        <div class="icon">
          <i class="ci-check" />
        </div>
        <h4 class="title">
          {{ slotProps.message.summary }}
        </h4>
      </div>
    </template>
  </p-toast>
  <app-layout-switcher>
    <router-view class="router-view" />
  </app-layout-switcher>
</template>

<script setup lang="ts">
import PToast from 'primevue/toast';
import AppLayoutSwitcher from './components/Common/AppLayoutSwitcher.vue';
import { useAccountStore } from './stores/account';

const store = useAccountStore();
store.init();
</script>

<style lang="scss">
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

.router-view {
  touch-action: manipulation;
}
</style>
