<template>
  <div class="auth-page-container">
    <TopNavigation @click:left-icon="$emit('prev')"> Name </TopNavigation>
    <div class="description text--body">
      As started on your official ID. We need
      <br />
      your name to verify your identity.
    </div>
    <base-input>
      <template #label> First Name </template>
    </base-input>
    <base-input>
      <template #label> Last Name </template>
    </base-input>
    <div class="sign-button-wrapper">
      <BaseButton block @click="$emit('next')"> Next </BaseButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { TopNavigation, BaseButton, BaseInput } from '@/components/UI';

defineEmits(['next', 'prev']);
</script>
