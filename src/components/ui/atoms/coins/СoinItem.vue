<template name="CoinItem">
  <li class="coin-item" :class="{ 'coin-disabled': avaliable }">
    <img class="image" :src="getSrcImage" alt="" />
    <p class="title">
      {{ fullName }}
      <span class="sub-title">{{ shortName }}</span>
    </p>
  </li>
</template>

<script setup lang="ts">
import { toRefs, computed, ref } from 'vue';

const props = defineProps({
  icon: {
    type: String,
    default: ref(''),
  },
  fullName: {
    type: String,
    default: ref(''),
  },
  shortName: {
    type: String,
    default: ref(''),
  },
  avaliable: {
    type: Boolean,
    default: true,
  },
});

const { icon, fullName, shortName } = toRefs(props);

const getSrcImage = computed(() => {
  return icon.value;
});
</script>

<style lang="scss" scoped>
.coin-item {
  display: flex;
  align-items: center;
  margin-bottom: 24px;

  > .image {
    margin-right: 16px;
  }

  > .title {
    font-weight: 500;
    font-size: 17px;
    line-height: 22px;
    letter-spacing: -0.0043em;
  }
}

.sub-title {
  color: $color-grey;
  margin-left: 14px;
}

.coin-disabled {
  opacity: 0.5;
}
</style>
