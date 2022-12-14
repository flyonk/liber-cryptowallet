<template>
  <div class="swiper-container">
    <swiper
      :modules="[Pagination, Autoplay]"
      :loop="true"
      :pagination="pagination"
      :autoplay="autoplay"
    >
      <slot />
    </swiper>
  </div>
</template>

<script setup lang="ts">
// Import Swiper Vue.js components
import { Swiper } from 'swiper/vue';
import 'swiper/css/pagination'; //TODO: move to index.css

// import required modules
import { Pagination, Autoplay } from 'swiper';
import { computed, Ref, ref } from 'vue';

const delay = 5000; //ms

const autoplay = {
  delay,
  pauseOnMouseEnter: true,
  disableOnInteraction: false,
};

const pagination = {
  type: 'custom',
  renderCustom: render,
};

let slidesWrapper: HTMLDivElement | null = null;

let pagItemWrappers: Ref<HTMLDivElement[]> = ref([]);
const pagItems = computed(() =>
  pagItemWrappers.value.map((e: HTMLDivElement) => {
    return e.firstElementChild;
  })
);

/**
 * Called every time the slide is changed.
 * @param swiper
 * @param current
 * @param total
 */
function render(swiper, current: number, total: number) {
  swiper.pagination.el.classList.add('pagination');

  if (!slidesWrapper) setSlideWrapperListeners(swiper);

  if (!pagItemWrappers.value.length) {
    createPaginationItems(total);
    setPaginationItemAnimationStyles();
    setClickableBehaviorForPagItem(swiper);
    insertItemsToSwiperEl(swiper.pagination.el);
  }

  updatePaginationItemsClasses(current, total);
}

/**
 * Updates the state classes of pagination elements after each change
 * @param current
 * @param total
 */
function updatePaginationItemsClasses(current: number, total: number) {
  if (!pagItems.value.length) return;

  // prev slides
  for (let i = current - 2; i >= 0; i--) {
    pagItems.value[i]?.classList.remove('viewing');
    pagItems.value[i]?.classList.add('viewed');
  }

  // current slide
  pagItems.value[current - 1]?.classList.remove('not-viewed');
  pagItems.value[current - 1]?.classList.remove('viewed');
  pagItems.value[current - 1]?.classList.add('viewing');

  //next slides
  for (let i = current; i < total; i++) {
    pagItems.value[i]?.classList.remove('viewed');
    pagItems.value[i]?.classList.remove('viewing');
    pagItems.value[i]?.classList.add('not-viewed');
  }
}

/**
 * Calls once when the render function is run for the first time.
 * Adds a pause behavior when touched.
 * @param swiper
 */
function setSlideWrapperListeners(swiper) {
  slidesWrapper = document.querySelector('.swiper-wrapper');

  slidesWrapper?.addEventListener('touchstart', () => {
    swiper.autoplay.stop();

    const currentViewingSlide = getCurrentViewingItem();
    if (currentViewingSlide)
      currentViewingSlide.style.animationPlayState = 'paused';
  });

  slidesWrapper?.addEventListener('touchend', () => {
    swiper.autoplay.start();

    //TODO: implement restart animation
    const currentViewingSlide = getCurrentViewingItem();
    if (currentViewingSlide)
      currentViewingSlide.style.animationPlayState = 'running';
  });
}

function setPaginationItemAnimationStyles() {
  pagItems.value.forEach((e: Element | null) => {
    const item = e as HTMLDivElement;
    item.style.animationDuration = `${delay / 1000}s`;
  });
}

function getCurrentViewingItem() {
  return pagItems.value.find((e) => {
    return e?.classList.contains('viewing');
  }) as HTMLDivElement;
}

function createPaginationItems(total: number) {
  if (pagItemWrappers.value.length) return;

  for (let i = 0; i < total; i++) {
    const wrapper = document.createElement('div');
    const item = document.createElement('div');

    wrapper.classList.add('item-wrapper');
    item.classList.add('pagination-item');

    wrapper.appendChild(item);
    pagItemWrappers.value.push(wrapper);
  }
}

function insertItemsToSwiperEl(el: HTMLDivElement) {
  if (pagItemWrappers.value.length) {
    pagItemWrappers.value.forEach((item) => {
      el.append(item);
    });
  }
}

/**
 *  Adds switching behavior to the target slide by touch.
 * @param swiper
 */
function setClickableBehaviorForPagItem(swiper) {
  const paginationContainer = document.querySelector('.swiper-pagination');
  if (!paginationContainer) return;

  paginationContainer.addEventListener('touchstart', (event) => {
    const index = pagItemWrappers.value.findIndex((e) => {
      const isWrapper = e === event.target;
      const isItem = e.firstElementChild === event.target;
      return isWrapper || isItem;
    });

    if (index !== -1) swiper.slideTo(index + 1, 500); //500 ms to show
    event.stopPropagation();
  });
}
</script>

<style lang="scss" scoped>
.swiper-container {
  height: 100%;
  height: fill-available; // ios fix
  min-height: 100%;

  & > .swiper {
    height: 100%;
    height: fill-available; //ios fix
    min-height: 100%;
  }
}

:deep(.swiper-wrapper),
:deep(.example-story) {
  min-height: 100%;
  height: fill-available !important; //ios fix
}

:deep(.pagination) {
  display: flex;
  justify-content: space-around;
  background-color: $color-brand-primary;
  padding: 0 24px;
}

:deep(.item-wrapper) {
  display: flex;
  align-items: center;
  width: 100%;
  height: 30px;
  margin-left: 4px;
  border-radius: 2px;
  background: none;

  &:first-child {
    margin-left: 0;
  }
}

:deep(.pagination-item) {
  width: 100%;
  height: 3px;
  margin-left: 4px;
  border-radius: 2px;

  &:first-child {
    margin-left: 0;
  }
}

:deep(.not-viewed) {
  background-color: $color-dark-grey;
}

:deep(.viewing) {
  width: 100%;
  height: 3px;
  background: linear-gradient(to left, $color-dark-grey 50%, $color-white 50%);
  background-size: 200%;
  background-position: right;

  // animation
  animation-name: background-filling;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
}

:deep(.viewed) {
  background-color: $color-white;
  opacity: 0.5;
}

:deep(.swiper-pagination) {
  position: absolute;
  display: flex;
  top: 45px;
  height: 20px;
  background: none;
  z-index: 5;
}

@keyframes background-filling {
  to {
    background-position: left;
  }
}
</style>
