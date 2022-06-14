<template>
  <div class="coin-switcher cursor-pointer" @click="$emit('switch')">
    <img
      :src="`${STATIC_BASE_URL}/static/transactions/reverse_currencies.svg`"
      alt="coin-switcher"
    />
  </div>
</template>

<script setup lang="ts">
import { STATIC_BASE_URL } from '@/constants';
defineEmits(['switch']);
</script>
