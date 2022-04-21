<template>
  <div class="page-wrapper">
    <top-navigation
      @click:left-icon="$router.push({ name: Route.ProfileSettings })"
    />

    <p class="text-default">
      {{ $t('common.googleAuthenticator') }}
    </p>

    <p class="auth-item" style="margin-bottom: 15px">
      <img
        src="@/assets/brands/ga.png"
        alt="Google Authenticator"
        class="auth-app-icon"
      />
    </p>

    <a href="https://apps.apple.com/lb/app" class="store-link">
      <img
        class="store-link-img"
        src="@/assets/brands/appstore.png"
        alt="App Store"
      />
    </a>
    <a href="https://play.google.com/store/apps" class="store-link">
      <img
        class="store-link-img"
        src="@/assets/brands/googleplay.png"
        alt="Google play"
      />
    </a>
  </div>

  <div style="padding: 15px; padding-bottom: 50px">
    <base-button block @click="$router.push({ name: Route.ConfigureApp })">{{
      $t('common.continueCta')
    }}</base-button>
  </div>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { TopNavigation, BaseButton } from '@/components/ui';
import { Route } from '@/router/types';
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
