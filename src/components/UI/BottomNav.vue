<template>
  <div class="navbar__wrapper relative">
    <ul class="navbar">
      <li class="navbar__item">
        <img
          src="/assets/images/navbar/home.svg"
          alt="Home"
        >
        <p>Home</p>
      </li>
      <li
        class="navbar__item"
        @click="$router.push('/dashboard/accounts')"
      >
        <img
          src="/assets/images/navbar/account.svg"
          alt="Account"
        >
        <p>Account</p>
      </li>
      <li class="navbar__item">
        <img
          src="/assets/images/navbar/send.svg"
          alt="Account"
        >
        <p>Send</p>
      </li>
      <li class="navbar__item">
        <img
          src="/assets/images/navbar/recipients.svg"
          alt="Recipients"
        >
        <p>Recipients</p>
      </li>
      <li class="navbar__item">
        <img
          src="/assets/images/navbar/gift.svg"
          alt="Recipients"
        >
        <p>Invite</p>
      </li>
    </ul>
    <img
      id="indicator"
      src="/assets/images/navbar/indicator.png"
      @click="showBottomMenu"
    >

    <div
      v-if="isMenuOpen"
      class="navbar__bottom-menu"
    >
      <div
        class="navbar__bottom-menu--close"
        @click="showBottomMenu"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      isMenuOpen: false,
      hello: 'world'
    }
  },
  methods: {
    showBottomMenu() {
      this.isMenuOpen = !this.isMenuOpen
      console.log('aga')
    }
  }
}
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
