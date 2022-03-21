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

import { Route } from '@/router/types';

import BottomNav from '@/components/ui/organisms/BottomNav.vue';

const route = useRouter();

let showNavBar = ref(true);
let path = route.currentRoute.value.name;

if (path === Route.DashboardVerification) showNavBar.value = false;

watch(route.currentRoute, (val) => {
  if (val.name === Route.DashboardVerification) {
    showNavBar.value = false;
  } else {
    showNavBar.value = true;
  }
});
</script>

<style lang="scss" scoped>
.navbar-layout {
  height: 100vh;
  position: relative;

  > .main {
    height: 100%;
    overflow: scroll;
  }
}
</style>
