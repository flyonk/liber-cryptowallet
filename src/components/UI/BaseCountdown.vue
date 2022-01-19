<template>
  <div>
    <slot
      name="countdown"
      v-bind="diff"
    />
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, Ref } from 'vue';

export interface Difference {
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number | string,
  second: number | string
}

const getDateDiff = (date1: Date, date2: Date): Difference => {
  const diff = new Date(date2.getTime() - date1.getTime());
  return {
    year: diff.getUTCFullYear() - 1970,
    month: diff.getUTCMonth(),
    day: diff.getUTCDate() - 1,
    hour: diff.getUTCHours(),
    minute: diff.getUTCMinutes() < 10 ? '0' + diff.getUTCMinutes() : diff.getUTCMinutes(),
    second: diff.getUTCSeconds() < 10 ? '0' + diff.getUTCSeconds() : diff.getUTCSeconds()
  };
};
export default defineComponent({
  name: 'BaseCountdown',

  props: {
    countdown: {
      type: Number,
      default: 1 // adds 1 minute to current time
    }
  },

  emits: ['time:up'],

  setup() {
    const diff = ref({}) as Ref<Difference | Record<string, never>>;
    const timer = ref(null) as Ref<number | null>;
    const until = ref(null) as Ref<Date | null>;

    return {
      diff,
      timer,
      until
    };
  },

  created() {
    this.until = new Date(new Date().getTime() + this.countdown * 60000);
    this.timer = setInterval(this.getDiff, 1000);
  },

  beforeUnmount() {
    clearInterval(this.timer as number);
  },

  methods: {
    getDiff(): void {
      const now = new Date();
      const until = this.until as Date;

      if (now > until) {
        clearInterval(this.timer as number);

        this.$emit('time:up');
        return;
      }

      this.diff = getDateDiff(now, until);
    }
  }
});
</script>
