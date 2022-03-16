<template>
  <!-- TODO: this is only stub component, need to be styled when layout is ready -->
  <select v-model="locale" @change="changeLang">
    <option v-for="(item, i) in availableLocales" :key="i" :value="item">
      {{ item }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { Storage } from '@capacitor/storage';
import { EStorageKeys } from '@/types/base-component';

const { locale, availableLocales } = useI18n({ useScope: 'global' });

function changeLang(): void {
  Storage.set({
    key: EStorageKeys.language,
    value: locale.value,
  });
}
</script>

<style lang="scss"></style>
