<template>
  <div class="header">
    <img
      v-if="props.avatarIcon"
      src="@/assets/images/avatar.png"
      @click="$emit('click:left-icon')"
    />
    <img
      v-else
      :src="`${STATIC_BASE_URL}/static/menu/arrow-left.svg`"
      alt="arrow-left"
      @click="$emit('click:left-icon')"
    />
    <div class="flex">
      <!-- <img
        class="mr-3"
        :src="`${STATIC_BASE_URL}/static/menu/system_qr.svg`"
        alt="circle-add"
      /> -->
      <i
        class="icon-plus_circle circle-add"
        @click="$router.push({ name: Route.RecipientsAdd })"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Route } from '@/router/types';

import { STATIC_BASE_URL } from '@/constants';

const props = defineProps({
  avatarIcon: {
    type: Boolean,
    default: false,
  },
  routeCoin: {
    type: String,
    default: Route.DepositCoin,
  },
});

defineEmits(['click:left-icon']);
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.circle-add {
  font-size: 33px;
  color: blue;
}
</style>
