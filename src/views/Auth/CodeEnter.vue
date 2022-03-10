<template>
  <div class="code-enter">
    <h1>{{ $t('common.codeInput') }}</h1>
    <route-link :to="{ name: 'phone-enter' }">
      {{ $t('common.phoneCta') }}
    </route-link>
  </div>
</template>

<script setup lang="ts">
// TODO: Login, Register and Restore routine
</script>

<style lang="scss" scoped>
//
</style>
