<template>
  <ContactInitials :name="props.contact.displayName" />
  <router-link
    :to="{
      name: Route.ContactsSend,
      params: {
        id: props.contact.contactId,
      },
    }"
    class="user-contact"
  >
    <p class="name">
      {{ props.contact.displayName }}
    </p>
    <p class="phone">
      {{ getContactPhone(props.contact) }}
    </p>
  </router-link>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { PropType } from 'vue';

import ContactInitials from '@/components/ui/atoms/ContactInitials.vue';
import { getContactPhone } from '@/helpers/contacts';

import { Contact } from '@/types/contacts';
import { Route } from '@/router/types';

const props = defineProps({
  contact: {
    type: Object as PropType<Contact>,
  },
});
</script>

<style lang="scss" scoped>
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
