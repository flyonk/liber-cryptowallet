<template>
  <div class="about">
    <div class="main-nav">
      <router-link
        class="link"
        to="/"
      >{{ $t('views.aboutpage.home') }}</router-link> |
      <router-link
        class="link"
        to="/about"
      >{{ $t('views.aboutpage.about') }}</router-link>
    </div>
    <h1>{{ $t('views.aboutpage.thisIsAn') }}</h1>
  </div>
</template>
