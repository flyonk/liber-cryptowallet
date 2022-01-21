<template>
  <div class="welcome-auth">
    <nav class="slider">
      <!-- <stores-slider :stories="stories" /> -->
    </nav>
    <section class="content">
      <stores-slider :stories="stories" />
    </section>
    <footer class="footer">
      <button class="login">Log in</button>
      <button class="signup">Sign up</button>
    </footer>
  </div>
</template>

<script setup lang="ts">
import StoresSlider from '@/components/UI/StoresSlider.vue';
import { ref } from 'vue';

const stories = ref([
  {
    link: 'https://pbs.twimg.com/profile_images/1045580248467886080/_uwwJdr3_400x400.jpg',
  },
  {
    link: 'https://pbs.twimg.com/profile_images/1045580248467886080/_uwwJdr3_400x400.jpg',
  },
  {
    link: 'https://pbs.twimg.com/profile_images/1045580248467886080/_uwwJdr3_400x400.jpg',
  },
]);
</script>

<style lang="scss" scoped>
.welcome-auth {
  display: flex;
  flex-direction: column;
  background-color: $color-brand-2-800;
  height: 100vh;

  > .header {
    display: flex;
    flex: 0 0 auto;
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

  > .content {
    flex: 1 0 auto;
  }

  > .footer {
    display: flex;
    justify-content: space-around;
    flex: 0 0 auto;
    margin-bottom: 50px;
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