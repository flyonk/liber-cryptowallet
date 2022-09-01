<template>
  <div class="contact-tabs flex">
    <router-link
      :to="{ name: props.liberRoute }"
      class="contact-tabs-item"
      :class="{
        'router-link-exact-active': route.name === props.liberRoute,
      }"
    >
      {{ $t('ui.friends.liber') }}
    </router-link>
    <router-link
      v-if="props.allRoute"
      :to="{ name: props.allRoute }"
      class="contact-tabs-item"
      :class="{
        'router-link-exact-active': route.name === props.allRoute,
      }"
    >
      {{ $t('ui.friends.all') }}
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

import { Route } from '@/router/types';

const route = useRoute();

const props = defineProps({
  liberRoute: {
    type: String,
    default: Route.RecipientsLiber,
  },
  allRoute: {
    type: String,
    default: Route.RecipientsPhone,
  },
});
</script>

<style lang="scss" scoped>
.contact-tabs {
  margin-bottom: 24px;
  touch-action: none;
}

.contact-tabs-item {
  white-space: nowrap;
  padding: 11px 16px;
  color: $color-brand-primary;
  margin-right: 8px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 114px;
  height: 40px;
  background: $color-white-light;
  font-weight: 600;
  font-size: 13px;
  line-height: 18px;
  letter-spacing: -0.0008em;
}

.router-link-exact-active {
  background: $color-brand-secondary;
  color: $color-white;
}
</style>
