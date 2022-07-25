<template>
  <p-toast position="center">
    <template #message="slotProps">
      <div class="toast-content">
        <div class="icon">
          <i class="icon-check" />
        </div>
        <h4 class="title">
          {{ slotProps.message.summary }}
        </h4>
      </div>
    </template>
  </p-toast>
  <m-browser-stub v-if="!IS_DEVELOPEMENT_MODE" />
  <app-layout-switcher>
    <p-offline-mode v-if="isOfflineMode" @online="handleReconnection" />
    <div v-else>
      <multi-factor-authorization v-if="showMfa" />
      <router-view v-else v-slot="{ Component, route }" class="router-view">
        <!-- TODO: Implement good transitions, when needed: name="dissolve" -->
        <!-- <transition> -->
        <component :is="Component" :key="route.path" />
        <!-- </transition> -->
      </router-view>
    </div>
  </app-layout-switcher>
  <a-offline-bundler
    :is-active="bundlerIsActive"
    :bundle-title="$t('offline.bundleTitle')"
  />
  <errors-toast />
  <m-custom-error />
</template>

<script setup lang="ts">
import {
  onBeforeMount,
  onBeforeUnmount,
  ref,
  computed,
  defineAsyncComponent,
} from 'vue';

//TODO: use profile store instead
import { useAccountStore } from '@/applications/liber/stores/account';
import { useMfaStore } from '@/stores/mfa';
import { useErrorsStore } from '@/stores/errors';
import SwipeBack from '@/plugins/swipe-capacitor';
import { IS_DEVELOPEMENT_MODE } from '@/constants';

import { useCheckOffline } from '@/helpers/composables/checkOffline';

import PToast from 'primevue/toast';
import AppLayoutSwitcher from './components/ui/organisms/common/AppLayoutSwitcher.vue';
import ErrorsToast from '@/components/ui/organisms/errors/ErrorsToast.vue';
import MultiFactorAuthorization from '@/components/ui/pages/MultiFactorAuthorization.vue';
import MCustomError from '@/components/ui/molecules/custom-errors/MCustomError.vue';
import POfflineMode from '@/components/ui/pages/POfflineMode.vue';
import MBrowserStub from '@/components/ui/molecules/MBrowserStub.vue';

// TODO:[UIKIT] change bundle-title with title in props
const AOfflineBundler = defineAsyncComponent(() => {
  return import(`@liber-biz/crpw-ui-kit-${process.env.VUE_APP_BRAND}`).then(
    (lib) => lib.AOfflineBundler
  );
});

const { isOffline } = useCheckOffline();

const mfaStore = useMfaStore();

const store = useAccountStore();
store.init();

const errorsStore = useErrorsStore();

const bundlerIsActive = ref(false);

function onOffline() {
  bundlerIsActive.value = true;
}
function onOnline() {
  bundlerIsActive.value = false;
}

onBeforeMount(() => {
  //Need to subscribe window events
  window.addEventListener('offline', onOffline);
  window.addEventListener('online', onOnline);
});

onBeforeUnmount(() => {
  window.removeEventListener('offline', onOffline);
  window.removeEventListener('online', onOnline);
});

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

const isOfflineMode = ref(isOffline());

function handleReconnection() {
  isOfflineMode.value = false;
}
</script>

<style lang="scss">
.main-nav {
  padding: 30px;

  > .link {
    font-weight: bold;
    color: #2c3e50;

    & > .router-link-exact-active {
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
