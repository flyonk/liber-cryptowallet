<template>
  <div class="page-wrapper">
    <button
      type="button"
      class="back-btn"
      @click="$router.go(-1)"
    >
      <img
        src="@/assets/images/back-arrow.svg"
        alt="Go back"
        class="back-btn-img"
      >
    </button>

    <h1 class="main-title">
      Step 1. Install App
    </h1>

    <p class="text-default">
      Install an authenticator app on your mobile device. Recommended options:
    </p>

    <p class="auth-item">
      <img
        src="@/assets/brands/ga.png"
        alt="Google Authenticator"
        class="auth-app-icon"
      >
      <span>Google Authenticator</span>
    </p>
    <p
      class="auth-item"
      style="margin-bottom: 50px;"
    >
      <img
        src="@/assets/brands/ma.svg"
        alt="Microsoft Authenticator"
        class="auth-app-icon"
      >
      <span>Microsoft Authenticator</span>
    </p>

    <a
      href="https://apps.apple.com/lb/app"
      class="store-link"
    ><img
      class="store-link-img"
      src="@/assets/brands/appstore.png"
      alt="App Store"
    ></a>
    <a
      href="https://play.google.com/store/apps"
      class="store-link"
    ><img
      class="store-link-img"
      src="@/assets/brands/googleplay.png"
      alt="Google play"
    ></a>
  </div>
  <div style="padding: 15px;">
    <button
      tyte="button"
      class="btn-default btn-primary"
    >
      Continue
    </button>
  </div>
</template>

<script setup lang="ts">
//
</script>

<style lang="scss" scoped>
.back-btn {
  border: none;
  padding: 0;

}

.back-btn-img {
  background-color: #fff;
  height: 16px;
  width: auto;
}

.page-wrapper {
  margin: 15px;
  flex-grow: 1;
}

.main-title {
  font-style: normal;
  font-weight: 800;
  font-size: 28px;
  line-height: 34px;
  letter-spacing: 0.0038em;
  margin-bottom: 10px;
  margin-top: 20px;
}

.text-default {
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: -0.0043em;
  color: #0D1F3C;
  margin-bottom: 40px;
}

.store-link {
  display: block;
  max-width: 180px;
  margin-bottom: 20px;

}

.store-link-img {
  vertical-align: top;
  width: 100%;
}

.btn-default {
  border-radius: 13px;
  text-align: center;
  box-shadow: none;
  outline: none;
  border: none;
  height: 48px;
  width: 100%;
  font-style: normal;
  font-weight: 600;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: -0.0043em;
}

.btn-primary {
  background-color: #2862FF;
  color: #fff;
}

.auth-item {
  display: flex;
  align-items: center;
}

.auth-app-icon {
  max-width: 40px;
  margin-right: 10px;
}
</style>