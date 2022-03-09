<template>
  <div :class="['stories-slider', _hidden, _overlay]">
    <vue-agile
      :options="internalOptions"
      @after-change="detectSlideChangeByUser"
    >
      <slot />
    </vue-agile>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { VueAgile } from 'vue-agile';
import { ISlider } from '@/types/ISlider';

interface IProps {
  options?: ISlider;
  isHidden?: boolean;
  onOverlay?: boolean;
}

const props = defineProps<IProps>();
const emit = defineEmits(['after-change', 'change-by-user']);

//styles
let _hidden = computed<string>(() => (props.isHidden ? '-hidden' : ''));
let _overlay = computed<string>(() => (props.onOverlay ? '-overlay' : ''));

const internalOptions = ref(props.options);
let slideTimeOut = 0;
if (internalOptions.value?.autoplaySpeed) {
  slideTimeOut = internalOptions.value.autoplaySpeed;
}

// type for record event occur time
type TEventTime = {
  event: Event;
  occurTime: number;
};

// buffer with a length of 2 events, for checking the time of occurrence of events
const afterChangeEvents: TEventTime[] = [];

//api for reload autoplay doesnt exist and i used this hack
const updateSlideTime = async () => {
  if (!internalOptions.value) return;
  internalOptions.value.autoplay = false;

  await setTimeout(() => {
    if (!internalOptions.value) return;
    internalOptions.value.autoplay = true;
  }, 0);
};

/*After initializing the slider by default, 
the "after-change" event that occurred in the slider 
is placed in the "afterChangeEvents" list. */
const detectSlideChangeByUser = (event: Event) => {
  const eventTime: TEventTime = {
    event,
    occurTime: Date.now(),
  };

  const isNewAfterChangeEventAppeared = afterChangeEvents.length > 1;

  if (!isNewAfterChangeEventAppeared) {
    afterChangeEvents.push(eventTime);

    const [prevEvent, newEvent] = afterChangeEvents;

    let isMadeByUser = false;

    if (newEvent) {
      isMadeByUser = newEvent.occurTime < prevEvent.occurTime + slideTimeOut;
    }

    if (newEvent && isMadeByUser) {
      emit('change-by-user');
      updateSlideTime();
      return;
    }

    emit('after-change');
  }

  if (isNewAfterChangeEventAppeared) {
    //extracting useless event and adding a new one
    afterChangeEvents.shift();
    afterChangeEvents.push(eventTime);

    const [prevAfterChangeEvent, currAfterChangeEvent] = afterChangeEvents;

    const orderOfMillisecondError = 100;
    const expectedTimeToAutoChangeSlide = Math.floor(
      (prevAfterChangeEvent.occurTime + slideTimeOut) / orderOfMillisecondError
    );
    const newChangeTime = Math.floor(
      currAfterChangeEvent.occurTime / orderOfMillisecondError
    );

    const isNewEventMadeByUser = expectedTimeToAutoChangeSlide > newChangeTime;

    if (!isNewEventMadeByUser) {
      emit('after-change');
      return;
    }

    emit('change-by-user');
    updateSlideTime();
  }
};
</script>

<style lang="scss" scoped>
.stories-slider {
  height: 100%;
  box-sizing: border-box;

  &.-hidden {
    display: none;
  }

  &.-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  > :deep(.agile) {
    display: flex;
    flex-direction: column-reverse;
    height: 100%;

    > .agile__list,
    .agile__slides,
    .agile__slide,
    .agile__track {
      height: 100%;
    }

    > .agile__slide {
      overflow: scroll;
    }

    > .agile__actions {
      background-color: $color-brand-2-800;

      > .agile__dots {
        width: 100%;

        > .agile__dot {
          background-color: $color-dark-grey;
          width: 100%;
          height: auto;
          margin-left: 5px;
          border-radius: 2px;
        }

        > .agile__dot:first-child {
          margin-left: 0;
        }

        > .agile__dot > button {
          display: block;
          width: 100%;
          height: 2px;
          margin: 0;
          cursor: pointer;
          background-color: $color-dark-grey;
          border: none;
          font-size: 0;
          line-height: 0;
          padding: 0;
          transition-duration: 0.3s;
          border-radius: 2px;
        }

        // > .agile__dot:hover,
        > .agile__dot--current > button {
          background-color: $color-white;
          border-radius: 2px;
        }
      }
    }
  }
}
</style>
