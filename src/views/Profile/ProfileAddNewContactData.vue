<template>
  <t-top-navigation
    v-if="!needToConfirmPhone && !needToConfirmEmail"
    with-fixed-footer
    left-icon-name="icon-app-navigation-back"
    @click:left-icon="
      $router.push({
        name: Route.ProfilePhonesAndEmails,
      })
    "
  >
    <template #title>
      {{ $t('views.profile.profileAddNewContactData.title') }}</template
    >
    <template #content>
      <m-base-input v-model="data" class="m-base-input">
        <template #label> Email or Phone </template>
        <template v-if="data.length > 1" #actions>
          <i class="icon-trash_full" @click="clearData" />
        </template>
      </m-base-input>
    </template>
    <template #fixed-footer
      ><m-base-button
        size="large"
        view="simple"
        block
        :disabled="isDisabled"
        @click="handleAddContactData"
      >
        {{
          $t('views.profile.profileAddNewContactData.confirmButton')
        }}</m-base-button
      ></template
    >
  </t-top-navigation>
  <template v-else-if="needToConfirmPhone">
    <enter-verification-code
      :text="data"
      title="Enter verification code"
      with-countdown
      show-countdown
      @on-prev="needToConfirmPhone = !needToConfirmPhone"
      @on-complete="onComplete"
    ></enter-verification-code>
  </template>
</template>

<script lang="ts" setup>
import { computed, defineAsyncComponent, ref } from 'vue';
import { TTopNavigation, EnterVerificationCode } from '@/components/ui';

import router from '@/router';
import { Route } from '@/router/types';
import { useProfileStore } from '@/stores/profile';

const MBaseButton = defineAsyncComponent(() => {
  return import(`@liber-biz/crpw-ui-kit-${process.env.VUE_APP_BRAND}`).then(
    (lib) => lib.MBaseButton
  );
});

const MBaseInput = defineAsyncComponent(() => {
  return import(`@liber-biz/crpw-ui-kit-${process.env.VUE_APP_BRAND}`).then(
    (lib) => lib.MBaseInput
  );
});

const pStore = useProfileStore();
const data = ref('');
const needToConfirmPhone = ref(false);
const needToConfirmEmail = ref(false);

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

function handleAddContactData() {
  if (isPhone.value) {
    console.log('phone');
    pStore.getUser.additionalPhones?.push(data.value);
    needToConfirmPhone.value = true;
  }
  if (isEmail.value) {
    console.log('email');
    pStore.getUser.additionalEmails?.push(data.value);
    router.push({ name: Route.ConfirmEmail });
  }
}

function clearData() {
  data.value = '';
}

async function onComplete() {
  //TODO: need to implement otp request
  router.push({ name: Route.PhoneVerified });
}
</script>

<style lang="scss" scoped>
.m-base-input {
  margin: 0 0 16px;
}
</style>
