<template>
  <div class="page-wrapper">
    <top-navigation
      @click:left-icon="$router.push({ name: Route.ProfileSettings })"
    >
      {{ $t('common.googleAuthenticator') }}
    </top-navigation>

    <div class="content-wrapper">
      <p class="auth-item" style="margin-bottom: 15px">
        <img
          src="@/assets/brands/ga.png"
          alt="Google Authenticator"
          class="auth-app-icon"
        />
      </p>
      <p class="text-default">
        {{ $t('common.googleAuthenticator') }}
      </p>
    </div>
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
  display: flex;
  flex-direction: column;
}

.text-default {
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: -0.0043em;
  color: $color-brand-primary;
  text-align: center;
}

.auth-item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.auth-app-icon {
  max-width: 120px;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
}
</style>
