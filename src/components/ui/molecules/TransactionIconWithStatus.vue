<template>
  <div :style="styles" class="image-block">
    <img :src="pathToImage" alt="" class="image" />
    <img
      v-if="(status !== 'completed' || status !== 'finished') && pathToStatus"
      :src="pathToStatus"
      alt=""
      class="status"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { STATIC_BASE_URL } from '@/constants';

const props = defineProps({
  imgPath: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    default: 'completed',
    validator: (value: string) =>
      ['pending', 'failed', 'finished', 'completed'].includes(value),
  },

  isCurrency: {
    type: Boolean,
    default: false,
  },

  size: {
    type: Number,
    default: 48,
  },
});

const styles = computed(() => ({
  height: `${props.size}px`,
  width: `${props.size}px`,
  minWidth: `${props.size}px`,
  minHeight: `${props.size}px`,
  maxWidth: `${props.size}px`,
  maxHeight: `${props.size}px`,
}));

const pathToImage = computed(() => {
  const directory = props.isCurrency ? 'currencies' : 'transactions';

  return `${STATIC_BASE_URL}/${directory}/${props.imgPath}.svg`;
});

const pathToStatus = computed(() => {
  const mapper = {
    pending: 'pending',
    Pending: 'pending',
    failed: 'reverted',
    Failed: 'reverted',
  };

  if (!mapper[props.status as 'pending' | 'failed']) {
    return null;
  }

  return `${STATIC_BASE_URL}/transactions/statuses/${
    mapper[props.status as 'pending' | 'failed']
  }.svg`;
});
</script>

<style lang="scss">
.image-block {
  position: relative;

  > .image {
    width: 100%;
    height: 100%;
  }

  > .status {
    position: absolute;
    right: 0;
    bottom: 0;
  }
}
</style>
