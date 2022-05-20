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
import { Ref, ref } from 'vue';

let pagItems: Ref<HTMLDivElement[]> = ref([]);
let wrapper: HTMLDivElement | null = null;
const delay = 5000; //ms

const autoplay = {
  delay,
  pauseOnMouseEnter: true,
  disableOnInteraction: false,
};

const pagination = {
  clickable: true,
  type: 'custom',
  //renderCustom is called every time the slide is changed
  renderCustom: function (swiper, current: number, total: number) {
    swiper.pagination.el.classList.add('pagination');

    createPaginationItems(total);
    updatePaginationItemsClasses(current, total);

    configurePaginationWrapper(swiper);
  },
};

function updatePaginationItemsClasses(current: number, total: number) {
  if (!pagItems.value.length) return;

  // prev slides
  for (let i = current - 2; i >= 0; i--) {
    pagItems.value[i].classList.remove('viewing');
    pagItems.value[i].classList.add('viewed');
  }

  // current slide
  pagItems.value[current - 1].classList.remove('not-viewed');
  pagItems.value[current - 1].classList.remove('viewed');
  pagItems.value[current - 1].classList.add('viewing');

  //next slides
  for (let i = current; i < total; i++) {
    pagItems.value[i].classList.remove('viewed');
    pagItems.value[i].classList.remove('viewing');
    pagItems.value[i].classList.add('not-viewed');
  }
}

function configurePaginationWrapper(swiper) {
  if (wrapper) return;
  putItemsToSwiperEl(swiper.pagination.el);

  wrapper = document.querySelector('.swiper-wrapper');

  wrapper?.addEventListener('touchstart', () => {
    swiper.autoplay.stop();

    const currentVieweingSlide = getCurrentViewingItem();
    if (currentVieweingSlide)
      currentVieweingSlide.style.animationPlayState = 'paused';
  });

  wrapper?.addEventListener('touchend', () => {
    swiper.autoplay.start();

    //TODO: implement restart animation
    const currentVieweingSlide = getCurrentViewingItem();
    if (currentVieweingSlide)
      currentVieweingSlide.style.animationPlayState = 'running';
  });
}

function setPaginationItemAnimationStyles() {
  pagItems.value.forEach((e: HTMLDivElement) => {
    e.style.animationDuration = `${delay / 1000}s`; //ms to s
  });
}

function getCurrentViewingItem() {
  return pagItems.value.find((e) => {
    return e.classList.contains('viewing');
  });
}

function createPaginationItems(total: number) {
  if (!pagItems.value.length) {
    for (let i = 0; i < total; i++) {
      const item = document.createElement('div');
      item.classList.add('pagination-item');
      pagItems.value.push(item);
    }

    setPaginationItemAnimationStyles();
  }
}

function putItemsToSwiperEl(el: HTMLDivElement) {
  if (pagItems.value.length) {
    pagItems.value.forEach((item) => {
      el.append(item);
    });
  }
}
</script>

<style lang="scss" scoped>
.swiper-container {
  height: 100%;

  & > .swiper {
    height: 100%;
  }
}

:deep(.pagination) {
  display: flex;
  justify-content: space-around;
  background-color: $color-brand-primary;
  padding: 10px 24px 0;
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
  position: relative;
  display: flex;
  bottom: 0;
}

@keyframes background-filling {
  to {
    background-position: left;
  }
}
</style>
