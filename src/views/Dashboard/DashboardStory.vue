<template name="DashboardStory">
  <div class="dashboard-story">
    <top-navigation
      left-icon-name="icon-app-navigation-close"
      :without-title="true"
      @click:left-icon="$router.push({ name: DashboardHome })"
    />
    <header class="header">
      <img
        class="image"
        src="@/assets/icon/todo/empty-profile.svg"
        alt="story"
      />
      <br />
      <h1 class="title">
        {{ $t('views.dashboard.story.verifyYourIdentity') }}
      </h1>
      <p class="description">{{ $t('views.dashboard.story.requirement') }}</p>
    </header>
    <main class="main">
      <img
        class="image"
        src="@/assets/images/passport_upload.png"
        alt="upload document"
      />
    </main>
    <footer class="footer">
      <button class="btn">
        {{ $t('views.dashboard.story.verifyIdentity') }}
      </button>
    </footer>
  </div>
</template>

<script setup lang="ts">
import TopNavigation from '@/components/ui/molecules/TopNavigation.vue';
import { Route } from '@/router/types';
const { DashboardHome } = Route;
</script>

<style lang="scss" scoped>
.dashboard-story {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 32px 24px;
  background: linear-gradient(
    180deg,
    $color-light-grey 0%,
    rgb(237 240 251 / 0%) 20%
  );

  > .header {
    display: flex;
    flex-direction: column;
    margin-top: 21px;
    margin-bottom: 16px;

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

    > .image {
      padding-left: 10%;
    }
  }

  > .footer {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;

    > .btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 343px;
      height: 48px;
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
