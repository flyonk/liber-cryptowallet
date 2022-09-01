<template name="DashboardVerifyingStory">
  <div class="page-wrapper">
    <t-top-navigation
      with-fixed-footer
      left-icon-name="icon-app-navigation-close"
      class="mb-4"
      @click:left-icon="$router.push({ name: Route.DashboardHome })"
    >
      <template #title>
        <div class="header mb-4">
          <img
            class="image"
            src="@/assets/icon/todo/empty-profile.svg"
            alt="story"
          />
          <br />
          <h1 class="title">
            {{ $t('views.dashboard.verifyingIdentity.verifying') }}
          </h1>
        </div>
      </template>
      <template #subtitle>
        {{ $t('views.dashboard.verifyingIdentity.details') }}
      </template>
      <template #content>
        <div class="dashboard-story">
          <div class="main">
            <img
              class="image"
              src="@/assets/images/50-percent-loader.svg"
              alt="50% completed"
            />
          </div>
        </div>
      </template>
      <template #fixed-footer>
        <footer class="footer">
          <button class="btn">
            {{ $t('views.dashboard.verifyingIdentity.gotIt') }}
          </button>
        </footer>
      </template>
    </t-top-navigation>
  </div>
</template>

<script setup lang="ts">
import { Route } from '@/router/types';
import { TTopNavigation } from '@/components/ui';
</script>

<style lang="scss" scoped>
.dashboard-story {
  width: 100%;
  height: 100%;

  > .main {
    display: flex;
    justify-content: center;

    > .image {
      width: 70%;

      @include iPhoneSE {
        width: 180px;
      }
    }
  }

  > .footer {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 25%;

    > .btn {
      width: 343px;
      height: 48px;
      background: $color-primary;
      border-radius: 13px;
      color: $color-white;
      font-weight: 600;
      font-size: 17px;
      line-height: 22px;
      margin-top: 50px;
    }
  }
}

.page-wrapper {
  background: linear-gradient(
    180deg,
    $color-light-grey 0%,
    rgb(237 240 251 / 0%) 20%
  );
}

.header {
  > .image {
    height: 64px;
    width: 64px;
  }
}

.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25%;

  > .btn {
    width: 343px;
    height: 48px;
    background: $color-primary;
    border-radius: 13px;
    color: $color-white;
    font-weight: 600;
    font-size: 17px;
    line-height: 22px;
    margin-top: 50px;
  }
}
</style>
