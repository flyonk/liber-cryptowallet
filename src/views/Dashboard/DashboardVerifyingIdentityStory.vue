<template name="DashboardVerifyingStory">
  <div class="dashboard-story">
    <div>
      <top-navigation
        left-icon-name="icon-app-navigation-close"
        :without-title="true"
        @click:left-icon="$router.push({ name: Route.DashboardHome })"
      />
    </div>

    <div class="header">
      <img
        class="image"
        src="@/assets/icon/todo/empty-profile.svg"
        alt="story"
      />
      <br />
      <h1 class="title">
        {{ $t('views.dashboard.verifyingIdentity.verifying') }}
      </h1>
      <p class="description">
        {{ $t('views.dashboard.verifyingIdentity.details') }}
      </p>
    </div>
    <div class="main">
      <img
        class="image"
        src="@/assets/images/50-percent-loader.svg"
        alt="50% completed"
      />
    </div>
    <footer class="footer">
      <button class="btn">
        {{ $t('views.dashboard.verifyingIdentity.gotIt') }}
      </button>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Route } from '@/router/types';
import TopNavigation from '@/components/ui/molecules/TopNavigation.vue';
</script>

<style lang="scss" scoped>
.dashboard-story {
  width: 100%;
  height: 100%;
  padding: 32px 24px;
  background: linear-gradient(
    180deg,
    $color-light-grey 0%,
    rgb(237 240 251 / 0%) 20%
  );

  > .header {
    display: flex;
    width: inherit;
    flex-direction: column;
    margin-top: 21px;

    > .close-btn {
      height: 24px;
      width: 24px;
      margin-bottom: 10px;
    }

    > .image {
      height: 64px;
      width: 64px;
    }

    > .title {
      font-weight: 800;
      font-size: 28px;
      line-height: 34px;
      letter-spacing: 0.0038em;
      margin-bottom: 16px;
    }

    > .description {
      font-size: 17px;
      line-height: 22px;
      letter-spacing: -0.0043em;
      margin-bottom: 32px;
    }
  }

  > .main {
    display: flex;
    justify-content: center;
  }

  > .footer {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 25%;

    > .btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 343px;
      height: 48px;
      left: 16px;
      top: 710px;
      background: $color-primary;
      border-radius: 13px;
      color: $color-white;
      font-weight: 600;
      font-size: 17px;
      line-height: 22px;
    }
  }
}
</style>
