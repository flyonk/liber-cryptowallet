<template>
  <m-question-with-answers
    :title="dictionary.question.body"
    :answers="dictionary.answers"
    @select="$emit('select', $event)"
  />
</template>

<script lang="ts" setup>
import { defineAsyncComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const MQuestionWithAnswers = defineAsyncComponent(() => {
  return import(`@liber-biz/crpw-ui-kit-${process.env.VUE_APP_BRAND}`).then(
    (lib) => lib.MQuestionWithAnswers
  );
});

const { tm } = useI18n();

export type TDictionaryItem = {
  id: number | string;
  body: string;
  isSelected?: boolean;
  disabled: boolean;
};

export type TDictionary = {
  question: TDictionaryItem;
  answers: TDictionaryItem[];
};

defineEmits(['select']);

const dictionary = ref({
  question: {
    id: 1,
    body: tm('views.deposit.selectNetwork.ensure'),
  },
  answers: [
    {
      id: 1,
      body: tm('views.deposit.selectNetwork.spendOrSave'),
      disabled: true,
    },
    {
      id: 2,
      body: tm('views.deposit.selectNetwork.spendWhileTravelling'),
      disabled: true,
    },
    {
      id: 3,
      body: tm('views.deposit.selectNetwork.sendMoney'),
      disabled: false,
    },
    {
      id: 4,
      body: tm('views.deposit.selectNetwork.gainExposure'),
      disabled: true,
    },
  ],
} as TDictionary);
</script>

<style lang="scss" scoped></style>
