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

  <app-layout-switcher :style="{ 'padding-top': `${padding.top}px`, 'padding-bottom': `${padding.bottom}px`, 'padding-left': `${padding.left}px` , 'padding-right': `${padding.right}px` }">
    <router-view class="router-view" />
  </app-layout-switcher>
</template>

<script setup lang="ts">
import PToast from 'primevue/toast';
import AppLayoutSwitcher from './components/Common/AppLayoutSwitcher.vue';
import { useAccountStore } from './stores/account';
import { SafeArea } from "capacitor-plugin-safe-area";
import { ref } from 'vue';

const store = useAccountStore();
store.init();

const padding = ref({
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
});

SafeArea.getSafeAreaInsets().then(({ insets }) => {
  Object.assign(padding.value, insets)
  console.debug(padding.value)
})
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
