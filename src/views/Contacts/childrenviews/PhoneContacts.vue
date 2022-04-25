<template>
  <Contacts :filter="$props.filter" />
</template>

<script setup lang="ts">
import Contacts from '@/components/ui/pages/ContactsPage.vue';
</script>
