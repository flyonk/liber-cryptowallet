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
      v-if="actionType === EPasscodeActions.store"
      :action-type="actionType"
      @submit="onCreate"
    />

    <base-passcode
      v-if="actionType === EPasscodeActions.compare"
      @submit="onSubmit"
    />
  </div>

  <base-toast
    v-model:visible="showErrorToast"
    severity="error"
  >
    <template #description>
      <div>
        Your passcode doesn't match. Please, try again!
      </div>
    </template>
  </base-toast>
</template>

<script lang="ts" setup>
import { ref, Ref, computed } from 'vue'
import { TopNavigation, BasePasscode, BaseToast } from '@/components/UI';
import { EPasscodeActions } from '@/types/base-component'
import { useRouter } from 'vue-router'

const router = useRouter()

const showErrorToast = ref(false)
const actionType = ref(EPasscodeActions.store) as Ref<EPasscodeActions>

const title = computed(() => {
  switch (actionType.value) {
    case EPasscodeActions.store:
      return 'Create passcode'
    case EPasscodeActions.compare:
      return 'Confirm passcode'
  
    default:
      return 'Create passcode'
  }
})


function onCreate(success:boolean): void {
  if (success) {
    actionType.value = EPasscodeActions.compare
  }
}

function onSubmit(success:boolean): void {
  if (success) {
    router.push({ name: 'configure-app' })
  } else {
    showErrorToast.value = true
  }
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