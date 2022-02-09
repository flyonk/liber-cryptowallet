<template>
  <div class="navbar-layout layout">
    <main class="main">
      <slot />
    </main>
    <bottom-nav v-if="showNavBar" />
  </div>
</template>

<script setup lang="ts">
import BottomNav from '@/components/UI/BottomNav.vue';
import { useRouter } from 'vue-router';
import { ref, watch } from 'vue';
const route = useRouter();

let showNavBar = ref(true);
let path = route.currentRoute.value.name;

if (path === 'dashboard-verification') showNavBar.value = false;

watch(route.currentRoute, (val) => {
  if (val.name === 'dashboard-verification') {
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

  >.main{
    height: 100%;
    overflow:scroll;
  }
}
</style>
