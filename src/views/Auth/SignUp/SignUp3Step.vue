<template>
  <div class="auth-page-container">
    <top-navigation
      class="header"
      @click:left-icon="prevStep"
    >
      Sign up to Liber
    </top-navigation>
    <base-input>
      <template #label>
        Email
      </template>
    </base-input>
    <base-switch
      v-model="sendNews"
      class="switch"
    >
      Keep me up to date with Liber news and
      offers
    </base-switch>
    <div class="sign-button-wrapper">
      <base-button @click="$emit('next')">
        Next
      </base-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { TopNavigation, BaseInput, BaseSwitch, BaseButton } from '@/components/UI';

import { ref } from 'vue-demi';

const emit = defineEmits(['prev', 'next']);

const sendNews = ref(false);

function prevStep(): void {
  emit('prev');
}
</script>

<style lang="scss" scoped>
.header {
  margin-bottom: 24px;
}

.switch {
  margin-top: 25px;
}
</style>