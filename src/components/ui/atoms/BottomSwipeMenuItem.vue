<template>
  <li v-if="showMenuItem" class="menu-item">
    <i class="icon" :class="icon" />
    <p class="text">{{ text }}</p>
  </li>
</template>

<script setup lang="ts">
defineProps({
  showMenuItem: {
    type: Boolean,
    default: true,
  },
  icon: {
    type: String,
    default: 'icon-convert',
  },
  text: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.menu-item {
  display: flex;
  align-items: center;
  margin-bottom: 30px;

  > .icon {
    margin-right: 20px;
    color: $color-primary-500;
    font-size: 40px;
  }

  > .text {
    font-weight: 500;
    font-size: 16px;
    line-height: 21px;
    letter-spacing: -0.0031em;
    color: $color-black;
  }
}
</style>
