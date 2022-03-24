<template>
  <div v-if="hasFriends" class="main-list flex">
    <ul class="contacts-list">
      <li
        v-for="contact in contacts"
        :key="contact.contactId"
        class="contact-item"
        @click="isMenuOpen = !isMenuOpen"
      >
        <PhoneContact :contact="contact" />
      </li>
    </ul>
    <ul class="alphabet-list">
      <li v-for="(symbol, index) in alphabet" :key="index" class="symbol">
        {{ symbol }}
      </li>
    </ul>
  </div>
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
import PhoneContact from '@/components/ui/atoms/PhoneContact.vue';

import { Contact } from '@/types/contacts';

const recepientsStore = useRecepientsStore();
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

.router-link-exact-active {
  background: $color-brand-secondary;
  color: $color-white;
}
</style>
