<template>
  <a-contact-initials
    :name="props.contact.displayName"
    :is-friend="props.contact.isFriend"
  />
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

import { AContactInitials } from '@liber-biz/crpw-ui-kit-liber';
import { getContactPhone } from '@/helpers/contacts';

import { Contact } from '@/types/contacts';
import { Route } from '@/router/types';

const props = defineProps({
  contact: {
    type: Object as PropType<Contact>,
    required: true,
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
    color: $color-brand-550;
  }

  > .phone {
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    color: $color-brand-2-300;
  }
}
</style>
