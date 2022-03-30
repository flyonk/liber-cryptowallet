<template>
  <Contacts :showPaymentOptions="true" :filter="$props.filter" />
</template>

<script setup lang="ts">
import Contacts from '@/components/ui/pages/Contacts.vue';
</script>
