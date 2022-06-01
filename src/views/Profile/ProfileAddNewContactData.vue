<template>
  <t-top-navigation
    with-fixed-footer
    left-icon-name="icon-app-navigation-back"
    @click:left-icon="
      $router.push({
        name: Route.ProfilePhonesAndEmails,
      })
    "
  >
    <template #title>Add a new contact</template>
    <template #content>
      <base-input v-model="data">
        <template #label> Email or Phone </template>
        <template v-if="data.length > 1" #append>
          <i class="icon-trash_full" @click="clearData" />
        </template>
      </base-input>
    </template>
    <template #fixed-footer
      ><base-button
        size="large"
        view="simple"
        block
        :disabled="isDisabled"
        @click="handleAddContact"
      >
        Confirm Contact</base-button
      ></template
    >
  </t-top-navigation>
</template>

<script lang="ts" setup>
import { TTopNavigation, BaseButton, BaseInput } from '@/components/ui';
import { Route } from '@/router/types';
import { computed, ref } from 'vue';

const data = ref('');

const isDisabled = computed(() => {
  return !isEmail.value && !isPhone.value;
});

const isPhone = computed(() => {
  const correct = new RegExp(/^(\+\d{1,5})(\(? ?\d+\)?)( ?-?\d{1,4}){3,5}$/);
  return correct.test(data.value.toLowerCase());
});

const isEmail = computed(() => {
  const correct = new RegExp(
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

  return correct.test(data.value.toLowerCase());
});

function handleAddContact() {
  if (isPhone.value) console.log('phone');
  if (isEmail.value) console.log('email');
}

function clearData() {
  data.value = '';
}
</script>

<style lang="scss" scoped></style>
