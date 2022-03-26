<template>
  <ul class="alphabet-list">
    <li v-for="(letter, index) in alphabet" :key="index" class="letter">
      {{ letter }}
    </li>
  </ul>
</template>

<script setup lang="ts">
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#';
</script>

<style lang="scss" scoped>
.alphabet-list {
  > .symbol {
    font-style: normal;
    margin-bottom: 3px;
    font-weight: 500;
    font-size: 13px;
    line-height: 18px;
    text-align: center;
    letter-spacing: -0.0008em;
    color: $color-brand-2-300;
  }
}
</style>
