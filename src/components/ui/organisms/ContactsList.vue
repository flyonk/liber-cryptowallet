<template>
  <div v-if="props.contacts.length" class="main-list flex">
    <ul class="contacts-list">
      <li
        v-for="contact in props.contacts"
        :key="contact.contactId"
        class="contact-item"
        @click="$emit('contactClick', contact)"
      >
        <PhoneContact :contact="contact" />
      </li>
    </ul>
    <PhoneContactsAlphabet />
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

import PhoneContact from '@/components/ui/atoms/PhoneContact.vue';
import PhoneContactsAlphabet from '@/components/ui/atoms/PhoneContactsAlphabet.vue';

import { Contact } from '@/types/contacts';

const props = defineProps({
  contacts: {
    type: Array as PropType<Contact[]>,
    default: [] as PropType<Contact[]>,
  },
});

defineEmits(['contactClick']);
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
</style>
