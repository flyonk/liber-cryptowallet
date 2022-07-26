<template>
  <t-top-navigation with-fixed-footer @click:left-icon="prevStep">
    <template #title> {{ $t('services.getcoupons.title') }}</template>
    <template #content>
      <div class="auth-page-container">
        <base-input
          v-model="email"
          type="email"
          :class="isNotValid ? '-invalid' : ''"
          @focus="showClearBtn"
          @blur="closeClearBtn"
        >
          <template #label> {{ $t('services.getcoupons.email') }} </template>
          <template v-if="isClearBtnShown" #append>
            <i
              class="icon-transaction-small-reverted"
              @click="clearEmail"
              @touchend="clearEmail"
            />
          </template>
          <template v-if="isNotValid" #message>
            {{ $t('services.getcoupons.error') }}
          </template>
        </base-input>
      </div>
    </template>
    <template #fixed-footer>
      <base-button :disabled="isEmailInvalid" block @click="nextStep">
        {{ $t('common.nextStep') }}
      </base-button>
    </template>
  </t-top-navigation>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { computed } from '@vue/reactivity';
import { useRouter } from 'vue-router';

import { useLiberSaveStore } from '@/applications/servicesapp/stores/libersave';

import { ServicesRoutes } from '@/applications/servicesapp/router/types';
import { BaseInput, BaseButton } from '@/components/ui';
import TTopNavigation from '@/components/ui/templates/TTopNavigation.vue';

import { useFundsStore } from '@/applications/servicesapp/stores/funds';

const router = useRouter();
const liberSaveStore = useLiberSaveStore();
const fundsStore = useFundsStore();
fundsStore.$reset();

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
    router.push({
      name: ServicesRoutes.ConvertFunds,
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
.header-nav {
  margin-bottom: 24px;
}
</style>
