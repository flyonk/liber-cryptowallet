<template>
  <div>
    <top-navigation>
      Home address
    </top-navigation>
    <p class="description">
      By law, we need your home address to open your account
    </p>
    <base-input>
      <template #label>
        Street and number
      </template>
    </base-input>
    <base-input>
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
      type="number"
      :use-grouping="false"
    >
      <template #label>
        Postal code
      </template>
    </base-input>
    <base-input>
      <template #label>
        State
      </template>
    </base-input>
    <base-input>
      <template #label>
        City
      </template>
    </base-input>
    <div class="footer">
      <base-button
        block
        @click="$emit('next')"
      >
        Continue
      </base-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TopNavigation, BaseInput, BaseButton } from '@/components/UI';

defineEmits(['next']);
</script>

<style scoped>

</style>