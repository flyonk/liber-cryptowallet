<template name="CoinItem">
  <li :class="{ 'coin-disabled': !available }" class="coin-item">
    <img :src="getSrcImage" alt="" class="image" />
    <p class="title">
      {{ fullName }}
      <span class="sub-title">{{ shortName }}</span>
    </p>
  </li>
</template>

<script lang="ts" setup>
import { computed, ref, toRefs } from 'vue';

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
  available: {
    type: Boolean,
    default: true,
  },
});

const { fullName, shortName } = toRefs(props);

const getSrcImage = computed(() => {
  //TODO change to real image from service
  return require(`@/assets/icon/currencies/${fullName?.value.toLowerCase()}.svg`);
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
