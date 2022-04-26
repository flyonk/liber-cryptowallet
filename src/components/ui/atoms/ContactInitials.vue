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
import { getContactInitials } from '@/helpers/contacts';

const props = defineProps({
  name: {
    type: String,
  },
  isFriend: {
    type: Boolean,
    default: false,
  },
});

const initials = getContactInitials(props.name);
const letterValue = Math.abs(
  16777215 / 2 -
    ((initials.charCodeAt(0) || 0) + (initials.charCodeAt(1) || 0)) * 113
);
const color = `#${Math.floor(letterValue).toString(16)}`;
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
