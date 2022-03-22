<template>
  <div
    class="base-country-phone-input flex align-items-center"
    @click="openSelect"
  >
    <div class="flag">
      <img :src="selectedData?.flag" alt="" class="img" />
    </div>
    <div class="code ml-2 mb-1">
      {{ selectedData?.dialCode }}
    </div>
    <BaseCountryEntitySelect
      entity="dialCode"
      :list="list"
      :selected-data="selectedData"
      :show-list="showList"
      @close="closeSelect"
      @selected="setSelectedCountry"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref, Ref, onBeforeMount } from 'vue';

import { getFullList } from '@/services/country-phone';

import BaseCountryEntitySelect from '@/components/ui/organisms/BaseCountryEntitySelect.vue';

import { ICountryInformation } from '@/types/country-phone-types';

const props = defineProps({
  dialCode: {
    type: String,
    default: '+7',
  },
});

const list = ref([]) as Ref<Array<ICountryInformation>>;
const selectedData = ref(null) as Ref<ICountryInformation | null>;
const showList = ref(false) as Ref<boolean>;

onBeforeMount(async (): Promise<void> => {
  list.value = await getFullList();
  const _selectedCode = list.value.filter((item: any) => {
    return item.dialCode === props.dialCode;
  });

  selectedData.value = _selectedCode.length ? _selectedCode[0] : list.value[0];
  emits('ready', selectedData.value);
});

const emits = defineEmits(['selected', 'ready']);

function setSelectedCountry(country: ICountryInformation): void {
  selectedData.value = country;
  closeSelect();
  emits('selected', selectedData.value);
}

function openSelect() {
  showList.value = true;
}
function closeSelect() {
  console.log('test 2', showList.value);
  showList.value = false;
  console.log('test 3', showList.value);
}
</script>

<style lang="scss" scoped>
.base-country-phone-input {
  border-radius: 12px;
  background: $color-grey-100;
  width: 95px;
  height: 56px;
  padding: 16px;
  user-select: none;
  cursor: pointer;
}

.flag {
  & > .img {
    object-fit: cover;
    border-radius: 50%;
    height: 24px;
    width: 24px;
  }
}
</style>
