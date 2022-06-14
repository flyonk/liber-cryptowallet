<template name="CoinItem">
  <li
    :class="{ '-disabled': !available, '-selected': selected }"
    class="coin-item"
  >
    <img :src="icon" alt="" class="image" />
    <p class="title">
      {{ fullName }}
      <span class="sub-title">{{ shortName }}</span>
    </p>
    <i v-if="selected" class="icon-check icon" />
  </li>
</template>

<script lang="ts" setup>
import { ref, toRefs } from 'vue';

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
  selected: {
    type: Boolean,
    default: false,
  },
});

const { fullName, shortName } = toRefs(props);
</script>

<style lang="scss" scoped>
.coin-item {
  display: flex;
  align-items: center;
  padding: 8px;
  cursor: pointer;
  border-radius: 12px;

  &.-disabled {
    opacity: 0.5;
  }

  &.-selected {
    background: $color-light-grey;
  }

  > .image {
    margin-right: 16px;
  }

  > .title {
    font-weight: 500;
    font-size: 17px;
    line-height: 22px;
    letter-spacing: -0.0043em;
  }

  > .icon {
    margin: 0 21px 0 auto;
    font-size: 21px;
    color: $color-primary;
  }
}

.sub-title {
  font-weight: 400;
  color: $color-grey;
  margin-left: 14px;
}
</style>
