<template>
  <section class="example-story">
    <header class="header">
      <h1 class="title">{{ props.headerTitle }}</h1>
      <img
        class="logo"
        alt="logo"
        width="90"
        height="32"
        :src="props.logoImg"
      />
    </header>
    <main class="main">
      <h1 class="title">{{ props.baseTitle }}</h1>
      <div class="imagecontainer">
        <img
          class="image"
          width="330"
          height="330"
          :src="props.baseImg"
        />
      </div>
    </main>
    <footer class="footer">
      <button class="login" @click="$router.push({ name: props.loginRoute })">{{ props.loginTitle }}</button>
      <button class="signup" @click="$router.push( { name: props.signUpRoute })">{{ props.signUpTitle }}</button>
    </footer>
  </section>
</template>

<script lang="ts" setup>
import { PropType } from 'vue-demi';

import { Route } from '@/router/types';

const props = defineProps({
  headerTitle: {
    type: String,
    default: ''
  },
  baseTitle: {
    type: String,
    default: ''
  },
  loginTitle: {
    type: String,
    default: ''
  },
  signUpTitle: {
    type: String,
    default: ''
  },
  logoImg: {
    type: String,
    required: true
  },
  baseImg: {
    type: String,
    required: true
  },
  loginRoute: {
    type: String as PropType<Route>,
    required: true
  },
  signUpRoute: {
    type: String as PropType<Route>,
    required: true
  }
});
</script>

<style lang="scss" scoped>
.example-story {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: $color-brand-2-800;

  > .header {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: nowrap;
    flex: 0 0 auto;
  }

  > .header > .title {
    font-family: Inter, sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    line-height: 18px;
    color: $color-white;
    margin-left: 25px;
  }

  > .main {
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
  }

  > .main > .title {
    font-family: Inter, sans-serif;
    font-style: normal;
    font-weight: 800;
    font-size: 34px;
    line-height: 41px;
    letter-spacing: 0.004em;
    color: $color-white;
    margin-left: 25px;
  }

  > .main > .imagecontainer {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  > .main > .imagecontainer > .image {
    align-self: center;
  }

  > .footer {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-around;
    flex: 0 0 auto;
    height: 85px;
  }

  > .footer > .login {
    background-color: $color-white;
    color: $color-black;
    width: 155.5px;
    height: 48px;
    border-radius: 13px;
    border: none;
    text-align: center;
    font-size: 17px;
    font-family: Inter, sans-serif;
    font-style: normal;
  }

  > .footer > .signup {
    background-color: $color-primary;
    color: $color-white;
    width: 155.5px;
    height: 48px;
    border-radius: 13px;
    border: none;
    text-align: center;
    font-size: 17px;
    font-family: Inter, sans-serif;
    font-style: normal;
  }
}
</style>
