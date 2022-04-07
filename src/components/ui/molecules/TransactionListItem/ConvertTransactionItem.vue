<template>
  <div class="transaction-list-item">
    <img :src="icon" class="icon" />
    <div class="info">
      <div class="flex">
        <h1 class="title">
          {{ title }}
        </h1>
        <p>- {{ amounts.from }} {{ fromCode }}</p>
      </div>
      <div class="flex">
        <div class="subtitle">
          {{ subtitle }}
        </div>
        <p class="sum received">+ {{ amounts.to }} {{ toCode }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType, ref } from 'vue';

import { TConvertTransaction } from '@/models/transaction/transaction';

const props = defineProps({
  icon: {
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

const fromCode = ref(props.from.code?.toUpperCase());
const toCode = ref(props.to.code?.toUpperCase());

const title = ref(fromCode.value + '→' + toCode.value);

const subtitle = ref('Converted ' + fromCode.value + ' to ' + toCode.value);

const amounts = ref({
  from: props.from?.amount,
  to: props.to?.amount,
});
</script>
