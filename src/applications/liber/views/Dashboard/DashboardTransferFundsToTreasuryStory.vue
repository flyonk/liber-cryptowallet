<template name="DashboardTransferFundsToTreasuryStory">
  <div class="page-wrapper">
    <t-top-navigation
      left-icon-name="icon-app-navigation-close"
      with-fixed-footer
      @click:left-icon="$router.push({ name: Route.DashboardHome })"
    >
      <template #title>
        <header class="header">
          <img
            class="image"
            src="@/assets/images/euro-coin.svg"
            alt="Euro logo"
          />
          <h1 class="title">
            {{ $t('views.dashboard.transferFundsToTreasury.transfer') }}
          </h1>
        </header></template
      >
      <template #subtitle>
        <div class="description text--body mt-3">
          <p>{{ $t('views.dashboard.transferFundsToTreasury.provide') }}</p>
          <br />
          <p>{{ $t('views.dashboard.transferFundsToTreasury.fees') }}</p>
        </div></template
      >
      <template #content>
        <div class="main">
          <img
            class="image"
            src="@/assets/images/safe.png"
            alt="safe"
            width="200"
            height="200"
          />
          <!-- <div class="label text--body font-bold">
            {{ $t('views.dashboard.transferFundsToTreasury.noAgain') }}
          </div> -->
        </div>
      </template>
      <template #fixed-footer>
        <footer class="footer">
          <div class="label text--body">
            {{ $t('views.dashboard.transferFundsToTreasury.noAgain') }}
          </div>
          <button class="btn text--body">
            {{ $t('views.dashboard.transferFundsToTreasury.liquidity') }}
          </button>
        </footer>
      </template>
    </t-top-navigation>
  </div>
</template>

<script setup lang="ts">
import { TTopNavigation } from '@/components/ui';
import { Route } from '@/router/types';
</script>

<style lang="scss" scoped>
.page-wrapper {
  background: linear-gradient(180deg, #fff9e6 0%, rgb(255 249 230 / 0%) 20%);
}

.description {
  font-weight: normal;
  color: $color-brand-primary;
  width: 295px;
}

.main {
  display: flex;
  flex-direction: column;

  > .image {
    align-self: center;
  }

  > .label {
    margin-top: 10px;
    text-align: center;
    width: 100%;
    color: $color-primary;
  }
}

.footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 20px;

  > .label {
    margin-top: 10px;
    text-align: center;
    width: 100%;
    color: $color-primary;
    margin-bottom: 30px;
  }

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
</style>
