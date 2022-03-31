<template>
  <Contacts :show-payment-options="true" :filter="$props.filter" />
</template>

<script setup lang="ts">
import Contacts from '@/components/ui/pages/Contacts.vue';
</script>
