<template>
  <div class="dashboard-home">
    <!-- TODO: -->
  </div>
</template>

<script setup lang="ts">
//

import AuthService from '@/services/AuthService';
import { IAuthService } from '@/types/api';

//test new features
const authService: IAuthService = new AuthService();
authService.signIn({ phone: 'test' });
//
</script>

<style lang="scss" scoped>
//
</style>
