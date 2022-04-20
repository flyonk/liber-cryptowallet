<template name="DashboardTransferFundsToTreasuryStory">
  <div class="dashboard-story">
    <top-navigation
      left-icon-name="icon-app-navigation-close"
      :without-title="true"
      @click:left-icon="$router.push({ name: Route.DashboardHome })"
    />
    <header class="header">
      <img class="image" src="@/assets/images/euro-coin.svg" alt="Euro logo" />
    </header>
    <main class="main">
      <h1 class="title">
        {{ $t('views.dashboard.transferFundsToTreasury.transfer') }}
      </h1>
      <div class="description">
        <p>{{ $t('views.dashboard.transferFundsToTreasury.provide') }}</p>
        <br />
        <p>{{ $t('views.dashboard.transferFundsToTreasury.fees') }}</p>
      </div>
      <img
        class="image"
        src="@/assets/images/safe.png"
        alt="safe"
        width="200"
        height="200"
      />
      <div class="label">
        {{ $t('views.dashboard.transferFundsToTreasury.noAgain') }}
      </div>
    </main>
    <footer class="footer">
      <button class="btn">
        {{ $t('views.dashboard.transferFundsToTreasury.liquidity') }}
      </button>
    </footer>
  </div>
</template>

<script setup lang="ts">
import TopNavigation from '@/components/ui/molecules/TopNavigation.vue';
import { Route } from '@/router/types';
</script>

<style lang="scss" scoped>
.dashboard-story {
  height: 100%;
  padding: 32px 24px;
  background: linear-gradient(180deg, #fff9e6 0%, rgb(255 249 230 / 0%) 20%);

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
  }

  > .main {
    display: flex;
    flex-direction: column;

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
      font-family: Inter, sans-serif;
      font-style: normal;
      font-weight: normal;
      color: $color-brand-primary;
      width: 295px;
    }

    > .image {
      align-self: center;
    }

    > .label {
      margin-top: 10px;
      text-align: center;
      width: 100%;
      color: $color-primary;
      font-weight: 600;
      font-size: 17px;
      line-height: 22px;
      font-family: Inter, sans-serif;
      font-style: normal;
      letter-spacing: -0.0043em;
    }
  }

  > .footer {
    display: flex;
    justify-content: center;
    margin-top: 20px;

    > .btn {
      text-align: center;
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
