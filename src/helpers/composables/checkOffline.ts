import { ref } from 'vue';

export function useCheckOffline() {
  const loading = ref(false);

  function handleReconnect(callback?: () => void) {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      if (!navigator.onLine) return;
      if (callback) callback();
    }, 1500);
  }

  return { loading, handleReconnect };
}
