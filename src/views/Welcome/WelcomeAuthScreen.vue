<template>
  <div class="welcome-auth">
    <nav class="slider"></nav>
    <header class="header">
      <h1 class="title">Welcome to</h1>
      <img class="logo" src="@/assets/images/full-logo-white.png" alt="logo" />
    </header>
    <section class="content"></section>
    <footer class="footer">
      <button class="login">Log in</button>
      <button class="signup">Sign up</button>
    </footer>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.welcome-auth {
  background-color: $color-brand-2-800;

  > .header {
    display: flex;
    height: 100px;
  }
  > .header > .title {
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    line-height: 18px;
    color: #fff;
  }
  > .header > .logo {
    width: 85px;
    height: 30px;
  }

  > .footer {
    display: flex;
    justify-content: space-around;
  }

  > .footer > .login {
    background-color: #fff;
    color: #000;
    width: 155.5px;
    height: 48px;
    border-radius: 13px;
    border: none;
    text-align: center;
    font-size: 17px;
    font-family: Inter;
    font-style: normal;
  }
  > .footer > .signup {
    background-color: $color-ui-primary-500;
    color: #fff;
    width: 155.5px;
    height: 48px;
    border-radius: 13px;
    border: none;
    text-align: center;
    font-size: 17px;
    font-family: Inter;
    font-style: normal;
  }
}
</style>