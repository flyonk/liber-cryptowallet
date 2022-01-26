<template>
  <section class="example-story">
    <header class="header">
      <h1 class="title">Welcome to</h1>
      <img
        class="logo"
        src="@/assets/images/full-logo-white.png"
        alt="logo"
        width="90"
        height="32"
      />
    </header>
    <main class="main">
      <h1 class="title">Transfer money around the world with the best fee</h1>
      <div class="imagecontainer">
        <img
          class="image"
          src="@/assets/images/example-story-money-image.png"
          width="330"
          height="330"
        />
      </div>
    </main>
    <footer class="footer">
      <button class="login">Log in</button>
      <button class="signup">Sign up</button>
    </footer>
  </section>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.example-story {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: $color-brand-2-800;
  .header {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: nowrap;
    flex: 0 0 auto;
    > .title {
      font-family: Inter;
      font-style: normal;
      font-weight: 600;
      font-size: 13px;
      line-height: 18px;
      color: white;
    }
  }

  > .main {
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
    > .title {
      font-family: Inter;
      font-style: normal;
      font-weight: 800;
      font-size: 34px;
      line-height: 41px;
      letter-spacing: 0.004em;
      color: white;
    }

    > .imagecontainer {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
    > .image {
      align-self: center;
    }
  }

  > .footer {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-around;
    flex: 0 0 auto;
    height: 85px;

    > .login {
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
    > .signup {
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
}
</style>