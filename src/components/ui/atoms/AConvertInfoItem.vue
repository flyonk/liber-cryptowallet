<template>
  <li class="fees-item">
    <div class="circle">{{ signIcon }}</div>
    <p class="sum">
      {{ convertInfo }}
      {{ currency }}
    </p>
    <p class="name" :class="{ '-red': isWarning }">{{ title }}</p>
  </li>
</template>

<script lang="ts" setup>
defineProps({
  convertInfo: {
    type: [String, Number],
    default: '',
  },
  currency: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  signIcon: {
    type: String,
    default: '-',
  },
  isWarning: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.fees-item {
  display: flex;
  margin-bottom: 10px;
  margin-left: -10px;

  > .circle {
    background: #eaefff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    margin-right: 10px;
    padding-bottom: 2px;
    font-weight: bold;
    font-size: 14px;
  }

  > .sum {
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    display: flex;
    align-items: center;
    color: $color-brand-550;
    margin-right: 8px;
  }

  > .name {
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    display: flex;
    align-items: center;
    color: $color-brand-2-300;

    &.-red {
      color: $color-red-500;
    }
  }
}
</style>
