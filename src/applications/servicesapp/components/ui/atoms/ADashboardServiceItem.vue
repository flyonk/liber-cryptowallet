<template>
  <li class="service-item">
    <img :src="imageUrl" alt="" class="image" />
    <div class="content-block">
      <h3 class="title">{{ title }}</h3>
      <p class="description">{{ description }}</p>
    </div>
  </li>
</template>

<script lang="ts" setup>
defineEmits(['click', 'close-click']);
defineProps({
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

  > .image {
    width: 40px;
    height: auto;
    margin-right: 15px;
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
