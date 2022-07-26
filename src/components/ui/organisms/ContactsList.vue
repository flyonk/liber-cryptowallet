<template>
  <div v-if="props.contacts.length" class="main-list">
    <ul
      class="contacts-list"
      @scroll="scrollListHandle"
      @touchmove="scrollListHandle"
    >
      <template v-for="contact in props.contacts" :key="contact.contactId">
        <li
          v-if="activeLetters[getLetter(contact)] === contact.contactId"
          :id="'letter' + getLetter(contact)"
          class="contact-letter"
        >
          {{ getLetter(contact) }}
        </li>
        <li class="contact-item" @click="$emit('contactClick', contact)">
          <PhoneContact :contact="contact" />
        </li>
      </template>
    </ul>
    <a-phone-contacts-alphabet :active-letters="activeLetters" />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, PropType } from 'vue';

import PhoneContact from '@/components/ui/atoms/PhoneContact.vue';

import { getContactInitials } from '@/helpers/contacts';

import { Contact } from '@/types/contacts';

const APhoneContactsAlphabet = defineAsyncComponent(() => {
  return import(`@liber-biz/crpw-ui-kit-${process.env.VUE_APP_BRAND}`).then(
    (lib) => lib.APhoneContactsAlphabet
  );
});

const props = defineProps({
  contacts: {
    type: Array as PropType<Contact[]>,
    default: [] as PropType<Contact[]>,
  },
});

const activeLetters: Record<string, string> = {};

const getLetter = (contact: Contact): string => {
  const initials = getContactInitials(contact.displayName);
  const letter = initials.charAt(0).toUpperCase();
  if (!activeLetters[letter]) {
    activeLetters[letter] = contact.contactId;
  }
  return letter;
};

const scrollListHandle = () => {
  document?.activeElement?.blur();
};

defineEmits(['contactClick']);
</script>

<style lang="scss" scoped>
.main-list {
  width: 100%;
  overflow: hidden;
  padding-bottom: 95px;
  position: relative;
}

.contacts-list {
  display: flex;
  flex-direction: column;
  overflow: auto;
  height: 100%;

  &::-webkit-scrollbar {
    display: none;
  }
}

.contact-item {
  display: flex;
  margin-bottom: 24px;
  position: relative;
  z-index: 2;
}

.contact-letter {
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 18px;
  text-align: left;
  letter-spacing: -0.0008em;
  color: $color-brand-2-300;
  margin-bottom: 12px;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  width: 20px;
}
</style>
