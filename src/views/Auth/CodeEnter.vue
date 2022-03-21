<template>
  <div class="code-enter">
    <h1>{{ $t('common.codeInput') }}</h1>
    <route-link :to="{ name: Route.PhoneEnter }">
      {{ $t('common.phoneCta') }}
    </route-link>
  </div>
</template>

<script setup lang="ts">
import { Route } from '@/router/types';

// TODO: Login, Register and Restore routine
</script>

<style lang="scss" scoped>
//
</style>
