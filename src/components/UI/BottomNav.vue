<template name="BottomNav">
  <div class="wrapper">
    <ul class="navbar">
      <li class="item">
        <img
          src="@/assets/images/navbar/home.svg"
          alt="Home"
        >
        <p>Home</p>
      </li>
      <li
        class="item"
        @click="$router.push('/home')"
      >
        <img
          src="@/assets/images/navbar/account.svg"
          alt="Account"
        >
        <p>Account</p>
      </li>
      <li class="item">
        <img
          src="@/assets/images/navbar/send.svg"
          alt="Send"
        >
        <p>Send</p>
      </li>
      <li class="item">
        <img
          src="@/assets/images/navbar/recipients.svg"
          alt="Recipients"
        >
        <p>Recipients</p>
      </li>
      <li class="item">
        <img
          src="@/assets/images/navbar/gift.svg"
          alt="Invite"
        >
        <p>Invite</p>
      </li>
    </ul>
    <img
      id="indicator"
      src="@/assets/images/navbar/indicator.png"
      @click="showBottomMenu"
    >

    <div
      v-if="isMenuOpen"
      class="bottom-menu"
    >
      <div
        class="bottom-menu--close"
        @click="showBottomMenu"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const isMenuOpen = false;
// function showBottomMenu() {
//   isMenuOpen = isMenuOpen
//   console.log('aga')
// }
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.navbar {
  background: white;
  margin-top: auto;
  width: 100%;
  height: 85px;
  display: flex;
  justify-content: space-around;
  margin-bottom: 15px;

  >.item {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
  }

  >.bottom-menu {
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
