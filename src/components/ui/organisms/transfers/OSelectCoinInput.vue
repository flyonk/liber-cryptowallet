<template>
  <div class="select" @click.prevent="showSelectCoinDialog = true">
    <div class="select-option flex">
      <!-- Select open button  -->
      <img
        :src="currentCurrency.img"
        :alt="`${currentCurrency.code} icon`"
        class="icon"
      />
      <p class="name">{{ currentCurrency.name }}</p>
      <img
        v-if="showSelectDialog"
        alt="list"
        :src="`${STATIC_BASE_URL}/static/menu/arrow-down.svg`"
      />
      <div></div>
      <p-dialog
        v-if="showSelectDialog"
        v-model:visible="showSelectCoinDialog"
        :show-header="false"
        class="p-dialog-maximized dialog"
        style="padding: 0 !important"
      >
        <t-top-navigation
          left-icon-name="icon-app-navigation-close"
          disable-paddings
          @click:left-icon="handleCloseModal"
        >
          <template #title>
            {{ $t('views.deposit.selectCoin.selectCoin') }}
          </template>
          <template #content>
            <a-base-search-input
              v-model="query"
              :placeholder="$t('ui.basesearchinput.search')"
              @update:model-value="query = $event"
            />
            <br />
            <m-select-coin
              :current-currency="currentCurrency"
              :coins="availableCoins"
              :title="$t('views.deposit.selectCoin.allCoins')"
              :suggested-title="$t('views.deposit.selectCoin.suggested')"
              @select-coin="handleSelect($event)"
            />
          </template>
        </t-top-navigation>
      </p-dialog>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, PropType, ref } from 'vue';

import { ICoin } from '@/applications/liber/models/funds/coin';
import { ICoinForExchange } from '@/applications/liber/stores/funds';
import { STATIC_BASE_URL } from '@/constants';

import { TTopNavigation } from '@/components/ui';
import { uiKitKey } from '@/types/symbols';

const uiKit = inject(uiKitKey);
const { MSelectCoin, ABaseSearchInput } = uiKit!;

const emit = defineEmits(['on-select-coin']);

const showSelectCoinDialog = ref(false);
const query = ref('');

const props = defineProps({
  currentCurrency: {
    type: Object as PropType<ICoinForExchange>,
    default: () => ({} as ICoinForExchange),
  },
  coins: {
    type: Array as PropType<ICoin[]>,
    default: () => [],
  },
  showSelectDialog: {
    type: Boolean,
    default: true,
  },
});

const handleSelect = (coin: ICoin): void => {
  handleCloseModal();

  emit('on-select-coin', coin);
};

const availableCoins = computed(() => {
  return props.coins.filter(
    (coin) =>
      coin.code.toLowerCase().includes(query.value.toLowerCase()) ||
      coin.name.toLowerCase().includes(query.value.toLowerCase())
  );
});

const handleCloseModal = () => {
  showSelectCoinDialog.value = false;
};
</script>

<style lang="scss" scoped>
.select {
  width: 114px;
  height: 64px;
  background: $color-white-light;
  border-radius: 13px;
  border: 0;
}

.select-option {
  display: flex;
  padding: 0 16px;
  align-items: center;
  width: 100%;
  height: 100%;

  > .icon {
    width: 24px;
    height: 24px;
    margin-right: 4px;
  }

  > .name {
    font-weight: 600;
    font-size: 13px;
    line-height: 18px;
    letter-spacing: -0.0008em;
    color: $color-brand-550;
    margin-right: 18px;
  }
}

.p-dialog {
  > .p-dialog-content {
    padding: 0 !important;
  }
}
</style>
