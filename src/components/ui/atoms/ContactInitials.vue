<template>
  <div class="initials">
    {{ getContactInitials(props.name) }}
  </div>
</template>

<script setup lang="ts">
import { getContactInitials } from '@/helpers/contacts';

const props = defineProps({
  name: {
    type: String,
  },
});
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
  color: $color-yellow-700;
  margin-right: 12px;
}
</style>
