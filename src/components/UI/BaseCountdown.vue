<template>
  <div>
    <slot name="countdown" v-bind="diff" />
  </div>
</template>

<script lang="ts" setup>
import { IDifference } from '@/types/base-component';
import { onBeforeMount, defineProps, ref, Ref, onBeforeUnmount } from 'vue';

const getDateDiff = (date1: Date, date2: Date): IDifference => {
  const diff = new Date(date2.getTime() - date1.getTime());
  return {
    year: diff.getUTCFullYear() - 1970,
    month: diff.getUTCMonth(),
    day: diff.getUTCDate() - 1,
    hour: diff.getUTCHours(),
    minute:
      diff.getUTCMinutes() < 10
        ? '0' + diff.getUTCMinutes()
        : diff.getUTCMinutes(),
    second:
      diff.getUTCSeconds() < 10
        ? '0' + diff.getUTCSeconds()
        : diff.getUTCSeconds(),
  };
};

const props = defineProps({
  countdown: {
    type: Number,
    default: 1, // adds 1 minute to current time
  },
});

const emit = defineEmits(['time:up']);

const until = ref(null) as Ref<Date | null>;
const timer = ref(null) as Ref<number | null>;
const diff = ref({}) as Ref<IDifference | Record<string, never>>;

onBeforeMount(() => {
  until.value = new Date(new Date().getTime() + props.countdown * 60000);
  timer.value = setInterval(getDiff, 1000);
});

onBeforeUnmount(() => {
  if (timer.value) clearTimeout(timer.value);
});

function getDiff(): void {
  const now = new Date();

  if (now > (until.value as Date)) {
    clearInterval(timer as unknown as number);

    emit('time:up');
    return;
  }

  diff.value = getDateDiff(now, until.value as Date);
}
</script>
