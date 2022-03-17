<template>
  <BaseBottomSheetV v-if="showList" position="bottom">
    <div class="country-select-block">
      <div class="grid align-items-center">
        <div class="col-9">
          <BaseSearchInput v-model="searchQuery" />
        </div>
        <div class="col-3 text-right">
          <div class="cancel-button text--headline" @click="close">
            {{ $t('ui.basecountryselect.cancel') }}
          </div>
        </div>
      </div>

      <div class="country-list">
        <div
          v-for="(country, index) in filteredList"
          :key="index"
          :class="{ '-selected': isSelectedCountry(country) }"
          class="item grid align-items-center"
          @click="setSelectedCountry(country)"
        >
          <div class="flag col-2">
            <img :src="country.flag" alt="" class="img" />
          </div>
          <div class="code col-2">
            {{ country[entity] }}
          </div>
          <div class="title col-8">
            {{ country.name }}
          </div>
        </div>
      </div>
    </div>
  </BaseBottomSheetV>
</template>
<script lang="ts" setup>
import { ref, Ref, computed, ComputedRef } from 'vue';
import { PropType } from 'vue-demi';

import BaseBottomSheetV from '@/components/ui/molecules/BaseBottomSheetV.vue';
import BaseSearchInput from '@/components/ui/atoms/BaseSearchInput.vue';

import { ICountryInformation } from '@/types/country-phone-types';

const props = defineProps({
  entity: {
    type: String as PropType<keyof ICountryInformation>,
    required: true,
  },
  list: {
    type: Array as PropType<ICountryInformation[]>,
    default: () => [],
  },
  showList: {
    type: Boolean,
    default: false,
  },
  selectedData: {
    type: Object as PropType<ICountryInformation | null>,
    default: null,
  },
});

const emit = defineEmits(['close', 'selected']);

const searchQuery = ref('') as Ref<string>;

const filteredList: ComputedRef<ICountryInformation[]> = computed(() => {
  if (searchQuery.value) {
    return props.list.filter(({ name }) =>
      name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  return props.list;
});

function isSelectedCountry(country: ICountryInformation): boolean {
  return props.selectedData?.name === country.name;
}

function setSelectedCountry(country: ICountryInformation): void {
  emit('selected', country);
}

function close() {
  emit('close');
}
</script>

<style lang="scss">
.country-select-block {
  padding-top: 16px;

  > .cancel-button {
    color: $color-primary;
    cursor: pointer;
    user-select: none;
  }

  > .country-list {
    margin-top: 20px;

    > .item {
      border-radius: 8px;
      padding: 12px 16px;
      margin-bottom: 8px;
      cursor: pointer;

      &.-selected {
        background: $color-light-grey-300;
      }

      > .flag {
        padding: 0;

        > img {
          object-fit: cover;
          border-radius: 50%;
          height: 40px;
          width: 40px;
        }
      }

      > .code {
        color: $color-dark-grey;
      }
    }
  }
}
</style>
