<template>
  <div class="cta-info">
    <div class="image">
      <slot name="image" />
    </div>
    <div class="content">
      <slot name="content" />
    </div>
    <div class="fixed-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.cta-info {
  display: flex;
  flex-direction: column;
  justify-items: flex-start;
  height: 100vh;

  > .image {
    display: flex;
    justify-content: center;
    margin-top: 50px;
  }

  > .content {
    margin-top: 50px;
  }

  > .fixed-footer {
    position: fixed;
    bottom: 50px;
  }
}
</style>
