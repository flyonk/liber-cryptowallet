<template>
  <ul class="alphabet-list">
    <li
      v-for="(letter, index) in alphabet"
      :key="index"
      class="letter"
      :class="{
        '-active': letter in activeLetters,
      }"
      @click="gotoLetter(letter)"
    >
      {{ letter }}
    </li>
  </ul>
</template>

<script setup lang="ts">
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#';

defineProps({
  activeLetters: {
    type: Object,
    default: () => {
      return {};
    },
  },
});

const gotoLetter = (letter: string) => {
  const element = document.querySelector('#letter' + letter);
  if (element) {
    element.scrollIntoView(true);
  }
};
</script>

<style lang="scss" scoped>
.alphabet-list {
  position: absolute;
  top: 0;
  right: 0;

  & > .letter {
    font-style: normal;
    margin-bottom: 3px;
    font-weight: 500;
    font-size: 13px;
    line-height: 18px;
    text-align: center;
    letter-spacing: -0.0008em;
    color: $color-brand-2-300;
    opacity: 0.2;

    &.-active {
      opacity: 1;
    }
  }
}
</style>
