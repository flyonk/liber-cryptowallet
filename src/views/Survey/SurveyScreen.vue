<template>
  <div class="page-wrapper">
    <button
      class="close-page"
      @click="closePage"
    >
      <img
        src="@/assets/images/close-icon.svg"
        alt="close page"
      >
    </button>

    <div v-if="dictionary[activeQuestion]">
      <h1 class="main-title">
        {{ title }}
      </h1>

      <p class="text-default">
        {{ description }}
      </p>

      <div>
        <template
          v-for="answer in dictionary[activeQuestion].answers"
          :key="answer.id"
        >
          <label
            class="radio-btn"
            :class="{ '-selected': answer.isSelected }"
          >
            <input
              :id="answer.id"
              type="radio"
              name="surveyAnswer"
              :value="answer.id"
              style="display: none"
              @change="selectAnswer(answer.id)"
            >
            <span
              class="title"
              :class="{ '-selected': answer.isSelected }"
            >{{ answer.body }}</span>
            <img
              v-if="answer.isSelected"
              src="@/assets/images/arrow-white.svg"
              alt="right arrow"
            >
            <img
              v-else
              src="@/assets/images/arrow.svg"
              alt="right arrow"
            >
          </label>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

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
      body: 'Main reason for using Liber',
    },
    answers: [
      {
        id: 1,
        body: 'Spend or save daily',
      },
      {
        id: 2,
        body: 'Spend while travelling',
      },
      {
        id: 3,
        body: 'Send money',
      },
      {
        id: 4,
        body: 'Gain exposure to financial assets',
      },
    ],
  } as Dictionary,
]);

/**
 * Save user answer to database
 */
const saveAnswers = (answers:Dictionary) => {
  return Promise.resolve(answers)
}

const markAnswerAsSelected = (id: number | string) => {
  dictionary.value[activeQuestion.value].answers = dictionary.value[
    activeQuestion.value
  ].answers.map((item) => {
    if (item.id === id) {
      item.isSelected = true;
    } else {
      item.isSelected = false;
    }
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
    markAnswerAsSelected(id)
    const userAnswers = getSelectedAnswers()
    saveAnswers(userAnswers)
      .then(() => {
        router.push('/')
      })
    return
  }
  markAnswerAsSelected(id);
  activeQuestion.value = Math.min(activeQuestion.value + 1, maxValue);
};

const closePage = () => {
  console.log('close this page')
}

const description = computed(() => {
  return 'We need to know this for regulatory reasons. And also, we are curious!'
})

const title = computed(() => {
  return dictionary.value[activeQuestion.value].question.body
})
</script>

<style lang="scss" scoped>
.close-page {
  border: none;
  padding: 0;
}

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
  color: #0d1f3c;
  margin-bottom: 40px;
}

.radio-btn {
  border: 1px solid #ebecf0;
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
    background-color: $color-blue;
  }

  & > .title {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 21px;
    letter-spacing: -0.0031em;
    color: #0D1F3C;
  }

  & > .title.-selected {
    color: white;
  }
}
</style>
