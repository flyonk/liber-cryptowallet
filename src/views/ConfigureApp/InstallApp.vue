<template>
  <div class="page-wrapper">
    <top-navigation @click:left-icon="$router.push({ name: '2fa-app' })">
      Step 1. Install App
    </top-navigation>

    <p class="text-default">
      Install an authenticator app on your mobile device. Recommended options:
    </p>

    <p 
      class="auth-item" 
      style="margin-bottom: 15px;"
    >
      <img
        src="@/assets/brands/ga.png"
        alt="Google Authenticator"
        class="auth-app-icon"
      >
      <span>Google Authenticator</span>
    </p>
    <p 
      class="auth-item" 
      style="margin-bottom: 50px"
    >
      <img
        src="@/assets/brands/ma.svg"
        alt="Microsoft Authenticator"
        class="auth-app-icon"
      >
      <span>Microsoft Authenticator</span>
    </p>

    <a 
      href="https://apps.apple.com/lb/app" 
      class="store-link"
    >
      <img
        class="store-link-img"
        src="@/assets/brands/appstore.png"
        alt="App Store"
      >
    </a>
    <a 
      href="https://play.google.com/store/apps" 
      class="store-link"
    >
      <img
        class="store-link-img"
        src="@/assets/brands/googleplay.png"
        alt="Google play"
      >
    </a>
  </div>
  <div style="padding: 15px">
    <base-button
      block
      @click="$router.push({ name: 'configure-app' })"
    >
      Continue
    </base-button>
  </div>
</template>

<script setup lang="ts">
import { TopNavigation, BaseButton } from '@/components/UI'

</script>

<style lang="scss" scoped>
.page-wrapper {
  margin: 15px;
  flex-grow: 1;
}

.text-default {
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: -0.0043em;
  color: $color-brand-primary;
  margin-bottom: 40px;
}

.store-link {
  display: block;
  max-width: 180px;
  margin-bottom: 20px;
}

.store-link-img {
  vertical-align: top;
  width: 100%;
}

.auth-item {
  display: flex;
  align-items: center;
}

.auth-app-icon {
  max-width: 40px;
  margin-right: 10px;
}
</style>