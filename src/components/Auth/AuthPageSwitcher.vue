<template>
  <div>
    <component :is="currentComponent" />
  </div>
</template>

<script lang="ts" setup>
import { IAuthSteps } from '@/stores/auth';
import { computed, PropType } from 'vue-demi';

import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const props = defineProps({
    scope: {
        type: String as PropType<keyof IAuthSteps>,
        required: true,
    },

    components: {
        type: Array,
        required: true
    }
})

const step = computed(() => authStore.getState.steps[props.scope])

const currentComponent = computed(() => props.components[step.value])

</script>

<style lang="scss">
.auth-page-container {
  padding: 0 16px;

  > .description {
    padding-bottom: 24px;
  }

  > .sign-button-wrapper {
    position: fixed;
    bottom: 50px;
    left: 16px;
    right: 16px;
  }

  .footer {
    margin-top: 0.5rem;

    .text--footnote {
      color: $color-dark-grey;

      .link {
        user-select: none;
        cursor: pointer;
        text-decoration: none;
        color: $color-primary;
      }
    }
  }
}</style>