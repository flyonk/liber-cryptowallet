<template name="send-invite">
  <t-top-navigation
    with-fixed-footer
    @click:left-icon="$router.push('/contacts')"
  >
    <template #title>Send Invite</template>
    <template #subtitle>
      <p class="userinfo">
        liber.com/@abrahamwatson-xa..
        <img src="@/assets/icon/copy.svg" class="ml-auto" /></p
    ></template>
    <template #content>
      <ul class="invite-list">
        <li
          v-for="(contact, index) in newContacts"
          :key="index"
          class="invite-item"
        >
          <BaseInput v-model="newContacts[index].name.value" type="text">
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
      </ul></template
    >
    <template #fixed-footer>
      <BaseButton class="footer-btn" size="large" :disabled="isBtnDisabled">
        Sent
      </BaseButton>
    </template>
  </t-top-navigation>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { BaseButton, BaseInput, TTopNavigation } from '@/components/ui';

const newContacts = ref([
  {
    name: '',
    email: '',
  },
]);

function addExtraContact() {
  newContacts.value.push({
    name: '',
    email: '',
  });
  console.log(newContacts);
}

function isBtnDisabled() {
  let result = true;
  newContacts.value.forEach((i) => {
    if (i.name === '' || i.email === '') result = false;
    return i;
  });
  return result;
}
</script>

<style lang="scss" scoped>
.send-invite {
  height: 100vh;
  padding: 60px 16px 0;
  flex-grow: 1;
  overflow: auto;
}

.invite-header {
  margin-bottom: 40px;

  > .userinfo {
    font-weight: 600;
    font-size: 17px;
    line-height: 22px;
    display: flex;
    align-items: center;
    letter-spacing: -0.0043em;
    color: $color-primary-500;
  }

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

.userinfo {
  font-weight: 600;
  font-size: 17px;
  line-height: 22px;
  display: flex;
  align-items: center;
  letter-spacing: -0.0043em;
  color: $color-primary-500;
}

.footer-btn {
  width: 100%;
}
</style>
