<template name="DepositeWallet">
  <t-top-navigation @click:left-icon="router.push({ name: Route.DepositCoin })">
    <template #title>{{ title }}</template>
    <template #subtitle> {{ description }}</template>
    <template #content>
      <div class="page-wrapper">
        <div v-if="dictionary[activeQuestion]">
          <div>
            <template
              v-for="answer in dictionary[activeQuestion].answers"
              :key="answer.id"
            >
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
                  @change="selectAnswer(answer)"
                />
                <span
                  :class="{ '-selected': answer.isSelected }"
                  class="title"
                  >{{ answer.body }}</span
                >
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
      </div>
    </template>
  </t-top-navigation>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

import { Route } from '@/router/types';
import { useDepositStore } from '@/stores/deposit';

import { TTopNavigation } from '@/components/ui';

const { tm } = useI18n();

const router = useRouter();
const depositStore = useDepositStore();

type TDictionaryItem = {
  id: number | string;
  body: string;
  isSelected?: boolean;
  disabled: boolean;
};

type TDictionary = {
  question: TDictionaryItem;
  answers: TDictionaryItem[];
};

let activeQuestion = ref(0);
const dictionary = ref([
  {
    question: {
      id: 1,
      body: tm('views.deposit.selectNetwork.question'),
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
  } as TDictionary,
]);
/**
 * Save user answer to database
 */
const saveAnswers = (answers: TDictionary) => {
  return Promise.resolve(answers);
};

const markAnswerAsSelected = (id: number | string) => {
  dictionary.value[activeQuestion.value].answers = dictionary.value[
    activeQuestion.value
  ].answers.map((item) => {
    item.isSelected = item.id === id;

    return item;
  });
};

const getSelectedAnswers = () => {
  return dictionary.value.map((item) => {
    return {
      question: item.question.id,
      answer: item.answers
        .filter((a) => a.isSelected)
        .map((a) => a.id)
        .join(', '),
    };
  });
};

const selectAnswer = (answer: TDictionaryItem) => {
  if (answer.disabled) return;

  const maxValue = dictionary.value.length;

  depositStore.setNetwork({ value: answer.id, text: answer.body });

  if (maxValue <= activeQuestion.value + 1) {
    markAnswerAsSelected(answer.id);
    const userAnswers = getSelectedAnswers();
    saveAnswers(userAnswers).then(() => {
      //TODO:This path does not exist, you need to clarify the transition
      router.push({ name: Route.DepositAdd });
    });
    return;
  }
  markAnswerAsSelected(answer.id);
  activeQuestion.value = Math.min(activeQuestion.value + 1, maxValue);
};

const description = computed(() => {
  return tm('views.deposit.selectNetwork.ensure');
});

const title = computed(() => {
  return tm('views.deposit.selectNetwork.chooseNetwork');
});
</script>

<style lang="scss" scoped>
.page-wrapper {
  margin: 15px;
}

.main-title {
  font-style: normal;
  font-weight: 800;
  font-size: 28px;
  line-height: 34px;
  letter-spacing: 0.0038em;
  margin-bottom: 10px;
  margin-top: 20px;
}

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
