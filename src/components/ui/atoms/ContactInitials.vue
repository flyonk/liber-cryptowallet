<template>
  <div
    class="initials"
    :style="{
      backgroundColor: color,
    }"
  >
    {{ initials }}
    <i v-if="props.isFriend" class="icon-verification"></i>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { getContactInitials } from '@/helpers/contacts';

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  isFriend: {
    type: Boolean,
    default: false,
  },
});

const initials = computed(() => getContactInitials(props.name));
const letterValue = computed(() =>
  Math.abs(
    16777215 / 2 -
      ((initials.value.charCodeAt(0) || 0) +
        (initials.value.charCodeAt(1) || 0)) *
        113
  )
);
const color = computed(() => `#${Math.floor(letterValue.value).toString(16)}`);
</script>

<style lang="scss" scoped>
.initials {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: $color-yellow-100;
  width: 40px;
  height: 40px;
  color: rgb(255 255 255 / 50%);
  margin-right: 12px;
  position: relative;

  > .icon-verification {
    position: absolute;
    color: $color-green-400;
    right: -3px;
    bottom: -3px;
  }
}
</style>
