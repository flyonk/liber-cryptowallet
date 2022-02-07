<template>
  <div v-if="isMenuOpen" ref="menu" class="bottom-menu">
    <div
      class="bottom-menu--close"
      @click="closeMenu"
      @touchmove="startMove"
      @touchend="endMove"
    />
    <div class="header">
      <h4 class="title">Accounts</h4>
      <div class="add" @click="$router.push('/account/add')">+</div>
    </div>
    <ul class="list">
      <li class="item" @click="$router.push('/account')">
        <div class="image-wrap">
          <img src="@/assets/icon/all-accounts.svg" alt="all" />
        </div>
        <p class="name">All Accounts</p>
        <p class="price">€2.00</p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue';

const menu = ref(null);

const props = defineProps({
  isMenuOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['closeMenu']);
function closeMenu() {
  emit('closeMenu');
}

function startMove($event: TouchEvent) {
  menu.value.style.height = `calc(100% - ${$event.touches[0].pageY}px)`;
}

const { isMenuOpen } = toRefs(props);
</script>

<style lang="scss" scoped>
.bottom-menu {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: $color-white;
  border-radius: 32px 32px 0 0;
  max-height: 70%;
  min-height: 10%;
  height: 30%;
  animation: topToBottom ease 1s;
  padding: 8px 16px 0;
  z-index: 2;

  &--close {
    width: 64px;
    height: 5px;
    border-radius: 1px;
    background: $color-grey;
    margin: 0 auto;
    margin-bottom: 25px;
  }

  > .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    > .title {
      font-weight: 600;
      font-size: 20px;
      line-height: 25px;
      letter-spacing: -0.0045em;
    }

    > .add {
      display: flex;
      justify-content: center;
      align-items: center;
      color: $color-white;
      background: $color-primary-500;
      border-radius: 8px;
      width: 40px;
      height: 40px;
      font-size: 25px;
      padding-bottom: 4px;
      z-index: 5;
    }
  }

  > .list {
    display: flex;
    flex-direction: column;

    > .item {
      display: flex;
      align-items: center;

      > .image-wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 48px;
        height: 48px;
        background: $color-grey-100;
        margin-right: 12px;
        border-radius: 8px;
      }

      > .name {
        font-weight: 500;
        font-size: 16px;
        line-height: 21px;
        letter-spacing: -0.0031em;
      }

      > .price {
        font-weight: 500;
        font-size: 16px;
        line-height: 21px;
        text-align: right;
        letter-spacing: -0.0031em;
        margin-left: auto;
      }
    }
  }
}
</style>
