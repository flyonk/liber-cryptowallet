<template>
  <div>
    <div
      class="base-country-phone-input flex align-items-center"
      @click="openSelect"
    >
      <div class="flag">
        <img :src="selectedData?.localPath" alt="" class="img" />
      </div>
      <div class="code ml-2 mb-1">
        {{ selectedData?.dialCode }}
      </div>
    </div>
    <BaseCountryEntitySelect
      entity="dialCode"
      :list="list"
      :selected-data="selectedData"
      :show-list="showList"
      @click.stop
      @close="closeSelect"
      @selected="setSelectedCountry"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, Ref, onBeforeMount } from 'vue';

import { getEuropeanList, getFullList } from '@/services/country-phone';

import BaseCountryEntitySelect from '@/components/ui/organisms/BaseCountryEntitySelect.vue';

import { ICountryInformation } from '@/types/country-phone-types';
import { useErrorsStore } from '@/stores/errors';

const errorsStore = useErrorsStore();

const props = defineProps({
  dialCode: {
    type: String,
    default: '+7',
  },
  onlyEuropean: {
    type: Boolean,
    default: () => false,
  },
});

const list = ref([]) as Ref<Array<ICountryInformation>>;
const selectedData = ref(null) as Ref<ICountryInformation | null | undefined>;
const showList = ref(false) as Ref<boolean>;

onBeforeMount(async (): Promise<void> => {
  try {
    list.value = props.onlyEuropean
      ? await getEuropeanList()
      : await getFullList();

    const _selectedCode = list.value.filter((item) => {
      return item.dialCode === props.dialCode;
    });

    const germanyByDefault = list.value.find((e) => e.dialCode === '+49');

    selectedData.value = _selectedCode.length
      ? _selectedCode[0]
      : germanyByDefault;
    emits('ready', selectedData.value);
  } catch (err) {
    errorsStore.handle({
      err,
      name: 'BaseCountryPhoneInput',
      ctx: 'onBeforeMount',
      description: 'Error when getting a list of countries',
    });
  }
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
  showList.value = false;
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
