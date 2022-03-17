<template name="add-contact">
  <div class="add-contact">
    <div class="header add-header">
      <img
        class="back"
        src="@/assets/icon/arrow-left.svg"
        alt="arrow-left"
        @click="$router.push('/contacts')"
      />
      <h1 class="title">Add a new contact</h1>
    </div>
    <ul class="invite-list">
      <li
        v-for="(contact, index) in newContacts"
        :key="index"
        class="invite-item"
      >
        <BaseInput
          v-model="newContacts[index].name.value"
          autofocus
          type="text"
        >
          <template #label> Name </template>
        </BaseInput>
        <BaseInput v-model="newContacts[index].email.value" type="text">
          <template #label> Email </template>
        </BaseInput>
        <p class="add" @click="addExtraContact">
          <img src="@/assets/icon/blue_plus.svg" class="mr-2" />
          Additional phone or email
        </p>
      </li>
    </ul>
    <BaseButton
      class="btn"
      size="large"
      @click="router.push('/contacts/send/1')"
    >
      Continue
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { BaseButton, BaseInput } from '@/components/ui';

const router = useRouter();

const newContacts = [
  {
    name: ref(''),
    email: ref(''),
  },
];

function addExtraContact() {
  newContacts.push({
    name: ref(''),
    email: ref(''),
  });
}
</script>

<style lang="scss" scoped>
.add-contact {
  height: 100vh;
  padding: 60px 16px 0;
  flex-grow: 1;
  overflow: auto;
}

.add-header {
  margin-bottom: 40px;

  > .back {
    width: 20;
    height: 20;
    margin-bottom: 20px;
  }

  > .title {
    font-weight: 800;
    font-size: 28px;
    line-height: 34px;
    letter-spacing: 0.0038em;
    color: $color-black;
  }
}

.invite-list {
  margin-bottom: 100px;
}

.invite-item {
  > .add {
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 17px;
    line-height: 22px;
    letter-spacing: -0.0043em;
    color: $color-primary-500;
  }
}
</style>
