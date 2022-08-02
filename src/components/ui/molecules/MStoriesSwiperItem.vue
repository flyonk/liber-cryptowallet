<template>
  <div class="swiper-card" :class="[isSimple, isGreen, isYellow]">
    <img :src="item.imgSrc" class="image" alt="Card image" />
    <h4 class="title" :class="[isColorGreen, isColorBlack]">
      {{ item.status }}
    </h4>
    <p class="description">{{ item.description }}</p>
  </div>
</template>

<script setup lang="ts">
import { TDashboardStory } from '@/mock/dashboardStories';
import { computed } from 'vue-demi';

interface IProps {
  item: TDashboardStory;
}

const props = defineProps<IProps>();

const isSimple = computed(() => {
  return props.item.color === 'blue' ? '-simple' : '';
});

const isGreen = computed(() => {
  return props.item.color === 'green' ? '-green' : '';
});

const isYellow = computed(() => {
  return props.item.color === 'yellow' ? '-yellow' : '';
});

const isColorGreen = computed(() => {
  return props.item.text === 'green' ? '-green' : '';
});

const isColorBlack = computed(() => {
  return props.item.text === 'black' ? '-black' : '';
});
</script>

<style lang="scss" scoped>
.swiper-card {
  width: 160px;
  padding: 16px;
  height: 160px;
  border-radius: 16px;
  margin-right: 8px;

  > .image {
    margin-bottom: 20px;
  }

  > .title {
    color: $color-primary;
    font-weight: 800;
    font-size: 10px;
    line-height: 13px;
    margin-bottom: 5px;

    &.-black {
      color: $color-black;
    }

    &.-green {
      color: $color-green-600;
    }
  }

  &.-simple {
    background-color: $color-light-grey;
  }

  &.-green {
    background-color: $color-green-50;
  }

  &.-yellow {
    background-color: $color-yellow-50;
  }
}
</style>
