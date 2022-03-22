<template>
  <div v-if="hasFriends" class="main-list flex">
    <ul class="contacts-list">
      <li
        v-for="contact in contacts"
        :key="contact.contactId"
        class="contact-item"
        @click="handleContactClick(contact)"
      >
        <div class="initials">
          {{ getContactInitials(contact.displayName) }}
        </div>
        <router-link
          :to="`/contacts/send/${contact.contactId}`"
          class="user-contact"
        >
          <p class="name">
            {{ contact.displayName }}
          </p>
          <p class="phone">
            {{ contact.phoneNumbers[0]?.number }}
          </p>
        </router-link>
      </li>
    </ul>
    <ul class="alphabet-list">
      <li v-for="(symbol, index) in alphabet" :key="index" class="symbol">
        {{ symbol }}
      </li>
    </ul>
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

import { Contact } from '@/types/contacts';

const recepientsStore = useRecepientsStore();
const transferStore = useTransferStore();

const contacts: Contact[] = recepientsStore.getContacts;

let isMenuOpen = ref(false);
let hasFriends = ref(true);

function getContactInitials(fio = '') {
  let parts = fio.split(' ');
  return parts[0][0] + parts[1][0];
}

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

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
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

  > .initials {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background: $color-yellow-100;
    width: 40px;
    height: 40px;
    color: $color-yellow-700;
    margin-right: 12px;
  }
}

.alphabet-list {
  > .symbol {
    font-style: normal;
    margin-bottom: 3px;
    font-weight: 500;
    font-size: 13px;
    line-height: 18px;
    text-align: center;
    letter-spacing: -0.0008em;
    color: $color-brand-2-300;
  }
}

.user-contact {
  > .name {
    font-weight: 500;
    font-size: 17px;
    line-height: 22px;
    letter-spacing: -0.0043em;
    color: #0d1f3c;
  }

  > .phone {
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    color: $color-brand-2-300;
  }
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
