<template>
  <contacts-list :contacts="contacts" @contactClick="handleContactClick" />
  <button
    v-if="contacts.length"
    class="options-button"
    @click="isMenuOpen = !isMenuOpen"
  >
    Payment Options
  </button>
  <bottom-swipe-menu
    :is-menu-open="isMenuOpen"
    :menu-type="getMenuType"
    @close-menu="closeMenu"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRecepientsStore } from '@/stores/recipients';
import { useTransferStore } from '@/stores/transfer';

import BottomSwipeMenu from '@/components/ui/bottom-swipe-menu/BottomSwipeMenu.vue';
import ContactsList from '@/components/ui/organisms/ContactsList.vue';

import { Contact } from '@/types/contacts';

const recepientsStore = useRecepientsStore();
const transferStore = useTransferStore();

const contacts: Contact[] = recepientsStore.getContacts;

let isMenuOpen = ref(false);

const getMenuType = computed(() => {
  return 'add_contact';
});

function closeMenu() {
  isMenuOpen.value = false;
}

const handleContactClick = (contact: Contact) => {
  isMenuOpen.value = !isMenuOpen.value;
  const id = contact.contactId;
  const phone = contact.phoneNumbers[0]?.number || '';
  const recipient = { id, phone };
  transferStore.recipient = recipient;
};
</script>

<style lang="scss" scoped>
.router-link-exact-active {
  background: $color-brand-secondary;
  color: $color-white;
}

.options-button {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  right: 40px;
  left: 16px;
  bottom: 5%;
  background: #edf0fb;
  border-radius: 13px;
  color: $color-primary-500;
  font-weight: 600;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: -0.0043em;
}
</style>
