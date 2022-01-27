<template>
  <div class="base-passcode">
    <div class="main">
      <div
        v-for="circle in 4"
        :key="circle"
        class="circle"
      />
    </div>
    <div class="controllers" />
  </div>      
</template>

<script lang="ts" setup></script>

<style lang="scss">
.base-passcode {
  width: 100%;

  > .main {
    > .circle {
      width: 16px;
      height: 16px;

      :not(:last-child) {
        margin-left: 32px;
      }
    }
  }

  > .controllers {}
}
</style>