<template>
  <div class="initials">
    {{ getContactInitials(props.contact.displayName) }}
  </div>
  <router-link
    :to="`/contacts/send/${props.contact.contactId}`"
    class="user-contact"
  >
    <p class="name">
      {{ props.contact.displayName }}
    </p>
    <p class="phone">
      {{ props.contact.phoneNumbers[0]?.number }}
    </p>
  </router-link>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

import { Contact } from '@/types/contacts';

const props = defineProps({
  contact: {
    type: Object as PropType<Contact>,
  },
});

function getContactInitials(fio = '') {
  let parts = fio.split(' ');
  if (parts && parts.length > 1) {
    let initials = '';
    let i = 0;
    while (initials.length < 2 && i < parts.length) {
      if (parts[i]) {
        initials += parts[i].charAt(0);
      }
      i++;
    }
    if (initials.length) {
      return initials;
    }
  }
  const firstLettter = fio && fio.charAt(0);
  return firstLettter || '?';
}
</script>

<style lang="scss" scoped>
.initials {
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
</style>
