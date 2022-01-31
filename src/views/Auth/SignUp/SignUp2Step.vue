<template>
  <div class="auth-page-container">
    <TopNavigation @click:left-icon="prevStep">
      Enter the 6-digit code
    </TopNavigation>
    <div class="description text--body">
      To sign up, enter the security code
      <br>
      we’ve sent to ********6123
    </div>
    <div>
      <BaseVerificationCodeInput
        :loading="false"
        class="input"
        @complete="onComplete"
      />
    </div>
    <div class="footer">
      <span class="text--footnote font-weight--semibold">
        <BaseCountdown
          v-if="showCountdown"
          @time:up="onTimeIsUp"
        >
          <template #countdown="{ minute, second }">
            Resend code in {{ minute }}:{{ second }}
          </template>
        </BaseCountdown>
        <template v-else>
          <BaseButton
            class="resend-button"
            size="medium"
            view="flat"
          >
            Resend
          </BaseButton>
        </template>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'SignUp',
}
</script>

<script lang="ts" setup>
import { ref, Ref } from 'vue';
import {
  BaseButton,
  BaseCountdown,
  BaseVerificationCodeInput,
  TopNavigation,
} from '@/components/UI';

const emit = defineEmits(['next', 'prev']);

// const number = ref(null) as Ref<number | null>;
const showCountdown = ref(true) as Ref<boolean>;

function prevStep(): void {
  emit('prev');
}

function nextStep(): void {
  emit('next');
}

function onTimeIsUp(): void {
  showCountdown.value = false;
}

function onComplete(): void {
  nextStep();
}
</script>

<style lang="scss">
.footer {
  .resend-button {
    padding: 0;
  }
}
</style>
