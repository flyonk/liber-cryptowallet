<template name="AllAccounts">
  <t-top-navigation @click:left-icon="$router.back()">
    <template #title>{{ $t('views.account.allAccounts') }}</template>
    <template #top-right>
      <i
        class="icon-plus_circle add"
        @click="
          $router.push({
            name: Route.AccountAdd,
          })
        "
      />
    </template>
    <template #content>
      <div class="all-accounts">
        <ul class="currencies">
          <li class="item" @click="$router.push({ name: Route.DashboardHome })">
            <img
              class="icon"
              :src="`${STATIC_BASE_URL}/static/currencies/euro.svg`"
            />
            <h4 class="title">{{ totalBalance.currency }}</h4>
            <p class="description">{{ $t('views.account.allAccounts') }}</p>
            <h5 class="sum">
              {{ getSymbolByCode(totalBalance.currency) }}
              {{ totalBalance.sum }}
            </h5>
          </li>
          <template v-if="CRYPTO_CURRENCIES_ENABLED">
            <li
              v-for="(currency, index) in accounts"
              :key="index"
              class="item"
              @click="$router.replace(getCurrencyUrl(currency.code))"
            >
              <img class="icon" :src="currency.imageUrl" />
              <h4 class="title">{{ currency.code.toUpperCase() }}</h4>
              <p class="description">{{ currency.name }}</p>
              <h5 class="sum">{{ currency.balance }}</h5>
            </li>
          </template>
        </ul>
      </div>
    </template>
  </t-top-navigation>
</template>

<script lang="ts" setup>
import { computed, ComputedRef, onMounted } from 'vue';

import { useAccountStore } from '@/applications/liber/stores/account';
import { getSymbolByCode } from '@/helpers/currency';
import { Route } from '@/router/types';
import { IAccount } from '@/models/account/account';
import { TTopNavigation } from '@/components/ui';

import { STATIC_BASE_URL, CRYPTO_CURRENCIES_ENABLED } from '@/constants';

const accountStore = useAccountStore();

onMounted(async () => {
  await Promise.all([
    accountStore.getAccountList(),
    accountStore.getAccountBalance(),
  ]);
});

const accounts = computed(() => accountStore.getAccounts) as ComputedRef<
  IAccount[]
>;
const totalBalance = computed(() => accountStore.getTotalBalance);

function getCurrencyUrl(code: string): string {
  //TODO: define logic with backend
  return code === 'eur' ? Route.DashboardHome : `/${Route.Account}/${code}`;
}
</script>

<style lang="scss" scoped>
.all-accounts {
  height: 100%;
  flex-grow: 1;
  overflow: auto;

  > .title {
    font-weight: 800;
    font-size: 28px;
    line-height: 34px;
    letter-spacing: 0.0038em;
    margin-bottom: 24px;
  }

  > .currencies {
    display: flex;
    flex-wrap: wrap;

    > .item {
      display: flex;
      flex-direction: column;
      margin: 0 7px 7px 0;
      padding: 16px;
      background: $color-light-grey;
      border-radius: 16px;
      height: 164px;
      width: 164px;

      > .icon {
        margin-bottom: 25px;
        height: 28px;
        width: 28px;
        border-radius: 50%;
        background-color: $color-dark-grey;
      }

      > .title {
        font-weight: 600;
        font-size: 16px;
        line-height: 21px;
        letter-spacing: -0.0031em;
        margin-bottom: 1px;
      }

      > .description {
        font-weight: 500;
        font-size: 13px;
        line-height: 18px;
        letter-spacing: -0.0008em;
        margin-bottom: 8px;
        color: $color-brand-300;
      }

      > .sum {
        font-weight: 600;
        font-size: 16px;
        line-height: 21px;
        letter-spacing: -0.0031em;
      }
    }
  }
}

.accounts-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.add {
  font-size: 38px;
  color: blue;
}
</style>