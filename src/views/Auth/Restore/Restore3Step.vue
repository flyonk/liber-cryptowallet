<template>
  <div class="auth-page-container">
    <TopNavigation @click:left-icon="prevStep">
      {{ $t('auth.restore.step3Title') }}
    </TopNavigation>
    <div class="description text--body">
      {{ $t('auth.restore.step3Description') }}
    </div>
    <div>
      <m-base-verification-code-input class="input" @complete="onComplete" />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'SignUp',
};
</script>

<script lang="ts" setup>
import { inject } from 'vue';
import { TopNavigation } from '@/components/ui';
import { uiKitKey } from '@/types/symbols';

const uiKit = inject(uiKitKey);
const { MBaseVerificationCodeInput } = uiKit!;

const emit = defineEmits(['next', 'prev']);

// const number = ref(null) as Ref<number | null>;
function prevStep(): void {
  emit('prev');
}

function nextStep(): void {
  emit('next');
}

function onComplete(): void {
  nextStep();
}
</script>

<style lang="scss"></style>
