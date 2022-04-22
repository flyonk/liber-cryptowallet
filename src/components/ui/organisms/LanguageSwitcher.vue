<template>
  <BaseCountryEntitySelect
    entity="isoCode"
    :list="list"
    :selected-data="selectedEntity"
    :show-list="true"
    :title="$t('views.profile.profileSettings.selectLanguage')"
    @close="closeSelect"
    @selected="setSelectedCountry"
  />
</template>

<script setup lang="ts">
import { computed, onBeforeMount, Ref, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { set } from '@/helpers/storage';
import { setLocale } from '@/i18n';

import BaseCountryEntitySelect from '@/components/ui/organisms/BaseCountryEntitySelect.vue';

import { EStorageKeys } from '@/types/storage';
import { ICountryInformation } from '@/types/country-phone-types';

const { locale, availableLocales } = useI18n({ useScope: 'global' });

const list = ref([]) as Ref<ICountryInformation[]>;

const emit = defineEmits(['close']);
const selectedEntity = computed(() => {
  return list.value.find(
    (item) => item.isoCode.toLocaleLowerCase() === locale.value.toLowerCase()
  );
});

onBeforeMount(async (): Promise<void> => {
  // TODO: get later from api
  const countries = [
    {
      name: 'Germany',
      isoCode: 'DE',
      localPath: '/img/flags/DE.svg',
    },
    {
      name: 'English',
      isoCode: 'EN',
      localPath: '/img/flags/GB.svg',
    },
  ];
  list.value = countries.filter((item) => {
    return availableLocales.includes(item.isoCode.toLocaleLowerCase());
  });
});

async function setSelectedCountry(country: ICountryInformation): Promise<void> {
  set({ key: EStorageKeys.language, value: country.isoCode });
  await setLocale();
  emit('close');
}

function closeSelect(): void {
  emit('close');
}
</script>

<style lang="scss"></style>
