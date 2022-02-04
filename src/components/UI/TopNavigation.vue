<template>
  <div class="top-navigation--block">
    <div class="top-navigation--controllers">
      <i
        class="back--icon"
        :class="leftIconName"
        @click="$emit('click:left-icon')"
      />
    </div>
    <div class="sign-up--title-wrapper text--title-1 font-weight--extra-bold">
      <slot />
    </div>
  </div>
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

<style lang="scss">
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
