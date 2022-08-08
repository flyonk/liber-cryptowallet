import { computed, ref } from 'vue';

export default function useSafeAreaPaddings() {
  const padding = ref({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  });

  const stylePaddings = computed(() => {
    return {
      'padding-top': `${padding.value.top}px`,
      'padding-bottom': `${padding.value.bottom}px`,
      'padding-left': `${padding.value.left}px`,
      'padding-right': `${padding.value.right}px`,
    };
  });

  return { padding, stylePaddings };
}
