<template>
  <div class="phone-enter">
    <h1>{{ $t('common.phoneInput') }}</h1>
    <route-link :to="{ name: 'code-enter' }">
      {{ $t('common.codeCta') }}
    </route-link>
  </div>
</template>

<script setup lang="ts">
// TODO: Login, Register and Restore routine
</script>

<style lang="scss" scoped>
//
</style>
