<template>
  <div class="">
    <swiper :modules="[Pagination]" :loop="true" :pagination="pagination">
      <slot />
    </swiper>
  </div>
</template>

<script setup lang="ts">
// Import Swiper Vue.js components
import { Swiper } from 'swiper/vue';
import 'swiper/css/pagination'; //TODO: move to index.css

// import required modules
import { Pagination } from 'swiper';

const pagination = {
  clickable: true,
  type: 'custom',
  renderCustom: function (swiper, current, total) {
    //TODO: implement timeline logic
    swiper.pagination.el.classList.add('navigation');
    const pagItems = [];

    for (let i = 0; i < total; i++) {
      const item = document.createElement('div');
      // item.classList.add('not-viewed');
      item.classList.add('navigation-item');
      pagItems.push(item);
    }

    //current slide
    pagItems[current - 1].classList.add('viewing');

    //next slides
    for (let i = current; i < total; i++) {
      pagItems[i].classList.add('not-viewed');
    }

    // prev slides
    for (let i = current - 2; i >= 0; i--) {
      pagItems[i].classList.add('viewed');
    }

    //clear items
    swiper.pagination.el.innerHTML = '';
    pagItems.forEach((item) => {
      swiper.pagination.el.append(item);
      console.log(item.classList);
    });

    // return `<div class=''>${current}/${total}</div>`; //other way
  },
};
</script>

<style lang="scss" scoped>
:deep(.navigation) {
  display: flex;
  justify-content: space-around;
  background-color: $color-brand-primary;
  padding-top: 10px;
}

:deep(.navigation-item) {
  width: 100%;
  height: 3px;
  margin-left: 4px;
  border-radius: 2px;
}

:deep(.not-viewed) {
  background-color: $color-dark-grey;
}

:deep(.viewing) {
  background-color: $color-white;
  animation: background-filling linear;
  animation-duration: 3s;
  animation-fill-mode: forwards;
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
    background: linear-gradient(to left, $color-dark-grey 50%, $color-white 50%)
      right;
    background-size: 200%;
  }

  to {
    background-position: left;
  }
}
</style>
