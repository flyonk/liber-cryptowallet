<template>
  <div class="base-radio-select">
    <div
      v-for="(item, key) in items"
      :key="key"
      class="item-div"
      :class="{ '-disabled': item.disabled }"
    >
      <label class="radio-button">
        <input
          :id="item.value"
          type="radio"
          :value="item"
          name="items"
          style="display: none"
          @change="onEmit(item, 'change')"
        />
        <div class="label" @click="onEmit(item, 'select')">
          <img v-if="item.logo" :src="item.logo" :alt="item.text" />
          <p class="text text--callout font-weight--semibold">
            {{ item.text }}
          </p>
          <i class="ci-chevron_big_right" />
        </div>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IValueItem } from '@/types/base-component';
import { PropType } from 'vue-demi';

defineProps({
  items: {
    type: Array as PropType<IValueItem[]>,
    required: true,
  },
});

const emit = defineEmits(['change', 'select']);

const onEmit = (item: IValueItem, emitType: 'change' | 'select') => {
  if (item.disabled) {
    return;
  }

  emit(emitType, item.value);
};
</script>

<style scoped lang="scss">
.base-radio-select {
  border-radius: 12px;
  border: 1px solid $color-brand-2-50;

  > .item-div {
    user-select: none;

    &.-disabled {
      opacity: 0.5;
    }

    > .radio-button {
      display: flex;
      width: 100%;

      > .label {
        padding: 16px;
        display: flex;
        align-items: center;
        width: 100%;

        > img {
          margin-right: 16px;
        }

        > i {
          margin-left: auto;
        }
      }
    }

    &:not(:last-child) {
      border-bottom: 1px solid $color-brand-2-50;
    }
  }
}
</style>
