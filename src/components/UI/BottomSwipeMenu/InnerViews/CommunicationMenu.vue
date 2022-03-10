<template>
  <div class="communication-menu">
    <p
      class="cancel"
      @click="closeMenu"
    >
      Cancel
    </p>
    <h2 class="title">
      Choose main communication channel
    </h2>
    <ul class="communications-list">
      <li class="communication-item">
        <div class="send-method">
          <p class="label">
            Phone 1
          </p>
          <h3 class="data">
            +49 30 901820
          </h3>
        </div>
        <input type="radio">
      </li>
      <li class="communication-item">
        <div class="send-method">
          <p class="label">
            Email
          </p>
          <h3 class="data">
            flyonk@cryptowize.tech
          </h3>
        </div>
        <input type="radio">
      </li>
      <li class="communication-item">
        <div class="send-method">
          <p class="label">
            Phone 2
          </p>
          <h3 class="data">
            +49 35 931820
          </h3>
        </div>
        <input type="radio">
      </li>
    </ul>
    <BaseButton
      class="btn mt-auto"
      size="large"
    >
      Keep account open
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
// import { ref } from 'vue';

import BaseButton from '@/components/UI/BaseButton.vue'


const emit = defineEmits(['closeMenu']);
function closeMenu() {
  emit('closeMenu');
}

// function startMove($event: TouchEvent) {
//   menu.value.style.height = `calc(100% - ${$event.touches[0].pageY}px)`;
// }

// const { isMenuOpen } = toRefs(props);
</script>

<style lang="scss" scoped>
.communication-menu {
  bottom: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-bottom: 50px;

  >.cancel {
    font-weight: 600;
    font-size: 17px;
    line-height: 22px;
    letter-spacing: -0.0043em;
    color: #2862FF;
    margin-bottom: 24px;
  }

  >.title {
    font-weight: 800;
    font-size: 28px;
    line-height: 34px;
    color: $color-black;
    letter-spacing: 0.0038em;
    margin-bottom: 28px;
  }
}

.communication-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0 16px 0;
  border-bottom: 1px solid $color-grey-500;
}

.send-method {
  >.label {
    font-weight: 500;
    font-size: 11px;
    line-height: 13px;
    display: flex;
    align-items: center;
    letter-spacing: 0.0006em;
    color: $color-brand-2-300;
  }

  >.data {
    font-weight: 500;
    font-size: 17px;
    line-height: 22px;
    display: flex;
    align-items: center;
    letter-spacing: -0.0043em;
    color: #0D1F3C;
  }
}
</style>