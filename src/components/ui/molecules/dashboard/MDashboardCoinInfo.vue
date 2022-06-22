<template>
  <div class="dashboard-coin-info">
    <div class="currencies flex items-center">
      <!--TODO: map currencies-->
      <h1 class="title">
        {{ selectedAccount.code.toUpperCase() }} {{ selectedAccount.balance }}
      </h1>
      <div class="circle-wrap" @click="isMenuOpen = !isMenuOpen">
        <i
          class="down icon-ic16-arrow-down"
          :class="{ '-reverted': isMenuOpen }"
        />
      </div>
      <img
        alt="currency"
        class="ml-auto"
        :src="selectedAccount.imgSrc"
        @click="$emit('click-account')"
      />
    </div>

    <h3 class="heading-gray-md mb-4">
      {{ subtitle }}
    </h3>
    <div v-show="showWelcomeMessage" class="main">
      <h1 class="title">
        {{ $t('views.dashboard.home.getYourCryptoAsset') }}
      </h1>
      <h4 class="description">
        {{ $t('views.dashboard.home.noAssets') }}
        <br />
        {{ $t('views.dashboard.home.depositFirstCoins') }}
      </h4>
    </div>

    <slot name="controllers" />

    <AccountListBottomSheet
      v-if="isMenuOpen"
      :accounts="accounts"
      @close="onCloseMenu"
      @select="onSelectAccount"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType, ref } from 'vue';

import { IAccount } from '@/applications/liber/models/account/account';
import { useI18n } from 'vue-i18n';

import { AccountListBottomSheet } from '@/components/ui';

const { tm } = useI18n();

const emit = defineEmits(['coin-select', 'click-account']);

const props = defineProps({
  showWelcomeMessage: {
    type: Boolean,
    default: false,
  },

  accounts: {
    type: Array as PropType<IAccount[]>,
    required: true,
  },

  selectedAccount: {
    type: Object as PropType<{
      code: '';
      balance: '';
      imgSrc: '';
      baseBalanceConversion: '';
      baseBalanceConversionCode: '';
    }>,
    default: () => ({
      code: '',
      balance: '',
      imgSrc: '',
      baseBalanceConversion: '',
      baseBalanceConversionCode: '',
    }),
  },
});

const isMenuOpen = ref(false);

const onCloseMenu = () => {
  isMenuOpen.value = false;
};

const subtitle = computed(() => {
  if (!props.selectedAccount?.baseBalanceConversion) {
    return tm('views.dashboard.home.allAccounts');
  }

  return `${props.selectedAccount.baseBalanceConversionCode}${props.selectedAccount.baseBalanceConversion}`;
});

const onSelectAccount = (coinCode: string) => {
  emit('coin-select', coinCode);

  onCloseMenu();
};
</script>

<style scoped lang="scss">
.dashboard-coin-info {
  > .currencies {
    display: flex;
    align-items: center;

    > .title {
      margin-right: 8px;
      font-family: Inter, sans-serif;
      font-style: normal;
      font-weight: 600;
      font-size: 28px;
      line-height: 34px;
      letter-spacing: 0.0038em;
      color: $color-black;
    }

    > .circle-wrap {
      border-radius: 50%;
      background: $color-light-grey;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 36px;
      min-height: 36px;
      width: 36px;
      min-width: 36px;

      > .down {
        &.-reverted {
          transform: rotate(180deg);
        }
      }
    }
  }

  > .main {
    margin-bottom: 24px;

    > .title {
      font-weight: 600;
      font-size: 16px;
      line-height: 21px;
      letter-spacing: -0.0031em;
      margin-bottom: 8px;
    }

    > .description {
      font-weight: normal;
      font-size: 13px;
      line-height: 18px;
      letter-spacing: -0.0008em;
    }
  }

  > .controls {
    display: flex;

    > .btn {
      background: $color-brand-2-50;
      color: $color-light-grey-850;
      box-shadow: 0 2px 4px -3px rgb(64 70 105 / 21%);
      border-radius: 8px;
      padding: 0 16px 0 12px;
      font-weight: 600;
      font-size: 13px;
      line-height: 18px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 109px;
      height: 40px;
      margin-right: 8px;

      &.-active {
        background: $color-white;
      }

      &:last-child {
        width: 40px;
        height: 40px;
        margin: 0;
      }
    }
  }
}
</style>
