<template>
  <m-base-bottom-sheet-v @close="$emit('close')" @expanded="onExpanded">
    <div class="m-base-bottom-sheet-v-wrapper">
      <div class="menu-header">
        <i
          v-show="expanded"
          class="icon icon-app-navigation-close"
          @click.stop="$emit('close')"
        />

        <h4 class="title">
          {{ $t('views.dashboard.home.accounts') }}
        </h4>
        <div class="add" @click="router.push({ name: Route.AccountAdd })">
          +
        </div>
      </div>

      <div v-show="expanded" class="search-bar">
        <a-base-search-input v-model="searchQuery" />
      </div>

      <div class="menu-list">
        <m-all-accounts-fiat-sum
          :title="$t('views.dashboard.home.allAccounts')"
          :currency-code="getSymbolByCode(totalBalance.currency)"
          :sum="totalBalance.sum"
          @select="$emit('select', 'all')"
        />
        <m-base-account
          v-for="(account, index) in filteredList"
          :key="index"
          :data="account"
          @click="$emit('select', account.code)"
        />
      </div>
    </div>
  </m-base-bottom-sheet-v>
</template>

<script lang="ts" setup>
import { computed, ComputedRef, inject, PropType, ref } from 'vue';
import { useRouter } from 'vue-router';

import { getSymbolByCode } from '@/helpers/currency';
import { useAccountStore } from '@/applications/liber/stores/account';
import { IAccount } from '@/models/account/account';
import { Route } from '@/router/types';
import { uiKitKey } from '@/types/symbols';

const uiKit = inject(uiKitKey);
const {
  ABaseSearchInput,
  MAllAccountsFiatSum,
  MBaseAccount,
  MBaseBottomSheetV,
} = uiKit!;

const accountStore = useAccountStore();
const router = useRouter();

defineEmits(['close', 'select']);

const props = defineProps({
  accounts: {
    type: Array as PropType<IAccount[]>,
    required: true,
  },
});

const expanded = ref(false);
const searchQuery = ref('');

const totalBalance = computed(() => accountStore.getTotalBalance);

const onExpanded = (state: boolean) => {
  expanded.value = state;
};

const filteredList: ComputedRef<IAccount[]> = computed(() => {
  if (searchQuery.value && expanded.value) {
    return props.accounts.filter(
      ({ name, code }) =>
        name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        code.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  return props.accounts;
});
</script>

<style lang="scss" scoped>
.m-base-bottom-sheet-v-wrapper {
  height: 350px;
}

.menu-header {
  display: flex;
  align-items: center;
  margin: 24px 0 0;

  > .icon {
    font-size: 24px;
    margin: 0 18px 0 0;
  }

  > .title {
    font-weight: 600;
    font-size: 20px;
    line-height: 25px;
    letter-spacing: -0.0045em;
  }

  > .add {
    margin: 0 0 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $color-white;
    background: $color-primary;
    border-radius: 8px;
    width: 40px;
    height: 40px;
    font-size: 25px;
    padding-bottom: 4px;
    z-index: 5;
  }
}

.menu-list {
  display: flex;
  flex-direction: column;

  > .item {
    display: flex;
    align-items: center;

    &:not(:last-child) {
      margin-bottom: 24px;
    }

    > .image-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 48px;
      height: 48px;
      background: $color-grey-100;
      margin-right: 12px;
      border-radius: 8px;
    }

    > .name {
      font-weight: 500;
      font-size: 16px;
      line-height: 21px;
      letter-spacing: -0.0031em;
    }

    > .price {
      font-weight: 500;
      font-size: 16px;
      line-height: 21px;
      text-align: right;
      letter-spacing: -0.0031em;
      margin-left: auto;
    }
  }
}

.search-bar {
  margin: 24px 0;
}
</style>
