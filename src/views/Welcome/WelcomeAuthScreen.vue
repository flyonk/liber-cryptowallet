<template>
  <section class="welcome-auth">
    <div class="slider">
      <stories-slider
        :options="options"
        :is-hidden="false"
        :on-overlay="false"
        @after-change="handleChangeSlideByUser($event)"
      >
        <stories-slider-example-story />
        <stories-slider-example-story />
        <stories-slider-example-story />
        <stories-slider-example-story />
      </stories-slider>
    </div>
  </section>
</template>

<script setup lang="ts">
import StoriesSlider from '@/components/UI/StoriesSlider.vue';
import StoriesSliderExampleStory from '@/components/UI/StoriesSliderExampleStory.vue';
import { ISlider } from '@/types/ISlider';
import { ref } from 'vue';

const options = ref<ISlider>({
  autoplay: true,
  autoplaySpeed: 5000,
  dots: true,
  navButtons: false,
  infinite: true,
});

const slideTimeOut: number = options.value.autoplaySpeed;

type EventTime = {
  event: Event;
  occurTime: number;
};

const afterChangeEvents: EventTime[] = [];

const handleChangeSlideByUser = (event: Event) => {
  const eventTime: EventTime = {
    event,
    occurTime: Date.now(),
  };

  const isAfterChangeEventsFilled = afterChangeEvents.length > 1;

  if (!isAfterChangeEventsFilled) afterChangeEvents.push(eventTime);

  //extracting useless event and adding a new one
  if (isAfterChangeEventsFilled) {
    afterChangeEvents.shift();
    afterChangeEvents.push(eventTime);
  }

  if (isAfterChangeEventsFilled) {
    const [prevAfterChangeEvent, currAfterChangeEvent] = afterChangeEvents;

    const reductionOfMillisecondError = 100;
    const expectedTimeToAutoChangeSlide = Math.floor(
      (prevAfterChangeEvent.occurTime + slideTimeOut) /
        reductionOfMillisecondError
    );
    const newChangeTime = Math.floor(
      currAfterChangeEvent.occurTime / reductionOfMillisecondError
    );

    const isChangeSlideByUser = expectedTimeToAutoChangeSlide > newChangeTime;

    if (!isChangeSlideByUser) {
      options.value.autoplay = true;
      return;
    }

    options.value.autoplay = false;

    // api for reload autoplay doesnt exist and i used this hack
    setTimeout(() => {
      options.value.autoplay = true;
    }, 0);
  }
};
</script>

<style lang="scss" scoped>
.welcome-auth {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100vh;
  overflow: hidden;
  > .slider {
    overflow: scroll;
    height: 100%;
  }
}
</style>