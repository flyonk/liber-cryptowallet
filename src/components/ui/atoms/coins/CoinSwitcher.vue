<template>
  <div class="coin-switcher cursor-pointer" @click="$emit('switch')">
    <img
      src="@/assets/icon/transactions/reverse_currencies.svg"
      alt="coin-switcher"
    />
  </div>
</template>

<script setup lang="ts">
defineEmits(['switch']);
</script>
