<template>
  <header class="page-header">
    <button
      type="button"
      class="controls"
      @click="$emit('click:left-icon')"
    >
      <i
        class="icon-header"
        :class="leftIconName"
      />
    </button>
    <h1 class="page-title">
      <!-- <<<<<<< HEAD -->

      <!-- ======= -->
      <!-- <slot name="top-right" />
    </div>
    <div class="sign-up--title-wrapper text--title-1 font-weight--extra-bold"> -->
      <!-- >>>>>>> 1b1a0af314038922eda56a62d379e06019b28a9d -->
      <slot />
    </h1>
  </header>
</template>

<script lang="ts" setup>
defineProps({
  leftIconName: {
    type: String,
    default: 'ci-short_left'
  }
})

defineEmits(['click:left-icon'])
</script>

<style lang="scss" scoped>
.page-header {
  margin-top: 24px;
  margin-bottom: 8px;

  & > .controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    background-color: transparent;
  }
}

.icon-header {
  $size: 24px;

  width: $size;
  height: $size;
  font-size: $size;
}

.page-title {
  font-style: normal;
  font-weight: 800;
  font-size: 28px;
  line-height: 34px;
  letter-spacing: 0.0038em;
  margin-bottom: 10px;
  margin-top: 20px;
}
</style>
