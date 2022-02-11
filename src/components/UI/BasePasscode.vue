<template>
  <div class="base-passcode">
    <div class="code">
      <div
        v-for="circle in 4"
        :key="circle"
        class="circle-wrapper"
        :class="{ '-active': passcode.length >= circle }"
      />
    </div>

    <div class="controls">
      <div
        class="number-button text--large-title"
        @click="setNumber('1')"
      >
        1
      </div>
      <div
        class="number-button text--large-title"
        @click="setNumber('2')"
      >
        2
      </div>
      <div
        class="number-button text--large-title"
        @click="setNumber('3')"
      >
        3
      </div>
      <div
        class="number-button text--large-title"
        @click="setNumber('4')"
      >
        4
      </div>
      <div
        class="number-button text--large-title"
        @click="setNumber('5')"
      >
        5
      </div>
      <div
        class="number-button text--large-title"
        @click="setNumber('6')"
      >
        6
      </div>
      <div
        class="number-button text--large-title"
        @click="setNumber('7')"
      >
        7
      </div>
      <div
        class="number-button text--large-title"
        @click="setNumber('8')"
      >
        8
      </div>
      <div
        class="number-button text--large-title"
        @click="setNumber('9')"
      >
        9
      </div>
      <div
        class="number-button"
      >
        icon
      </div>
      <div
        class="number-button text--large-title"
        @click="setNumber('0')"
      >
        0
      </div>
      <div
        class="number-button"
        @click="clear"
      >
        clr
      </div>
    </div>

  </div>      
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const passcode = ref('');

const emit = defineEmits(['submit']);

function setNumber(number: string): void {
  if (passcode.value.length < 4) {
    passcode.value = passcode.value + number

    if (passcode.value.length === 4) {
      emit('submit', passcode.value)
    }
  }
}

function clear(): void {
  passcode.value = passcode.value.slice(0, -1);
}

</script>

<style lang="scss" scoped>
.base-passcode {
  > .code {
    display: flex;
    width: 100%;
    justify-content: center;
  }

  > .controls {
    margin-top: 56px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
  }
}

.circle-wrapper {
  width: 16px;
  height: 16px;
  background: $color-grey;
  border-radius: 50%;

  &:not(:last-child) {
    margin-right: 32px;
  }

  &.-active {
    background: $color-primary;
  }
}

.number-button {
  width: 90px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  user-select: none;

  &:active {
    background-color: $color-primary-50;
  }
}
</style>