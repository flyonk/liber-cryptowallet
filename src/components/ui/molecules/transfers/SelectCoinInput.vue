<template>
  <div class="select" @click.prevent="showSelectCoinDialog[direction] = true">
    <div class="select-option flex">
      <img :src="currentSendCurrency.img" alt class="icon" />
      <p class="name">{{ currentSendCurrency.name }}</p>
      <img alt="list" src="@/assets/icon/arrow-down.svg" />
      <div></div>
      <p-dialog
        v-model:visible="showSelectCoinDialog[direction]"
        :show-header="false"
        class="p-dialog-maximized"
      >
        <TopNavigation
          left-icon-name="icon-app-navigation-close"
          @click:left-icon="handleCloseModal"
        />
        <BaseCoinListSelect
          :direction="direction"
          @back-button="showSelectCoinDialog[direction] = false"
          @select-coin="handleSelect($event)"
        />
      </p-dialog>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, ref } from 'vue';

import { ICoin } from '@/models/coin/coins';
import { ICoinForExchange } from '@/stores/funds';

import { BaseCoinListSelect } from '@/components/ui';
import TopNavigation from '@/components/ui/molecules/TopNavigation.vue';

const emit = defineEmits(['on-select-coin']);

const showSelectCoinDialog = ref({
  from: false,
  to: false,
});

const props = defineProps({
  currentSendCurrency: {
    type: Object as PropType<ICoinForExchange>,
    default: () => ({} as ICoinForExchange),
  },
  direction: {
    type: String as PropType<'from' | 'to'>,
    default: 'from',
  },
});

const handleSelect = (coin: ICoin): void => {
  showSelectCoinDialog.value[props.direction] = false;
  emit('on-select-coin', coin, props.direction);
};

const handleCloseModal = () => {
  showSelectCoinDialog.value[props.direction] = false;
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
</style>
