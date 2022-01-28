<template name="CoinItem">
  <li class="item">
    <img
			class="img"
			:src="getSrcImage"
			alt=""
    >
    <p class="name">
    	{{ fullName }} <span>{{shortName}}</span>
    </p>
	</li>
</template>

<script setup lang="ts">
import { toRefs, computed } from 'vue';

const props = defineProps({
  icon: {
    type: String
  },
  fullName: {
    type: String
  },
  shortName: {
    type: String
  }
});

const { icon, fullName, shortName } = toRefs(props);

const getSrcImage = computed(() => {
  return icon.value
})
</script>