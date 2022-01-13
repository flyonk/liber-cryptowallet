<template>
  <div class="top-navigation--block">
    <div class="top-navigation--controllers">
      <i class="ci-short_left back--icon" />
    </div>
    <div class="sign-up--title-wrapper text--title-1 font-weight--extra-bold">
      <slot />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent(
  {
    name: 'TopNavigation'
  }
);
</script>

<style lang='scss'>
.top-navigation--block {
  margin-top: 24px;
  margin-bottom: 8px;

  .top-navigation--controllers {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    .back--icon {
      width: 24px;
      height: 24px;
      font-size: 24px;
    }
  }
}
</style>
