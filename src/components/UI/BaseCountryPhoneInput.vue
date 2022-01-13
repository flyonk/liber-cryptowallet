<template>
  <div class="base-country-phone-input">
    Lorem ipsum dolor sit amet.
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

			return {
				phone,
				list
			};
		},

		async created() {
			this.list = await getFullList();
		}
	}
);
</script>

<style scoped>

</style>
