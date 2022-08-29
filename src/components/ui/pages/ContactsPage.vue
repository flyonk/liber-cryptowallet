<template v-bind="$props">
  <template v-if="filteredContacts?.length">
    <contacts-list
      :contacts="filteredContacts"
      :class="{ 'with-payment-option': showPaymentOptions }"
    />
    <template v-if="props.showPaymentOptions">
      <button
        v-if="contacts.length"
        class="options-button"
        @click="isMenuOpen = !isMenuOpen"
      >
        {{ $t('common.paymentoptions') }}
      </button>
      <bottom-swipe-menu
        :is-menu-open="isMenuOpen"
        :menu-type="getMenuType"
        @close-menu="closeMenu"
      />
    </template>
  </template>
  <contacts-empty v-else />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useRecipientsStore } from '@/stores/recipients';

import BottomSwipeMenu from '@/components/ui/bottom-swipe-menu/BottomSwipeMenu.vue';
import ContactsList from '@/components/ui/organisms/ContactsList.vue';
import ContactsEmpty from '@/components/ui/pages/ContactsEmpty.vue';
import { getContactPhone } from '@/helpers/contacts';

import { Contact } from '@/types/contacts';

const { meta } = useRoute();

const recipientsStore = useRecipientsStore();

recipientsStore.getPhoneContacts();

const contacts = computed(() => {
  return meta?.friends
    ? recipientsStore.getFriends
    : recipientsStore.getContacts;
});

let isMenuOpen = ref(false);

const getMenuType = computed(() => {
  return 'add_contact';
});

function closeMenu() {
  isMenuOpen.value = false;
}

const props = defineProps({
  showPaymentOptions: {
    type: Boolean,
    default: false,
  },
  filter: {
    type: String,
    default: '',
  },
});

const filteredContacts = computed(() => {
  if (props.filter) {
    const filterStr = props.filter.toLowerCase();
    return contacts.value
      .filter((contact: Contact) => {
        const name = contact.displayName?.toLowerCase() || '';
        if (name.includes(filterStr)) {
          return true;
        }
        let phone = getContactPhone(contact);
        const regex = / |-|\(|\)|\+/g;
        phone = phone.replace(regex, '');
        if (phone.includes(filterStr)) {
          return true;
        }
        return false;
      })
      .sort((a: Contact) => {
        // show liber friend in top of list
        if (a.isFriend) {
          return -1;
        }
        return 1;
      });
  }
  return contacts.value;
});
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
  background: $color-white-light;
  border-radius: 13px;
  color: $color-primary-500;
  font-weight: 600;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: -0.0043em;
}

.with-payment-option {
  margin-bottom: 20px;
}
</style>
