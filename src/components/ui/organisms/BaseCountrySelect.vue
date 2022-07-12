<template>
  <div class="base-country-input flex align-items-center">
    <span class="p-float-label">
      <BaseInput
        v-model="selectedData.name"
        inputmode="none"
        readonly
        @click="openSelect"
      >
        <template #label>{{ $t('ui.basecountryselect.country') }}</template>
      </BaseInput>
    </span>
    <BaseCountryEntitySelect
      entity="isoCode"
      :list="list"
      :selected-data="selectedData"
      :show-list="showList"
      @close="closeSelect"
      @selected="setSelectedCountry"
    />
  </div>
</template>
<script lang="ts" setup>
import { computed, onBeforeMount, ref, Ref, watch } from 'vue';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getEuropeanList, getFullList } from '@/services/country-phone';

import BaseInput from '@/components/ui/molecules/base-input/BaseInput.vue';
import BaseCountryEntitySelect from '@/components/ui/organisms/BaseCountryEntitySelect.vue';

import { ICountryInformation } from '@/types/country-phone-types';

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  preselectedData: {
    type: String,
    required: true,
  },
  onlyEuropean: {
    type: Boolean,
    default: () => false,
  },
});

const emit = defineEmits(['update:modelValue']);

const selectedData = computed({
  get: () => props.modelValue,

  set: (value) => emit('update:modelValue', value),
});

const list = ref([]) as Ref<ICountryInformation[]>;
const showList = ref(false) as Ref<boolean>;

onBeforeMount(async (): Promise<void> => {
  if (props.onlyEuropean) {
    list.value = await getEuropeanList();
    return;
  }
  list.value = await getFullList();
});

watch(
  () => props.preselectedData,
  (value) => {
    if (value) {
      selectedData.value = list.value.find(({ name }) => name === value);
    }
  }
);

function setSelectedCountry(country: ICountryInformation): void {
  selectedData.value = country;
  closeSelect();
}

function openSelect(): void {
  showList.value = true;
}
function closeSelect(): void {
  showList.value = false;
}
</script>

<style lang="scss" scoped>
.base-country-input {
  border-radius: 12px;
  width: 100%;
  height: 56px;
  user-select: none;
  cursor: pointer;
}

.p-float-label {
  width: 100%;
}
</style>
