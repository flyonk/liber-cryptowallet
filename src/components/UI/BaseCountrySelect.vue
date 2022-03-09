<template>
  <div class="base-country-input flex align-items-center">
    <span class="p-float-label">
      <base-input v-model="selectedData" @click.self="onClick">
        <template #label>{{ $t('ui.basecountryselect.country') }}</template>
      </base-input>
    </span>
    <BaseBottomSheet v-model:visible="showList" position="bottom">
      <div class="country-select-block">
        <div class="grid align-items-center">
          <div class="col-9">
            <BaseSearchInput v-model="searchQuery" />
          </div>
          <div class="col-3 text-right">
            <div class="cancel-button text--headline" @click="showList = false">
              {{ $t('ui.basecountryselect.cancel') }}
            </div>
          </div>
        </div>

        <div class="country-list">
          <div
            v-for="(country, index) in filteredList"
            :key="index"
            :class="{ selected: isSelectedCountry(country) }"
            class="item grid align-items-center"
            @click="setSelectedCountry(country)"
          >
            <div class="flag col-2">
              <img :src="country.flag" alt="" />
            </div>
            <div class="code col-2">
              {{ country.isoCode }}
            </div>
            <div class="title col-8">
              {{ country.name }}
            </div>
          </div>
        </div>
      </div>
    </BaseBottomSheet>
  </div>
</template>
<script lang="ts" setup>
import { ref, Ref, computed, ComputedRef, onBeforeMount } from 'vue';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getEuropeanList, getFullList } from '@/services/country-phone';
import { ICountryInformation } from '@/types/country-phone-types';
import { BaseBottomSheet, BaseSearchInput, BaseInput } from '.';

const props = defineProps({
  modelValue: {
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
const searchQuery = ref('') as Ref<string>;

const filteredList: ComputedRef<ICountryInformation[]> = computed(() => {
  if (searchQuery.value) {
    return list.value.filter(({ name }) =>
      name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  return list.value;
});

onBeforeMount(async (): Promise<void> => {
  if (props.onlyEuropean) {
    list.value = await getEuropeanList();
    return;
  }
  list.value = await getFullList();
});

function isSelectedCountry(country: ICountryInformation): boolean {
  return selectedData.value === country.name;
}

function setSelectedCountry(country: ICountryInformation): void {
  selectedData.value = country.name;

  showList.value = false;
}

function onClick(): void {
  showList.value = true;
}
</script>

<style lang="scss">
.base-country-input {
  border-radius: 12px;
  width: 100%;
  height: 56px;
  user-select: none;
  cursor: pointer;

  .flag {
    img {
      object-fit: cover;
      border-radius: 50%;
      height: 24px;
      width: 24px;
    }
  }

  .p-float-label {
    width: 100%;
  }
}

.country-select-block {
  padding-top: 16px;

  .cancel-button {
    color: $color-primary;
    cursor: pointer;
    user-select: none;
    user-select: none;
    user-select: none;
    user-select: none;
  }

  .country-list {
    margin-top: 20px;

    .item {
      border-radius: 8px;
      padding: 12px 16px;
      margin-bottom: 8px;
      cursor: pointer;

      &.selected {
        background: $color-light-grey-300;
      }

      .flag {
        padding: 0;

        img {
          object-fit: cover;
          border-radius: 50%;
          height: 40px;
          width: 40px;
        }
      }

      .code {
        color: $color-dark-grey;
      }
    }
  }
}
</style>
