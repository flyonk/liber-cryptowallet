<template>
  <div>
    <p class="text-default">
      {{ title }}
    </p>

    <div>
      <template v-for="answer in answers" :key="answer.id">
        <label
          :class="{
            '-selected': answer.isSelected,
            '-disabled': answer.disabled,
          }"
          class="radio-btn"
        >
          <input
            :id="answer.id"
            :value="answer.id"
            name="surveyAnswer"
            style="display: none"
            type="radio"
            @change="onChange(answer)"
          />
          <span :class="{ '-selected': answer.isSelected }" class="title">
            {{ answer.body }}
          </span>
          <img
            v-if="answer.isSelected"
            alt="right arrow"
            src="@/assets/images/arrow-white.svg"
          />
          <img
            v-else
            alt="right arrow"
            :src="`${STATIC_BASE_URL}/static/menu/arrow.svg`"
          />
        </label>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { TDictionaryItem } from '@/components/ui/molecules/MNetworkSelectAnswer.vue';
import { STATIC_BASE_URL } from '@/constants';

defineProps({
  title: {
    type: String,
    default: '',
  },
  answers: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['select']);

const onChange = (answer: TDictionaryItem) => {
  if (answer.disabled) return;

  emit('select', answer);
};
</script>

<style lang="scss" scoped>
.text-default {
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: -0.0043em;
  color: $color-brand-primary;
  margin-bottom: 40px;
}

.radio-btn {
  border: 1px solid $color-brand-2-50;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > img {
    width: 20px;
    height: auto;
  }

  &:first-of-type {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  &:last-of-type {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  &.-selected {
    background-color: $color-primary;
  }

  &.-disabled {
    opacity: 0.5;
  }

  & > .title {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 21px;
    letter-spacing: -0.0031em;
    color: $color-brand-primary;
  }

  & > .title.-selected {
    color: $color-white;
  }
}
</style>
