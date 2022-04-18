<template>
  <div class="">
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

const autoplay = {
  delay: 5000,
  pauseOnMouseEnter: true,
  disableOnInteraction: false,
};

const pagination = {
  clickable: true,
  type: 'custom',
  renderCustom: function (swiper, current: number, total: number) {
    //TODO: implement timeline logic
    swiper.pagination.el.classList.add('navigation');
    if (!pagItems.value.length) {
      for (let i = 0; i < total; i++) {
        const item = document.createElement('div');
        item.classList.add('navigation-item');
        pagItems.value.push(item);
      }
    }

    updateStyles(current, total);

    //clear items
    swiper.pagination.el.innerHTML = '';

    pagItems.value.forEach((item) => {
      swiper.pagination.el.append(item);
    });

    handleTouchOnSlide(swiper);
  },
};

function updateStyles(current: number, total: number) {
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

function handleTouchOnSlide(swiper) {
  const wrapper = document.querySelector('.swiper-wrapper');
  const viewingSlide = document.querySelector('.viewing') as HTMLElement;

  wrapper?.addEventListener('touchstart', () => {
    swiper.autoplay.stop();
    viewingSlide.style.animationPlayState = 'paused';
  });

  wrapper?.addEventListener('touchend', () => {
    swiper.autoplay.start();
    //TODO: implement restart animation
    viewingSlide.style.animationPlayState = 'running';
  });
}
</script>

<style lang="scss" scoped>
:deep(.navigation) {
  display: flex;
  justify-content: space-around;
  background-color: $color-brand-primary;
  padding: 10px 24px 0;
}

:deep(.navigation-item) {
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
  background-color: $color-white;
  animation: 5s linear 0s forwards background-filling;
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
  from {
    background: linear-gradient(
      to left,
      $color-dark-grey 50%,
      $color-white 50%
    );
    background-size: 200%;
    background-position: right;
  }

  to {
    background-position: left;
  }
}
</style>
