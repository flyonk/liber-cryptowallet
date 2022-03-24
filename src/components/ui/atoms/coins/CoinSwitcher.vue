<template>
  <div class="coin-switcher cursor-pointer" @click="$emit('switch')">
    <img
      class="pb-3"
      src="@/assets/icon/transactions/reverse_currencies.svg"
      alt="coin-switcher"
    />
  </div>
</template>

<script setup lang="ts">
defineEmits(['switch']);
</script>
