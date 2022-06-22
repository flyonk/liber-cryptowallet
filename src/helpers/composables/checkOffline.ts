import { ref } from 'vue';

export function useCheckOffline() {
  const loading = ref(false);

  function isOffline(): boolean {
    return !navigator.onLine;
  }

  function handleReconnect(callback?: () => void) {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      if (isOffline()) return;
      if (callback) callback();
    }, 1500);
  }

  return { loading, handleReconnect, isOffline };
}
