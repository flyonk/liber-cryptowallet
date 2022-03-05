<template>
  <div
    class="base-country-phone-input flex align-items-center"
    @click="showList = true"
  >
    <div class="flag">
      <img :src="selectedData?.flag" alt="" />
    </div>
    <div class="code ml-2 mb-1">
      {{ selectedData?.dialCode }}
    </div>
    <BaseBottomSheet v-model:visible="showList" position="bottom">
      <div class="country-select-block">
        <div class="grid align-items-center">
          <div class="col-9">
            <BaseSearchInput v-model="searchQuery" />
          </div>
          <div class="col-3 text-right">
            <div class="cancel-button text--headline" @click="showList = false">
              Cancel
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
              {{ country.dialCode }}
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
import { getFullList } from '@/services/country-phone';
import { ICountryInformation } from '@/types/country-phone-types';
import BaseBottomSheet from '@/components/UI/BaseBottomSheet.vue';
import BaseSearchInput from '@/components/UI/BaseSearchInput.vue';

const props = defineProps({
  dialCode: {
    type: String,
    default: '+7',
  },
});

const list = ref([]) as Ref<Array<ICountryInformation>>;
const selectedData = ref(null) as Ref<ICountryInformation | null>;
const showList = ref(false) as Ref<boolean>;
const searchQuery = ref('') as Ref<string>;

const filteredList: ComputedRef<Array<ICountryInformation>> = computed(() => {
  if (searchQuery.value) {
    return list.value.filter(({ name }) =>
      name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  return list.value;
});

onBeforeMount(async (): Promise<void> => {
  list.value = await getFullList();
  const _selectedCode = list.value.filter((item: any) => {
    return item.dialCode === props.dialCode;
  });

  selectedData.value = _selectedCode.length ? _selectedCode[0] : list.value[0];
  emits('ready', selectedData.value);
});

const emits = defineEmits(['selected', 'ready']);

function isSelectedCountry(country: ICountryInformation): boolean {
  return selectedData.value?.name === country.name;
}

function setSelectedCountry(country: ICountryInformation): void {
  selectedData.value = country;
  emits('selected', selectedData.value);
  showList.value = false;
}
</script>

<style lang="scss">
.base-country-phone-input {
  border-radius: 12px;
  background: $color-grey-100;
  width: 95px;
  height: 56px;
  padding: 16px;
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
