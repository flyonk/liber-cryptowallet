<template>
  <li>
    <router-link
      :to="{
        name: props.isNotRoute ? '' : props.routeName,
      }"
      class="item"
    >
      <template
        v-if="$route.matched.some(({ name }) => name === props.routeName)"
      >
        <svg class="svg">
          <use :xlink:href="imgActive" />
        </svg>
        <p class="label -active">
          {{ props.label }}
        </p>
      </template>
      <template v-else>
        <svg class="svg">
          <use :xlink:href="img" />
        </svg>
        <p class="label">
          {{ props.label }}
        </p>
      </template>
    </router-link>
  </li>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  routeName: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  iconSrc: {
    type: String,
    default: require('@/assets/icon/navbar/sprite.svg#home'),
  },
  activeHashTag: {
    type: String,
    default: '',
  },
  hashTag: {
    type: String,
    default: '',
  },
  isNotRoute: {
    type: Boolean,
    default: false,
  },
});

const imgActive = ref(props.iconSrc + '#' + props.activeHashTag);
const img = ref(props.iconSrc + '#' + props.hashTag);
</script>

<style lang="scss" scoped>
.item {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  text-decoration: none;

  > .label {
    text-decoration: none;
    color: $color-brand-2-400;

    &.-active {
      color: $color-primary;
    }
  }

  > .svg {
    width: 24px;
    height: 24px;
    fill: $color-red;
  }
}
</style>
