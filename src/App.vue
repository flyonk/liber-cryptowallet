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
    <router-view v-slot="{ Component, route }" class="router-view">
      <transition name="dissolve">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </app-layout-switcher>
</template>

<script setup lang="ts">
import PToast from 'primevue/toast';
import AppLayoutSwitcher from './components/ui/organisms/common/AppLayoutSwitcher.vue';
//TODO: use profile store instead
import { useAccountStore } from './stores/account';

import SwipeBack from '@/plugins/swipe-capacitor';

SwipeBack.enable();

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

.dissolve-enter-active {
  animation: dissolve 0.3s;
}

.dissolve-leave-active {
  animation: dissolve 0.3s reverse;
}

@keyframes dissolve {
  0% {
    opacity: 0;
    position: absolute;
    width: 100%;
  }

  100% {
    opacity: 1;
    position: absolute;
    width: 100%;
  }
}
</style>
