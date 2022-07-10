<template>
  <m-base-bottom-sheet-v
    :top-padding="2"
    :with-header="!expanded"
    class="base-bottom"
    @close="$emit('close')"
    @expanded="onExpanded"
  >
    <div :class="{ '-expanded': expanded }" class="bottom-sheet">
      <div class="menu-header">
        <i v-if="expanded" class="icon ci-close_big" @click="$emit('close')" />

        <h4 class="title">
          {{ $t('views.dashboard.home.accounts') }}
        </h4>
        <div class="add" @click="router.push({ name: Route.AccountAdd })">
          +
        </div>
      </div>

      <div v-if="expanded" class="search-bar">
        <a-base-search-input v-model="searchQuery" />
      </div>

      <div class="menu-list">
        <div class="item" @click="$emit('select', 'all')">
          <div class="image-wrap">
            <img
              :src="`${STATIC_BASE_URL}/static/currencies/all-accounts.svg`"
              alt="all"
            />
          </div>
          <p class="name">
            {{ $t('views.dashboard.home.allAccounts') }}
          </p>
          <p class="price">
            {{ getSymbolByCode(totalBalance.currency) }}
            {{ totalBalance.sum }}
          </p>
        </div>
        <BaseAccount
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
import { computed, ComputedRef, PropType, ref } from 'vue';
import { useRouter } from 'vue-router';

import { getSymbolByCode } from '@/helpers/currency';
import { useAccountStore } from '@/applications/liber/stores/account';
import { IAccount } from '@/models/account/account';
import { Route } from '@/router/types';
import { STATIC_BASE_URL } from '@/constants';
import { ABaseSearchInput } from '@liber-biz/crpw-ui-kit-liber';

import { BaseAccount } from '@/components/ui';
import { MBaseBottomSheetV } from '@liber-biz/crpw-ui-kit-liber';

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

.base-bottom:deep {
  &.-expanded {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
}
</style>
