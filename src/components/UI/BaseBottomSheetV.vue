<template>
  <div
    ref="wrapper"
    class="bottom-wrapper"
    :style="wrapperStyle"
    :class="{
      _locked: isMoving
    }"
  >
    <div class="header">
      <div class="indicator" />
    </div>
    <div
      ref="over"
      class="over"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted, Ref, onUnmounted } from 'vue';

const emit = defineEmits(['close']);

const top = ref(null) as Ref<number | null>;
const topPadding = ref(5);
const lastTop = ref(null) as Ref<number | null>;
const overTop = ref(null) as Ref<number | null>;
const overHeight = ref(null) as Ref<number | null>;
const maxHeight = ref(null) as Ref<number | null>;
const initialTouchY = ref(null) as Ref<number | null>;
const initialTopPosition = ref(70) as Ref<number>;
const isMoving = ref(false);
const isOpened = ref(false);

const wrapper = ref(null) as Ref<HTMLElement | null>;
const over = ref(null) as Ref<HTMLElement | null>;

const wrapperStyle = computed(() => {
  return {
    height: maxHeight.value === null ? 'auto' : `${maxHeight.value}px`,
    transform: top.value === null ? 'translateY(100%)' : `translateY(${top.value}%)`
  }
})

onMounted(() => {
  const wrapperHeight = wrapper.value?.clientHeight as number;
  overHeight.value = over.value?.clientHeight as number;

  const availableHeight = window.innerHeight;
  maxHeight.value = availableHeight < wrapperHeight ? availableHeight : wrapperHeight;
  maxHeight.value = availableHeight;
  overTop.value = maxHeight.value - overHeight.value
  top.value = initialTopPosition.value;

  wrapper.value?.addEventListener('touchstart', onTouchStart);
  wrapper.value?.addEventListener('touchmove', onTouchMove);
  wrapper.value?.addEventListener('touchend', onTouchEnd);

  wrapper.value?.addEventListener('mousedown', onTouchStart);
  wrapper.value?.addEventListener('mousemove', onTouchMove);
  wrapper.value?.addEventListener('mouseup', onTouchEnd);
});

onUnmounted(() => {
  wrapper.value?.removeEventListener('touchstart', onTouchStart);
  wrapper.value?.removeEventListener('touchmove', onTouchMove);
  wrapper.value?.removeEventListener('touchend', onTouchEnd);

  wrapper.value?.removeEventListener('mousedown', onTouchStart);
  wrapper.value?.removeEventListener('mousemove', onTouchMove);
  wrapper.value?.removeEventListener('mouseup', onTouchEnd);

  wrapper.value?.removeEventListener('transitionend', onLastTransitionEnd);
})

const onTouchStart = (e: TouchEvent | MouseEvent) => {
  const isMouse = e instanceof MouseEvent;

  initialTouchY.value = isMouse ? e.clientY : e.changedTouches[0].clientY

  isMoving.value = true;
  lastTop.value = top.value
};

const onTouchMove = (e: TouchEvent | MouseEvent) => {
  if (!isMoving.value) {
    return
  }
  
  const isMouse = e instanceof MouseEvent;

  const touchY = isMouse ? e.clientY : e.changedTouches[0].clientY;
  const diff = initialTouchY.value as number - touchY

  if (wrapper.value?.scrollTop && diff < 0) {
    initialTouchY.value = (e as TouchEvent).changedTouches[0].clientY;
    
    return;
  }

  const topPosition = lastTop.value as number - diff

  if (topPosition < topPadding.value) {
    top.value = topPadding.value;

    isOpened.value = true;
  } else {
    top.value = topPosition;
  }
}

const onTouchEnd = (e: TouchEvent | MouseEvent) => {
  const isMouse = e instanceof MouseEvent
  const touchY = isMouse ? e.clientY : e.changedTouches[0].clientY
  
  isMoving.value = false

  const diff = initialTouchY.value as number - touchY;

  if (wrapper.value?.scrollTop as number <= 0) {
    initialTouchY.value = (e as TouchEvent).changedTouches[0].clientY;
    
    top.value = initialTopPosition.value;
    isOpened.value = false;
    return;
  }

  if (Math.abs(diff) > (overHeight.value as number) / 3) {
    if (diff <= 0) {
      top.value = initialTopPosition.value;
      
      isOpened.value = false;
    } else {
      top.value = topPadding.value;

      isOpened.value = true;
    }
  } else {
    top.value = topPadding.value
    isOpened.value = true;
  }
}

const onLastTransitionEnd = () => {
  emit('close');
}
</script>

<style lang="scss" scoped>
.bottom-wrapper {
  overflow-x: hidden;
  position: fixed;
  z-index: 99;
  background: white;
  width: 100%;
  left: 0;
  padding: 0 16px;
  bottom: 0;
  overflow-y: auto;
  transform: translateY(100%);
  box-shadow: 0px 0px 10px #ccc;
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  box-shadow: 0 0 0 99999px rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  & > .header {
    border-radius: inherit;
    display: flex;
    width: 100%;
    justify-content: center;

    & > .indicator {
      width: 64px;
      height: 5px;
      left: calc(50% - 64px/2 - 0.5px);
      top: 8px;
      background: #AFB3C3;
      border-radius: 24px;
      margin-top: 8px;
    }
  }

  &._locked {
    transition: none;
  }
}
</style>