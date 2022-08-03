<template>
  <t-top-navigation with-fixed-footer @click:left-icon="prevStep">
    <template #title> {{ $t('services.getcoupons.title') }}</template>
    <template #content>
      <div class="auth-page-container">
        <m-base-input
          v-model="email"
          type="email"
          :is-error="isNotValid"
          @focus="showClearBtn"
          @blur="closeClearBtn"
        >
          <template #label> {{ $t('services.getcoupons.email') }} </template>
          <template v-if="isClearBtnShown" #actions>
            <img
              class="icon"
              :src="`${STATIC_BASE_URL}/static/menu/circle_close.svg`"
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
      <m-base-button
        :disabled="isEmailInvalid || isNotValid"
        block
        @click="nextStep"
      >
        {{ $t('common.nextStep') }}
      </m-base-button>
    </template>
  </t-top-navigation>
</template>

<script lang="ts" setup>
import { inject, ref, watch } from 'vue';
import { computed } from '@vue/reactivity';
import { useRouter } from 'vue-router';

import { useLiberSaveStore } from '@/applications/servicesapp/stores/libersave';
import { uiKitKey } from '@/types/symbols';

import { ServicesRoutes } from '@/applications/servicesapp/router/types';
import TTopNavigation from '@/components/ui/templates/TTopNavigation.vue';

import { useFundsStore } from '@/applications/servicesapp/stores/funds';
import { STATIC_BASE_URL } from '@/constants';

const uiKit = inject(uiKitKey);
const { MBaseInput, MBaseButton } = uiKit!;

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

:deep(.-error .p-float-label label) {
  color: $color-red-500;
}

:deep(.base-input > .message) {
  color: $color-red-500 !important;
  //styleName: Caption 2/Medium;
  font-size: 11px;
  font-weight: 500 !important;
  line-height: 13px;
  letter-spacing: 0.0006em !important;
}
</style>
