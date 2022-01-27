<template>
  <div :class="{ filled: filled }" class="base-search-input">
    <span class="p-input-icon-left p-input-icon-right flex align-items-center">
      <i class="ci-search" />
      <PInput
        placeholder="Search"
        type="text"
        v-bind="$attrs"
        @update:model-value="$emit('update:modelValue', $event)"
      />
      <i class="ci-off_close" @click="$emit('update:modelValue', '')" />
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseSearchInput',

  computed: {
    filled() {
      const modelValue = this.$attrs.modelValue as null | number;

      return modelValue != null && modelValue.toString().length > 0;
    },
  },
});
</script>

<script setup lang="ts">
defineEmits(['update:modelValue']);
</script>

<style lang="scss">
.base-search-input {
  .p-inputtext {
    border-color: transparent;
    border-radius: 12px;
    background: var(--ion-color-input-background);
    transition: all 0.5s;
    width: 100%;

    &:enabled {
      &:focus {
        box-shadow: none;
        outline: none;
      }

      &:hover,
      &:focus {
        border-color: var(--ion-color-ui-primary);
        background: #fff;
      }
    }

    &::placeholder {
      font-size: 16px;
      line-height: 21px;
      display: flex;
      align-items: center;
      color: var(--ion-color-dark-grey);
      letter-spacing: -0.0031em;
    }
  }

  i {
    font-size: 24px;

    &.ci-search {
      top: 40%;
    }

    &.ci-off_close {
      font-size: 13px;
      top: 50%;
      display: none;
      cursor: pointer;
    }
  }

  &.filled {
    i.ci-off_close {
      display: block;
    }
  }
}
</style>
