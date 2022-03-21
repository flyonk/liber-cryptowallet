<template>
  <div class="phone-enter">
    <h1>{{ $t('common.phoneInput') }}</h1>
    <route-link :to="{ name: Route.CodeEnter }">
      {{ $t('common.codeCta') }}
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
