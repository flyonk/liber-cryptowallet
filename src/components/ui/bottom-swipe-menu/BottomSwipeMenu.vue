<template>
  <div
    v-if="isMenuOpen && showOverlay"
    class="overlay"
    @click="closeMenu"
  ></div>
  <div v-if="isMenuOpen" ref="menu" class="bottom-menu">
    <div class="background-locker" />
    <div class="close" @click="closeMenu" @touchmove="startMove"></div>
    <component
      :is="currentComponent"
      @close-menu="closeMenu"
      @touchmove="startMove"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, computed, onUpdated } from 'vue';

import CommunicationMenu from '@/components/ui/bottom-swipe-menu/inner-views/CommunicationMenu.vue';
import DashboardHomeMenu from '@/components/ui/bottom-swipe-menu/inner-views/DashboardHomeMenu.vue';
import SurpriseGiftMenu from '@/components/ui/bottom-swipe-menu/inner-views/SurpriseGiftMenu.vue';
import SendMenu from '@/components/ui/bottom-swipe-menu/inner-views/SendMenu.vue';
import AddContactMenu from '@/components/ui/bottom-swipe-menu/inner-views/AddContactMenu.vue';

const menu = ref();

const props = defineProps({
  menuType: {
    type: String,
    required: true,
    default: 'dashboard',
  },
  isMenuOpen: {
    type: Boolean,
    required: true,
  },
  showOverlay: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['closeMenu']);

function closeMenu() {
  emit('closeMenu');
}

function startMove($event: TouchEvent) {
  if (menu?.value) {
    menu.value.style.height = `calc(100% - ${$event.touches[0].pageY}px)`;
  }
}

const currentComponent = computed(() => {
  switch (props.menuType) {
    case 'dashboard':
      return DashboardHomeMenu;
    case 'communication':
      return CommunicationMenu;
    case 'surprise':
      return SurpriseGiftMenu;
    case 'send':
      return SendMenu;
    case 'add_contact':
      return AddContactMenu;
    default:
      return DashboardHomeMenu;
  }
});

const { isMenuOpen } = toRefs(props);

onUpdated(() => {
  switch (props.menuType) {
    case 'dashboard':
      if (!menu.value) return;
      menu.value.style.minHeight = `30%`;
      menu.value.style.maxHeight = `90%`;
      break;
    case 'communication':
      if (!menu.value) return;
      menu.value.style.minHeight = `70%`;
      menu.value.style.maxHeight = `90%`;
      break;
    case 'surprise':
      if (!menu.value) return;
      menu.value.style.minHeight = `80%`;
      menu.value.style.maxHeight = `90%`;
      break;
    case 'send':
      if (!menu.value) return;
      menu.value.style.minHeight = `40vh`;
      menu.value.style.maxHeight = `60vh`;
      break;
    case 'add_contact':
      if (!menu.value) return;
      menu.value.style.minHeight = `45%`;
      menu.value.style.maxHeight = `65%`;
      break;
  }
});
</script>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba($color-brand-primary, 80%);
}

.bottom-menu {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: $color-white;
  border-radius: 10% 10% 0 0;

  /* offset-x | offset-y | blur-radius | spread-radius | color */
  box-shadow: 0 -1000px 0 1000px rgba($color-brand-primary, 0.8);
  max-height: 90%;
  min-height: 10%;
  height: 30%;
  animation: topToBottom ease 1s;
  padding: 8px 16px 0;
  z-index: 2;

  > .background-locker {
    position: absolute;
    width: calc(100% + 10px);
    height: 100vh;
    top: -100vh;
    left: -10px;
    opacity: 0;
    z-index: -1;
  }

  > .close {
    width: 64px;
    height: 5px;
    border-radius: 1px;
    background: $color-grey;
    margin: 0 auto;
    margin-bottom: 25px;
  }
}

@keyframes topToBottom {
  0% {
    bottom: -100%;
    opacity: 0;
  }

  100% {
    bottom: 0;
    opacity: 1;
  }
}
</style>
