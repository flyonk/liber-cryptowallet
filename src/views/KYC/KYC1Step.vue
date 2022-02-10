<template>
  <div>
    <top-navigation>
      Country of residence
    </top-navigation>
    <p class="description">
      The terms and services which apply to you, will depend on your country of residence
    </p>
    <base-country-select />
  </div>
</template>

<script setup lang="ts">
import { TopNavigation, BaseCountrySelect } from '@/components/UI';

</script>