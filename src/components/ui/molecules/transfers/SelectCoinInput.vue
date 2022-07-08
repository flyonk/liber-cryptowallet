<template>
  <div class="select" @click.prevent="showSelectCoinDialog = true">
    <div class="select-option flex">
      <img :src="currentCurrency.img" alt class="icon" />
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
          @click:left-icon="handleCloseModal"
        >
          <template #content>
            <BaseCoinListSelect
              :coins="coins"
              :current-currency="currentCurrency"
              @back-button="showSelectCoinDialog = false"
              @select-coin="handleSelect($event)"
            />
          </template>
        </t-top-navigation>
      </p-dialog>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, ref } from 'vue';

import { ICoin } from '@/applications/liber/models/funds/coin';
import { ICoinForExchange } from '@/applications/liber/stores/funds';
import { STATIC_BASE_URL } from '@/constants';

import { BaseCoinListSelect, TTopNavigation } from '@/components/ui';

const emit = defineEmits(['on-select-coin']);

const showSelectCoinDialog = ref(false);

defineProps({
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

const handleCloseModal = () => {
  showSelectCoinDialog.value = false;
};
</script>

<style lang="scss" scoped>
.select {
  position: absolute;
  right: 4px;
  top: 4px;
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
