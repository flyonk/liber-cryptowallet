<template>
  <keep-alive :exclude="['Login2Step', 'SignUp2Step']">
    <component :is="currentComponent" @next="nextStep" @prev="prevStep" />
  </keep-alive>
</template>

<script lang="ts" setup>
import { computed, PropType, watch } from 'vue';

import { IAuthSteps, useAuthStore } from '@/stores/auth';
import { useRoute, useRouter } from 'vue-router';
import { EStepDirection } from '@/types/base-component';

const route = useRoute();
const router = useRouter();

const authStore = useAuthStore();

const props = defineProps({
  scope: {
    type: String as PropType<keyof IAuthSteps>,
    required: true,
  },
  components: {
    type: Array,
    required: true,
  },
});

watch(
  () => route.query.step,
  (step) => {
    if (step) {
      authStore.setStep(+step, props.scope);
      return;
    }

    authStore.setStep(0, props.scope);
  }
);

const step = computed(() => authStore.getState.steps[props.scope]);

const currentComponent = computed(() => props.components[step.value]);

const nextStep = () => {
  authStore.setStep(EStepDirection.next, props.scope);

  router.push({
    path: router.currentRoute.value.path,
    query: {
      step: step.value,
    },
  });
};

const prevStep = () => {
  authStore.setStep(EStepDirection.prev, props.scope);
  if (
    props.scope === 'registration' &&
    authStore.getState.steps.registration === 1
  ) {
    router.push({
      path: router.currentRoute.value.path,
      query: {
        step: 0,
      },
    });

    return;
  }

  if (step.value) {
    router.push({
      path: router.currentRoute.value.path,
      query: {
        step: step.value,
      },
    });
  } else {
    router.push({
      path: router.currentRoute.value.path,
    });
  }
};

// disable for starting not from beginning
// authStore.setStep(0, props.scope);
// router.replace({
//   path: router.currentRoute.value.path,
// });
</script>

<style lang="scss" scoped></style>
