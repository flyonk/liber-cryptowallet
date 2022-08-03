<template>
  <swiper class="swiper" :slides-per-view="2.12" :space-between="8">
    <swiper-slide
      v-for="(item, index) in stories"
      :key="index"
      class="stories-swiper"
      @click="$router.push({ name: item.route })"
    >
      <MStoriesSwiperItem :item="item" />
    </swiper-slide>
  </swiper>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';

import { stories } from './../../../../../tests/mock/dashboardStories';
import MStoriesSwiperItem from '@/components/ui/molecules/MStoriesSwiperItem.vue';
</script>

<style lang="scss" scoped></style>
