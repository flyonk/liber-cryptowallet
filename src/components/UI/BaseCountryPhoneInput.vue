<template>
  <div
    class="base-country-phone-input flex align-items-center"
    @click="showList = true"
  >
    <div class="flag">
      <img
        :src="selectedData?.flag"
        alt=""
      >
    </div>
    <div class="code ml-2 mb-1">
      {{ selectedData?.dialCode }}
    </div>
    <BaseBottomSheet
      v-model:visible="showList"
      position="bottom"
    >
      <div class="country-select-block">
        <div class="grid align-items-center">
          <div class="col-9">
            <BaseSearchInput v-model="searchQuery" />
          </div>
          <div class="col-3 text-right">
            <div
              class="cancel-button text--headline"
              @click="showList = false"
            >
              Cancel
            </div>
          </div>
        </div>

        <div class="country-list">
          <div
            v-for="(country, index) in filteredList"
            :key="index"
            :class="{ 'selected': isSelectedCountry(country) }"
            class="item grid align-items-center"
            @click="setSelectedCountry(country)"
          >
            <div class="flag col-2">
              <img
                :src="country.flag"
                alt=""
              >
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

<script lang='ts'>
import { defineComponent, ref, Ref } from 'vue';

import { getFullList } from '@/services/country-phone';
import { CountryInformation } from '@/services/country-phone-types';

import BaseBottomSheet from '@/components/UI/BaseBottomSheet.vue';
import BaseSearchInput from '@/components/UI/BaseSearchInput.vue';

export default defineComponent({
    components: {
      BaseBottomSheet,
      BaseSearchInput
    },

    setup() {
      const list = ref([]) as Ref<Array<CountryInformation>>;
      const phone = ref('');
      const selectedData = ref(null) as Ref<CountryInformation | null>;
      const showList = ref(false) as Ref<boolean>;
      const searchQuery = ref('') as Ref<string>;

      return {
        phone,
        list,
        selectedData,
        showList,
        searchQuery
      };
    },

    computed: {
      filteredList (): Array<CountryInformation> {
        if (this.searchQuery) {
          return this.list.filter(({ name }) => name.toLowerCase().includes(this.searchQuery.toLowerCase()))
        }

        return this.list
      }
    },

    async created() {
      this.list = await getFullList();
      this.selectedData = this.list[0];
    },

    methods: {
      isSelectedCountry(country: CountryInformation): boolean {
        return this.selectedData?.name === country.name;
      },

      setSelectedCountry(country: CountryInformation): void {
        this.selectedData = country;

        this.showList = false;
      }
    }
  }
);
</script>

<style lang='scss'>
.base-country-phone-input {
  border-radius: 12px;
  background: var(--ion-color-input-background);
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
    color: var(--ion-color-ui-primary);
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
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
        background: var(--ion-color-light-grey-300);
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
    }
  }
}
</style>
