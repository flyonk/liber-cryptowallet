<template>
  <button type="button" class="back-btn" @click="$router.go(-1)">
    <img
      src="@/assets/images/back-arrow.svg"
      alt="Go back"
      class="back-btn-img"
    />
  </button>
</template>

<script setup lang="ts">
// It can be made by component ...
</script>

<style lang="scss" scoped>
.back-btn {
  border: none;
  padding: 0;
}

.back-btn-img {
  background-color: $color-white;
  height: 16px;
  width: auto;
}
</style>
