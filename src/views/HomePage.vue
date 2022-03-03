<template>
  <div class="home">
    <div class="main-nav">
      <router-link
        class="link"
        to="/"
      >{{ $t('views.homepage.home') }}</router-link> |
      <router-link
        class="link"
        to="/about"
      >{{ $t('views.homepage.about') }}</router-link>
    </div>
    <img
      alt="Vue logo"
      src="@/assets/logo.png"
    >
    <hello-world msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script setup lang="ts"></script>
