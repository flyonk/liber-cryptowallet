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
      >
    </button>

    <h1 class="main-title">Don’t miss a beat</h1>

    <div class="page-content">
      <p class="text-default">Get notified about spending, security, wealth, market movements, discounts and deals, so you’re always in the know</p>
    </div>
  </div>
  <div style="padding: 15px;">
    <button tyte="button" class="btn btn-primary">Enable push notifications</button>
    <button tyte="button" class="btn btn-secondary">Not now</button>
  </div>
</template>

<script setup lang="ts">
//
</script>

<style lang="scss" scoped>
.back-btn {
  border: none;
  padding: 0;

  img {
    background-color: #fff;
    height: 16px;
    width: auto;
  }
}
.page-wrapper {
  margin: 15px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: start;
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
  margin-bottom: 20px;
}

.btn {
  border-radius: 13px;
  text-align: center;
  box-shadow: none;
  outline: none;
  border: none;

  height: 48px;
  line-height: 48px;
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
.btn-secondary {
  margin-top: 10px;
  color: #2862FF;
  background-color: transparent;
}
.page-content {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>