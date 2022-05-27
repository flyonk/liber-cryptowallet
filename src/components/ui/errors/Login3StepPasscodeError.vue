<template>
  <div class="base-toast-footer">
    {{ $t('auth.login.step3FooterTitle') }}
    <router-link :to="{ name: Route.SignUp }" class="link">
      {{ $t('auth.login.step3FooterCta') }}
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { Route } from '@/router/types';
import { RouterLink } from 'vue-router';
</script>

<style lang="scss" scoped></style>
