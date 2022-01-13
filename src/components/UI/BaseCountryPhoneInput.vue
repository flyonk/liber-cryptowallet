<template>
  <div class="base-country-phone-input flex align-items-center">
    <div class="flag">
      <img
        :src="selectedData?.flag"
        alt=""
      >
    </div>
    <div class="code ml-2 mb-1">
      {{ selectedData?.dialCode }}
    </div>
  </div>
</template>

<script lang='ts'>
import { getFullList } from '@/services/country-phone';
import { CityInformation } from '@/services/country-phone-types';
import { defineComponent, ref, Ref } from 'vue';

export default defineComponent({
    setup() {
      const list = ref([]) as Ref<Array<CityInformation>>;
      const phone = ref('');
      const selectedData = ref(null) as Ref<CityInformation | null>;

      return {
        phone,
        list,
        selectedData
      };
    },

    async created() {
      this.list = await getFullList();
      this.selectedData = this.list[0];
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

  .flag {
    img {
      object-fit: cover;
      border-radius: 50%;
      height: 24px;
      width: 24px;
    }
  }
}
</style>
