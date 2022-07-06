<template>
  <li>
    <router-link
      :to="{
        name: props.routeName,
      }"
      class="service-item"
    >
      <div class="image-container">
        <img :src="imageUrl" alt="" class="image" />
      </div>
      <div class="content-block">
        <h3 class="title">{{ title }}</h3>
        <p class="description">{{ description }}</p>
      </div>
    </router-link>
  </li>
</template>

<script lang="ts" setup>
import { ServicesRoutes } from '@/applications/servicesapp/router/types';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  imageUrl: {
    type: String,
    default: '',
  },
  routeName: {
    type: String,
    default: ServicesRoutes.DashboardHome,
    validator: (value: string) => {
      const keys = Object.values(ServicesRoutes);
      return keys.includes(value);
    },
  },
});
</script>

<style lang="scss" scoped>
.service-item {
  display: flex;
  padding: 20px 20px 25px;
  border: 1px solid $color-light-grey-500;
  box-shadow: 0 4px 12px -8px #404669;
  border-radius: 8px;
  margin-bottom: 8px;
}

.image-container {
  width: 40px;
  height: 40px;
  flex-grow: 0;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  overflow: hidden;
  border-radius: 50%;
  background-color: $color-primary-400;

  > .image {
    width: 24px;
    height: auto;
  }
}

.content-block {
  color: $color-black;

  > .title {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 21px;
    letter-spacing: -0.0031em;
    margin-bottom: 8px;
  }

  > .description {
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
  }
}
</style>
