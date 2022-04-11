<template>
  <div class="header">
    <img
      v-if="props.avatarIcon"
      src="@/assets/images/avatar.png"
      @click="$router.push({ name: props.routeBack })"
    />
    <img
      v-else
      src="@/assets/icon/arrow-left.svg"
      alt="arrow-left"
      @click="$router.push({ name: props.routeBack })"
    />
    <div class="flex">
      <img class="mr-3" src="@/assets/icon/system_qr.svg" alt="circle-add" />
      <i
        class="icon-plus_circle circle-add"
        @click="$router.push({ name: Route.ContactsAddNewContact })"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Route } from '@/router/types';

const props = defineProps({
  avatarIcon: {
    type: Boolean,
    default: false,
  },
  routeBack: {
    type: String,
    default: Route.DashboardHome,
  },
  routeCoin: {
    type: String,
    default: Route.DepositCoin,
  },
});
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
