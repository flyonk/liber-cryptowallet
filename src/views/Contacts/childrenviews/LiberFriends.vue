<template>
  <div class="empty-list">
    <img
      class="image"
      src="@/assets/images/empty_profile.png"
      alt="empty profile"
    />
    <h1 class="title">Friends list is empty</h1>
    <p class="description">
      I this list, you can find contact with which you make transactions. Add
      contact to make the first transfer.
    </p>
    <BaseButton
      class="btn"
      size="large"
      view="simple"
      @click="isMenuOpen = !isMenuOpen"
    >
      Add new contact
    </BaseButton>
  </div>
  <bottom-swipe-menu
    :is-menu-open="isMenuOpen"
    :menu-type="getMenuType"
    @close-menu="closeMenu"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

import { BaseButton } from '@/components/ui';
import BottomSwipeMenu from '@/components/ui/bottom-swipe-menu/BottomSwipeMenu.vue';

let isMenuOpen = ref(false);
let hasFriends = ref(true);

const getMenuType = computed(() => {
  if (hasFriends.value) {
    return 'add_contact';
  } else {
    return 'add_contact';
  }
});

function closeMenu() {
  isMenuOpen.value = false;
}
</script>

<style lang="scss" scoped>
.empty-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  padding-bottom: 10%;
  width: 100%;

  > .image {
    margin-bottom: 24px;
  }

  > .title {
    font-weight: 600;
    font-size: 20px;
    line-height: 25px;
    text-align: center;
    letter-spacing: -0.0045em;
    margin-bottom: 8px;
  }

  > .description {
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;
    text-align: center;
    letter-spacing: -0.0031em;
  }

  > .btn {
    margin-top: 10px;
  }
}
</style>
