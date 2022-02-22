<template>
  <div>
    <top-navigation @click:left-icon="$emit('prev')">
      Home address
    </top-navigation>
    <p class="description">
      By law, we need your home address to open your account
    </p>
    <base-input v-model="form.street">
      <template #label>
        Street and number
      </template>
    </base-input>
    <base-input v-model="form.flat">
      <template #append>
        <i
          v-tooltip="'You have new messages.'"
          class="ci-help_circle_outline"
        />
      </template>
      <template #label>
        Flat, suite, unit, building, floor, etc.
      </template>
      <template #message>
        Optional
      </template>
    </base-input>
    <base-input
      v-model="form.postal_code"
      type="number"
      :use-grouping="false"
    >
      <template #label>
        Postal code
      </template>
    </base-input>
    <base-input v-model="form.state">
      <template #label>
        State
      </template>
    </base-input>
    <base-input v-model="form.city">
      <template #label>
        City
      </template>
    </base-input>
    <div class="footer">
      <base-button
        block
        @click="onContinue"
      >
        Continue
      </base-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

import { TopNavigation, BaseInput, BaseButton } from '@/components/UI';

import { useKYCStore } from '@/stores/kyc';

const kycStore = useKYCStore();

const emit = defineEmits(['next', 'prev']);

const form = reactive({
  street: '',
  flat: '',
  postal_code: '',
  state: '',
  city: '',
})

const onContinue = () => {
  kycStore.setData(form);

  emit('next');
}
</script>

<style scoped>

</style>