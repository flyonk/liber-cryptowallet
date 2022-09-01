<template name="DashboardStory">
  <div class="page-wrapper">
    <t-top-navigation
      with-fixed-footer
      left-icon-name="icon-app-navigation-close"
      @click:left-icon="$router.push({ name: DashboardHome })"
    >
      <template #title>
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
        </header>
      </template>
      <template #subtitle>{{
        $t('views.dashboard.story.requirement')
      }}</template>
      <template #content
        ><main class="main">
          <img
            class="image"
            src="@/assets/images/passport_upload.png"
            alt="upload document"
          /></main
      ></template>
      <template #fixed-footer>
        <div class="footer">
          <button class="btn">
            {{ $t('views.dashboard.story.verifyIdentity') }}
          </button>
        </div>
      </template>
    </t-top-navigation>
  </div>
</template>

<script setup lang="ts">
import { TTopNavigation } from '@/components/ui';
import { Route } from '@/router/types';
const { DashboardHome } = Route;
</script>

<style lang="scss" scoped>
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

  > .title {
    margin-top: 15px;
  }
}

.main {
  display: flex;
  justify-content: center;

  > .image {
    padding-left: 10%;

    @include iPhoneSE {
      width: 200px;
      height: 200px;
    }
  }
}

.footer {
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
</style>
