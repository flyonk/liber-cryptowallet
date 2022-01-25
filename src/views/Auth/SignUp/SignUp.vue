<template>
  <div>
    <component
      :is="currentComponent"
      @step="onStep"
    />
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth';
import { SignUp1Step, SignUp2Step } from '@/views/Auth/SignUp/index';
import { computed } from 'vue-demi';

const authStore = useAuthStore();

const step = computed(() => authStore.getState.registrationStep);

const currentComponent = computed(() => {
  switch (step.value) {
    case 1:
      return SignUp1Step;
    case 2:
      return SignUp2Step;
    default:
      return null;
  }
});

function onStep() {
  // if (direction === StepDirection.next) {
  //   this.step += 1;
  // } else {
  //   this.step -= 1;
  // }
  authStore.setStep(2);
}
</script>

<style lang="scss">
.sign-up--container {
  padding: 0 16px;

  .sign-up--description {
    padding-bottom: 24px;
  }

  .sign-button-wrapper {
    position: fixed;
    bottom: 50px;
    left: 16px;
    right: 16px;
  }

  .footer {
    margin-top: 0.5rem;

    .text--footnote {
      color: var(--ion-color-dark-grey);

      .link {
        user-select: none;
        cursor: pointer;
        color: var(--ion-color-ui-primary);
      }
    }
  }
}
</style>
