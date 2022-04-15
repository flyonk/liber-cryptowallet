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
    const pagItems = [];

    for (let i = 0; i < total; i++) {
      const item = document.createElement('div');
      item.classList.add('not-viewed');
      pagItems.push(item);
    }

    swiper.pagination.el.innerHTML = '';
    pagItems.forEach((item) => {
      swiper.pagination.el.append(item);
    });

    pagItems[current - 1].classList.add('viewing');
    // return `<div class=''>${current}/${total}</div>`; //other way
  },
};
</script>

<style lang="scss" scoped>
:deep(.not-viewed) {
  width: 50px;
  height: 5px;
  background-color: green;
  margin-left: 5px;
}

:deep(.viewing) {
  background-color: red;
}

:deep(.swiper) {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

:deep(.swiper-pagination) {
  //   background-color: red;
  position: relative;
  display: flex;
  bottom: 0;
}

:deep(.swiper-slide) {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

:deep(.swiper-pagination-bullet) {
  height: 2px;
  width: 100%;
  color: #000;
  opacity: 1;
  background: rgb(0 0 0 / 20%);
  border-radius: 0;
  border: 0;
}

:deep(.swiper-pagination-bullet-active) {
  color: #fff;
  background: #007aff;
}
</style>
