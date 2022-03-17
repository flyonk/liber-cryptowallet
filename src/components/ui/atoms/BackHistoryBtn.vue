<template>
  <button
    type="button"
    class="back-btn"
    @click="path === -1 ? $router.go(-1) : $router.push(path)"
  >
    <img
      src="@/assets/images/back-arrow.svg"
      alt="Go back"
      class="back-btn-img"
    />
  </button>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';

const props = defineProps({
  path: {
    type: [String, Object, Number],
    default: -1,
  },
});

const { path } = toRefs(props);
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
