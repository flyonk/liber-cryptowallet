<template>
  <div class="communication-menu">
    <p class="cancel" @click="closeMenu">Cancel</p>
    <h2 class="title">Choose main communication channel</h2>
    <ul class="communications-list">
      <li
        v-for="(way, index) in contactCommunicationWays"
        :key="index"
        class="communication-item"
      >
        <div class="send-method">
          <p class="label">
            {{ way.isPhone ? 'Phone' : 'Email' }} {{ index + 1 }}
          </p>
          <h3 class="data">{{ way.number || way }}</h3>
        </div>
        <radio-button />
      </li>
    </ul>
    <BaseButton class="btn mt-auto" size="large" @click="clickHandle">
      Select
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { BaseButton } from '@/components/ui';
import RadioButton from 'primevue/radiobutton';

import { Route } from '@/router/types';
import { useRecipientsStore } from '@/stores/recipients';

const router = useRouter();
const emit = defineEmits(['closeMenu']);

function closeMenu() {
  emit('closeMenu');
}

const recipientsStore = useRecipientsStore();

const contactId = recipientsStore.communicationWayContactId;

const contactCommunicationWays = ref([]);

if (!contactId) {
  emit('closeMenu');
} else {
  const contact = recipientsStore.getContactInfo(contactId);
  const phones = contact?.phoneNumbers.map((item) => {
    item.isPhone = true;
    return item;
  });
  const emails = contact?.emails;
  contactCommunicationWays.value = [...phones, ...emails].filter(
    (item) => !!item
  );
}

const clickHandle = () => {
  router.push({
    name: Route.PayRecipientsLiber,
    params: { id: contactId },
  });
};
</script>

<style lang="scss" scoped>
.communication-menu {
  bottom: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-bottom: 50px;

  > .cancel {
    font-weight: 600;
    font-size: 17px;
    line-height: 22px;
    letter-spacing: -0.0043em;
    color: $color-primary-500;
    margin-bottom: 24px;
  }

  > .title {
    font-weight: 800;
    font-size: 28px;
    line-height: 34px;
    color: $color-black;
    letter-spacing: 0.0038em;
    margin-bottom: 28px;
  }
}

.communication-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid $color-grey-500;
}

.send-method {
  > .label {
    font-weight: 500;
    font-size: 11px;
    line-height: 13px;
    display: flex;
    align-items: center;
    letter-spacing: 0.0006em;
    color: $color-brand-2-300;
  }

  > .data {
    font-weight: 500;
    font-size: 17px;
    line-height: 22px;
    display: flex;
    align-items: center;
    letter-spacing: -0.0043em;
    color: $color-brand-550;
  }
}
</style>
