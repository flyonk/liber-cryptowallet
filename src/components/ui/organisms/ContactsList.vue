<template>
  <div v-if="props.contacts.length" class="main-list">
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
  overflow: hidden;
  padding-bottom: 95px;
  position: relative;
}

.contacts-list {
  display: flex;
  flex-direction: column;
  overflow: auto;
  height: 100%;
}

.contact-item {
  display: flex;
  margin-bottom: 24px;
}
</style>
