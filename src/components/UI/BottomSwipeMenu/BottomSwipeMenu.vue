<template>
  <div
    v-if="isMenuOpen"
    ref="menu"
    class="bottom-menu"
  >
    <div
      class="bottom-menu--close"
      @click="closeMenu"
      @touchmove="startMove"
      @touchend="endMove"
    />
    <component
      :is="currentComponent"
      @close-menu="closeMenu"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, computed, onUpdated } from 'vue';

import CommunicationMenu from '@/components/UI/BottomSwipeMenu/InnerViews/CommunicationMenu.vue'
import DashboardHomeMenu from '@/components/UI/BottomSwipeMenu/InnerViews/DashboardHomeMenu.vue'

const menu = ref();

const props = defineProps({
  menuType: {
    type: String,
    required: true,
    default: 'dashboard'
  },
  isMenuOpen: {
    type: Boolean,
    required: true,
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
      return DashboardHomeMenu
    case 'communication':
      return CommunicationMenu
    default:
      return DashboardHomeMenu
  }
})

const { isMenuOen } = toRefs(props);

onUpdated(() => {
  switch (props.menuType) {
    case 'dashboard':
      if (menu?.value) {
        menu.value.style.minHeight = `30%`;
        menu.value.style.maxHeight = `90%`;
      }
      break;
    case 'communication':
      if (menu?.value) {
        menu.value.style.minHeight = `70%`;
        menu.value.style.maxHeight = `90%`;
      }
      break;
    default:
      break;
  }
})
</script>

<style lang="scss" scoped>
.bottom-menu {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: $color-white;
  border-radius: 32px 32px 0 0;
  max-height: 90%;
  min-height: 10%;
  height: 30%;
  animation: topToBottom ease 1s;
  padding: 8px 16px 0;
  z-index: 2;

  &--close {
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