<template>
  <contacts-list :contacts="contacts" @contact-click="handleContactClick" />
  <bottom-swipe-menu
    :is-menu-open="isMenuOpen"
    :menu-type="getMenuType"
    @close-menu="closeMenu"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRecepientsStore } from '@/stores/recipients';

import BottomSwipeMenu from '@/components/ui/bottom-swipe-menu/BottomSwipeMenu.vue';
import ContactsList from '@/components/ui/organisms/ContactsList.vue';

import { Contact } from '@/types/contacts';

const recepientsStore = useRecepientsStore();
const contacts: Contact[] = recepientsStore.getContacts;

let isMenuOpen = ref(false);

const getMenuType = computed(() => {
  return 'add_contact';
});

function closeMenu() {
  isMenuOpen.value = false;
}

const handleContactClick = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<style lang="scss" scoped>
.router-link-exact-active {
  background: $color-brand-secondary;
  color: $color-white;
}
</style>
