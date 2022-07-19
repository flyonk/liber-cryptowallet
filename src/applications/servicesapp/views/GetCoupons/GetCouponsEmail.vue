<template>
  <t-top-navigation with-fixed-footer @click:left-icon="prevStep">
    <template #title> {{ $t('services.getcoupons.title') }}</template>
    <template #content>
      <div class="auth-page-container">
        <m-base-input
          v-model="email"
          class="m-base-input"
          type="email"
          :class="isNotValid ? '-invalid' : ''"
          @focus="showClearBtn"
          @blur="closeClearBtn"
        >
          <template #label> {{ $t('services.getcoupons.email') }} </template>
          <template v-if="isClearBtnShown" #actions>
            <i
              class="icon-transaction-small-reverted"
              @click="clearEmail"
              @touchend="clearEmail"
            />
          </template>
          <template v-if="isNotValid" #message>
            {{ $t('services.getcoupons.error') }}
          </template>
        </m-base-input>
      </div>
    </template>
    <template #fixed-footer>
      <m-base-button :disabled="isEmailInvalid" block @click="nextStep">
        {{ $t('common.nextStep') }}
      </m-base-button>
    </template>
  </t-top-navigation>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, ref, watch } from 'vue';
import { computed } from '@vue/reactivity';
import { useRouter } from 'vue-router';

import { useLiberSaveStore } from '@/applications/servicesapp/stores/libersave';

import { ServicesRoutes } from '@/applications/servicesapp/router/types';
import TTopNavigation from '@/components/ui/templates/TTopNavigation.vue';

const MBaseInput = defineAsyncComponent(() => {
  return import(`@liber-biz/crpw-ui-kit-${process.env.VUE_APP_BRAND}`).then(
    (lib) => lib.MBaseInput
  );
});

const MBaseButton = defineAsyncComponent(() => {
  return import(`@liber-biz/crpw-ui-kit-${process.env.VUE_APP_BRAND}`).then(
    (lib) => lib.MBaseButton
  );
});

const router = useRouter();
const liberSaveStore = useLiberSaveStore();

// @TODO
// clear store with libersave email on created

const email = ref('');
const isClearBtnShown = ref(false);
const isNotValid = ref(false);

const isEmailInvalid = computed(() => {
  if (!email.value) return true;
  // TODO: clarify correct email regex
  email.value = email.value.replace(/\s/g, ''); // for iphone hint word inserting
  const correct = new RegExp(/^[^@\s]+@[^@\s]+\.[^@\s|\d]+$/).test(email.value);

  return !correct;
});

watch(email, () => {
  isNotValid.value = false;
});

const prevStep = () => {
  router.push({
    name: ServicesRoutes.DashboardHome,
  });
};

const nextStep = async () => {
  const res = await liberSaveStore.setEmail(email.value);
  if (res && res === email.value) {
    // Success
    // #TODO go to success route
    router.push({
      name: ServicesRoutes.DashboardHome,
    });
  } else {
    // Erorr
    isNotValid.value = true;
  }
};

const clearEmail = () => {
  email.value = '';
};

const showClearBtn = () => {
  isClearBtnShown.value = true;
};

const closeClearBtn = () => {
  isClearBtnShown.value = false;
};
</script>

<style lang="scss" scoped>
.m-base-input {
  margin: 0 0 16px;
}

.header-nav {
  margin-bottom: 24px;
}
</style>
