<template>
  <h1>hello</h1>
</template>

<script setup lang="ts">
// export default {
//   name: "NavBar",
//   data() {
//     return {
//       isMenuOpen: false,
//       hello: 'world'
//     }
//   },
//   methods: {
//     showBottomMenu() {
//       this.isMenuOpen = !this.isMenuOpen
//       console.log('aga')
//     }
//   }
// }
</script>

<style lang="scss" scoped>
.navbar {
  background: white;
  margin-top: auto;
  width: 100%;
  height: 85px;
  display: flex;
  justify-content: space-around;
  margin-bottom: 15px;

  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__bottom-menu {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: white;
    border-radius: 32px 32px 0px 0px;
    max-height: 70%;
    min-height: 30%;
    animation: topToBottom ease 1s;
    padding: 8px;

    &--close {
      width: 64px;
      height: 5px;
      border-radius: 1px;
      background: #AFB3C3;
      margin: 0 auto;
    }
  }

  img {
    margin-bottom: 6px;
  }

  &__item {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
  }
}

#indicator {
  margin: 0 auto;
}

@keyframes topToBottom {
  0% {
    bottom: -100%;
    opacity: 0;
  }
  100% {
    bottom: 0;
    opacity: 1;
  }
}

</style>
