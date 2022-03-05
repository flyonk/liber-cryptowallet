import { computed, ref } from 'vue';

import { SafeArea } from 'capacitor-plugin-safe-area';

export default function useSafeAreaPaddings() {
  const padding = ref({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  });

  SafeArea.getSafeAreaInsets().then(({ insets }) => {
    Object.assign(padding.value, insets);
    console.debug('safe area', padding.value);
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
