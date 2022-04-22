<template>
  <t-top-navigation
    left-icon-name="icon-app-navigation-close"
    @click:left-icon="closePage"
  >
    <template #title> {{ title }}</template>
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
                :class="{ '-selected': answer.isSelected }"
                class="radio-btn"
              >
                <input
                  :id="answer.id"
                  :value="answer.id"
                  name="surveyAnswer"
                  style="display: none"
                  type="radio"
                  @change="selectAnswer(answer.id)"
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
                <img v-else alt="right arrow" src="@/assets/images/arrow.svg" />
              </label>
            </template>
          </div>
        </div>
      </div>
    </template>
  </t-top-navigation>
</template>

<script lang="ts" setup>
import { TTopNavigation } from '@/components/ui';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { Route } from '@/router/types';

const { tm } = useI18n();

const router = useRouter();

type TAnswerItem = {
  question: string | number;
  answer: string;
};

type dictionaryItem = {
  id: number | string;
  body: string;
  isSelected?: boolean;
};

type Dictionary = {
  question: dictionaryItem;
  answers: dictionaryItem[];
};

let activeQuestion = ref(0);
const dictionary = ref([
  {
    question: {
      id: 1,
      body: tm('views.survey.question'),
    },
    answers: [
      {
        id: 1,
        body: tm('views.survey.spendOrSave'),
      },
      {
        id: 2,
        body: tm('views.survey.spendWhileTravelling'),
      },
      {
        id: 3,
        body: tm('views.survey.sendMoney'),
      },
      {
        id: 4,
        body: tm('views.survey.gainExposure'),
      },
    ],
  } as Dictionary,
]);

/**
 * Save user answer to database
 */
const saveAnswers = (answers: TAnswerItem[]) => {
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

const selectAnswer = (id: number | string) => {
  const maxValue = dictionary.value.length;
  if (maxValue <= activeQuestion.value + 1) {
    markAnswerAsSelected(id);
    const userAnswers = getSelectedAnswers();
    saveAnswers(userAnswers).then(() => {
      router.push({
        name: Route.TwoFAApp,
      });
    });
    return;
  }
  markAnswerAsSelected(id);
  activeQuestion.value = Math.min(activeQuestion.value + 1, maxValue);
};

const closePage = () => {
  router.push({
    name: Route.TwoFAApp,
  });
};

const description = computed(() => {
  return 'We need to know this for regulatory reasons. And also, we are curious!';
});

const title = computed(() => {
  return dictionary.value[activeQuestion.value].question.body;
});
</script>

<style lang="scss" scoped>
.close-page {
  border: none;
  padding: 0;
}

.page-wrapper {
  margin-top: 50px;
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
