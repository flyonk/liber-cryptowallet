<template>
  <m-base-bottom-sheet-v
    v-if="showList"
    position="bottom"
    @close="$emit('close')"
  >
    <h1 v-if="title" class="page-title">{{ title }}</h1>
    <div class="country-select-block">
      <div class="grid align-items-center">
        <div class="col-9">
          <a-base-search-input
            v-model="searchQuery"
            @update:model-value="updateSearchQuery"
          />
        </div>
        <div class="col-3 text-right">
          <div class="cancel text--headline" @click="close">
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
            <img :src="country.localPath" alt="" class="img" />
          </div>
          <div class="code col-2">
            {{ country[entity] }}
          </div>
          <div class="title col-7">
            {{ country.name }}
          </div>
          <div class="title col-1">
            <img
              v-if="isSelectedCountry(country)"
              class="icon"
              :src="`${STATIC_BASE_URL}/static/menu/check.svg`"
            />
          </div>
        </div>
      </div>
    </div>
  </m-base-bottom-sheet-v>
</template>

<script lang="ts" setup>
import { computed, ComputedRef, defineAsyncComponent, ref, Ref } from 'vue';
import { PropType } from 'vue-demi';

import { STATIC_BASE_URL } from '@/constants';

import { ICountryInformation } from '@/types/country-phone-types';

const ABaseSearchInput = defineAsyncComponent(() => {
  return import(`@liber-biz/crpw-ui-kit-${process.env.VUE_APP_BRAND}`).then(
    (lib) => lib.ABaseSearchInput
  );
});

const MBaseBottomSheetV = defineAsyncComponent(() => {
  return import(`@liber-biz/crpw-ui-kit-${process.env.VUE_APP_BRAND}`).then(
    (lib) => lib.MBaseBottomSheetV
  );
});

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
  title: {
    type: String,
    default: '',
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

function updateSearchQuery(data: string) {
  searchQuery.value = data;
}
</script>

<style lang="scss" scoped>
.country-select-block {
  padding-top: 16px;

  > div > .text-right > .cancel {
    color: $color-primary;
    cursor: pointer;
    user-select: none;
    margin-right: 10px;
    font-weight: 600;
    font-size: 17px;
    line-height: 22px;
    letter-spacing: -0.0043em;
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

    &:last-child {
      margin-bottom: 50px;
    }
  }
}
</style>
