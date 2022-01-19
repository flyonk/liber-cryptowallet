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

    <h1 class="main-title">Step 2. Configure App</h1>

    <p class="text-default">Scan QR code with the authenticator app or enter the code manually. </p>

    <p class="text-default">Store this backup code somewhere safe – print it, write it down.</p>
    <p class="text-default">If you ever lose access to your device, you can use this code to verify you identity.</p>
  </div>
  <div style="padding: 15px;">
    <button tyte="button" class="btn btn-primary">Continue</button>
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

</style>