<template>
  <div class="auth-page-container">
    <top-navigation @click:left-icon="prevStep">
      {{ title }}
    </top-navigation>
  </div>
  <div class="page-wrapper">
    <p class="text-default">
      Enhance the security of your account by creating a passcode
    </p>
    
    <base-passcode
      :action-type="actionType"
      @submit="onSubmit"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, Ref } from 'vue'
import { TopNavigation, BasePasscode } from '@/components/UI';
import { EPasscodeActions } from '@/types/base-component'

const title = ref('Create passcode')

const actionType = ref(EPasscodeActions.store) as Ref<EPasscodeActions>

function onSubmit(): void {
  // to to next page
} 

function prevStep(): void {
  // go to previous step
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  margin: 15px;
  flex-grow: 1;
}

.text-default {
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: -0.0043em;
  color: $color-brand-primary;
  margin-bottom: 40px;
}
</style>