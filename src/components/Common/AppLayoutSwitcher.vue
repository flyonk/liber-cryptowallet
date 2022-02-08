<template>
  <component :is="layout" :class="route?.meta?.class">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed, ComputedRef } from '@vue/reactivity';
import { VueElementConstructor } from 'vue-demi';
import { useRoute } from 'vue-router';

type IComponents = {
  [key: string]: VueElementConstructor;
};

const route = useRoute();

const rc: { keys(): string[]; <T>(id: string): T } = require.context(
  '@/layouts',
  false,
  /.*\.vue$/
);

const layouts: IComponents = rc.keys().reduce<IComponents>(
  (components: IComponents, file: string): IComponents => ({
    ...components,
    [file.replace(/(^.\/)|(\.vue$)/g, '')]: rc<IComponents>(file)?.default,
  }),
  {}
);

const layoutName: ComputedRef<string> = computed(() => {
  let name = route?.meta?.layout;
  if (!name) return 'defaultLayout';
  return `${name}Layout`;
});

const layout: ComputedRef<VueElementConstructor> = computed(
  () => layouts[layoutName.value]
);
</script>
