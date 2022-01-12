<template>
  <div class="home">
    <div class="main-nav">
      <router-link
        class="link"
        to="/"
      >
        Home
      </router-link> |
      <router-link
        class="link"
        to="/about"
      >
        About
      </router-link>
    </div>
    <img
      alt="Vue logo"
      src="@/assets/logo.png"
    >
    <hello-world msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
</script>
