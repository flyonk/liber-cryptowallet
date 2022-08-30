<template>
  <div class="navbar-layout layout">
    <main class="main">
      <slot />
    </main>
    <bottom-nav v-if="showNavBar" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import { useMfaStore } from '@/stores/mfa';

import { Route } from '@/router/types';

import BottomNav from '@/components/ui/organisms/BottomNav.vue';

const route = useRouter();
const mfaStore = useMfaStore();

let showNavBar = ref(true && !mfaStore.enabled);
let path = route.currentRoute.value.name;

if (path === Route.DashboardVerification) showNavBar.value = false;

watch(route.currentRoute, (val) => {
  if (val.name === Route.DashboardVerification) {
    showNavBar.value = false;
  } else {
    showNavBar.value = true && !mfaStore.enabled;
  }
});
</script>

<style lang="scss" scoped>
.navbar-layout {
  height: 100%;
  position: relative;
  overflow: hidden;

  &.-full-height {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: fill-available;
  }

  &.-full-viewport {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  > .main {
    height: 100%;
    overflow: scroll;
    padding-bottom: 100px;
  }
}
</style>
