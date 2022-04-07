<template>
  <component :is="currentComponent.component" v-bind="currentComponent.props" />
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue';

import {
  ETransactionType,
  TConvertTransaction,
} from '@/models/transaction/transaction';

import {
  ConvertTransactionItem,
  DepositTransactionItem,
} from '@/components/ui/molecules/TransactionListItem/index';

const props = defineProps({
  icon: {
    type: String,
    default: '',
  },
  sum: {
    type: String,
    default: '',
  },
  info: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    default: '',
  },
  code: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: '',
  },
  to: {
    type: Object as PropType<TConvertTransaction>,
    default: () => ({} as TConvertTransaction),
  },
  from: {
    type: Object as PropType<TConvertTransaction>,
    default: () => ({} as TConvertTransaction),
  },
});

const currentComponent = computed(() => {
  switch (props.type) {
    case ETransactionType.convert:
      return {
        component: ConvertTransactionItem,
        props: {
          icon: props.icon,
          to: props.to,
          from: props.from,
        },
      };
    default:
      return {
        component: DepositTransactionItem,
        props,
      };
  }
});
</script>

<style lang="scss">
.transaction-list-item {
  display: flex;
  width: 100%;
  margin-bottom: 24px;

  > .icon {
    margin-right: 12px;
    width: 40px;
    height: 40px;
  }

  > .info {
    width: 100%;

    > .flex {
      width: 100%;
      justify-content: space-between;

      > .title {
        font-weight: 500;
        font-size: 16px;
        line-height: 21px;
        letter-spacing: -0.0031em;
        color: $color-black;
      }

      > .subtitle {
        font-size: 13px;
        line-height: 18px;
        letter-spacing: -0.0008em;
        color: $color-dark-grey;
      }

      > .status {
        font-weight: 400;
        font-size: 13px;
        line-height: 18px;
        text-align: right;
        letter-spacing: -0.0008em;
      }
      // TODO:fix linter element rules and create variants from pending and received
      > .pending {
        color: $color-yellow-600;
      }

      > .received {
        color: $color-green-600 !important;
      }

      > .sum {
        font-size: 13px;
        line-height: 18px;
        text-align: right;
        letter-spacing: -0.0008em;
        color: $color-dark-grey;
      }
    }
  }
}
</style>
