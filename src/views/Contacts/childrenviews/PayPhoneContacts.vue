<template>
  <div v-if="hasFriends" class="main-list flex">
    <ul class="contacts-list">
      <li
        v-for="contact in contacts"
        :key="contact.contactId"
        class="contact-item"
        @click="handleContactClick(contact)"
      >
        <PhoneContact :contact="contact" />
      </li>
    </ul>
    <PhoneContactsAlphabet />
  </div>
  <button
    v-if="hasFriends"
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
import PhoneContact from '@/components/ui/atoms/PhoneContact.vue';
import PhoneContactsAlphabet from '@/components/ui/atoms/PhoneContactsAlphabet.vue';

import { Contact } from '@/types/contacts';

const recepientsStore = useRecepientsStore();
const transferStore = useTransferStore();

const contacts: Contact[] = recepientsStore.getContacts;

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

const handleContactClick = (contact: Contact) => {
  isMenuOpen.value = !isMenuOpen.value;
  const id = contact.contactId;
  const phone = contact.phoneNumbers[0]?.number || '';
  const recipient = { id, phone };
  transferStore.recipient = recipient;
};
</script>

<style lang="scss" scoped>
.main-list {
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.contacts-list {
  display: flex;
  flex-direction: column;
}

.contact-item {
  display: flex;
  margin-bottom: 24px;
}

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
