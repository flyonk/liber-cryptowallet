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
    <multi-factor-authorization v-if="showMfa" />
    <router-view v-else v-slot="{ Component, route }" class="router-view">
      <!-- TODO: Implement good transitions, when needed: name="dissolve" -->
      <!-- <transition> -->
      <component :is="Component" :key="route.path" />
      <!-- </transition> -->
    </router-view>
  </app-layout-switcher>

  <errors-toast />
  <m-custom-error />
</template>

<script setup lang="ts">
import { computed } from 'vue';

//TODO: use profile store instead
import { useAccountStore } from '@/applications/liber/stores/account';
import { useMfaStore } from '@/stores/mfa';
import { useErrorsStore } from '@/stores/errors';
import SwipeBack from '@/plugins/swipe-capacitor';

import PToast from 'primevue/toast';
import AppLayoutSwitcher from './components/ui/organisms/common/AppLayoutSwitcher.vue';
import ErrorsToast from '@/components/ui/organisms/errors/ErrorsToast.vue';
import MultiFactorAuthorization from '@/components/ui/pages/MultiFactorAuthorization.vue';
import MCustomError from '@/components/ui/molecules/custom-errors/MCustomError.vue';

const mfaStore = useMfaStore();

const store = useAccountStore();
store.init();

const errorsStore = useErrorsStore();

SwipeBack.enable()
  .then()
  .catch((err) => {
    const { code } = err;
    if (code !== 'UNIMPLEMENTED') {
      //TODO:disable display in toast (dev dependency)
      errorsStore.handle({
        err,
        name: 'App',
        ctx: 'SwipeBack',
        description: 'Capacitor SwipeBack plugin error',
      });
    }
  });

const showMfa = computed(() => {
  return mfaStore.enabled;
});

// const showOfflineToast = computed(() => {
//   return useAppOptionsStore().isOfflineToastActive;
// });
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
