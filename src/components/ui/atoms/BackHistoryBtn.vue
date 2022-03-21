<template>
  <button
    type="button"
    class="back-btn"
    @click="path === -1 ? $router.go(-1) : $router.push(path)"
  >
    <img :src="getIcon()" alt="Go back" class="back-btn-img" />
  </button>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';

const props = defineProps({
  path: {
    type: [String, Object, Number],
    default: -1,
  },
  iconType: {
    type: String,
    default: 'back',
  },
});

const { path } = toRefs(props);

function getIcon() {
  if (props.iconType === 'back') {
    return require('@/assets/images/back-arrow.svg');
  }
  return require('@/assets/images/close-icon.svg');
}
</script>

<style lang="scss" scoped>
.back-btn {
  border: none;
  padding: 0;
  align-self: flex-start;
}

.back-btn-img {
  background-color: $color-white;
  height: 16px;
  width: auto;
}
</style>
