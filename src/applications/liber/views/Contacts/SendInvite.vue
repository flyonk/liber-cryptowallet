<template name="send-invite">
  <t-top-navigation
    with-fixed-footer
    @click:left-icon="$router.push('/contacts')"
  >
    <template #title>Send Invite</template>
    <template #subtitle>
      <p class="userinfo">
        liber.com/@abrahamwatson-xa..
        <img
          :src="`${STATIC_BASE_URL}/static/menu/copy.svg`"
          class="ml-auto"
        /></p
    ></template>
    <template #content>
      <ul class="invite-list">
        <li
          v-for="(contact, index) in newContacts"
          :key="index"
          class="invite-item"
        >
          <m-base-input
            v-model="newContacts[index].name"
            class="m-base-input"
            :type="TypeBaseInput.Text"
          >
            <template #label> Name </template>
          </m-base-input>
          <m-base-input
            v-model="newContacts[index].email"
            class="m-base-input"
            :type="TypeBaseInput.Text"
          >
            <template #label> Email </template>
          </m-base-input>
          <p class="add" @click="addExtraContact">
            <img src="@/assets/icon/blue_plus.svg" class="mr-2" />
            Additional phone or email
          </p>
        </li>
      </ul></template
    >
    <template #fixed-footer>
      <m-base-button class="footer-btn" size="large" :disabled="isBtnDisabled">
        Sent
      </m-base-button>
    </template>
  </t-top-navigation>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue';

import { TTopNavigation } from '@/components/ui';
import { TypeBaseInput } from '@/components/ui/molecules/base-input/types';

import { STATIC_BASE_URL } from '@/constants';
import { uiKitKey } from '@/types/symbols';

const uiKit = inject(uiKitKey);
const { MBaseInput, MBaseButton } = uiKit!;

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
}

const isBtnDisabled = computed(() => {
  let result = false;
  newContacts.value.forEach((i) => {
    if (i.name == '' || i.email === '') result = true;
    return i;
  });
  return result;
});
</script>

<style lang="scss" scoped>
.m-base-input {
  margin: 0 0 16px;
}

.send-invite {
  height: 100vh;
  padding: 60px 16px 0;
  flex-grow: 1;
  overflow: auto;

  > .btn {
    width: 100%;
  }
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

  > .base-input:deep {
    margin-top: 16px;
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
