<template>
  <div class="page-wrapper">
    <BackHistoryBtn />

    <h1 class="main-title">
      Log in with a Touch ID
    </h1>

    <div class="page-content">
      <img
        src="@/assets/images/touchid-icon.svg"
        alt="Face id"
      >
      <p class="text-default">
        Use Touch ID instead of a passcode to log in. It is more secure.
      </p>
    </div>
  </div>
  <div style="padding: 15px">
    <button
      tyte="button"
      class="btn-default btn-primary"
    >
      Enable Touch ID
    </button>
    <button
      tyte="button"
      class="btn-default btn-secondary"
    >
      Not now
    </button>
  </div>
</template>

<script setup lang="ts">
import BackHistoryBtn from '@/components/UI/BackHistoryBtn.vue';
</script>

<style lang="scss" scoped>
.page-wrapper {
  margin: 15px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
  color: $color-brand;
  margin-bottom: 20px;
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
  background-color: $color-primary;
  color: $color-white;
}

.btn-secondary {
  margin-top: 10px;
  color: $color-primary;
  background-color: transparent;
}

.page-content {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
}
</style>
