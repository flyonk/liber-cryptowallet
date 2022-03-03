<template name="send-to">
  <div class="send-to">
    <div class="header sendto-header">
      <img
        class="back mr-2"
        src="@/assets/icon/arrow-left.svg"
        alt="arrow-left"
        @click="$router.push('/profile')"
      >
      <h4 class="username">
        @AshleyRogers
      </h4>
    </div>
    <div class="user-info flex justify-between align-items-center">
      <h1 class="title">
        Ashley Rogers
      </h1>
      <div class="initials">
        AR
      </div>
    </div>
    <div class="sendto-main">
      <ChangeCurrency />
    </div>
  </div>
</template>

<script setup lang="ts">
import ChangeCurrency from '@/components/Transactions/ChangeCurrency.vue'
// import BaseInput from '@/components/UI/BaseInput.vue'
// import { ref } from 'vue';


</script>

<style lang="scss" scoped>
.send-to {
  height: 100vh;
  padding: 60px 16px 0;
  flex-grow: 1;
  overflow: auto;
}

.sendto-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  >.back {
    width: 20;
    height: 20;
  }

  >.username {
    font-weight: 600;
    font-size: 13px;
    line-height: 21px;
    display: flex;
    align-items: center;
    letter-spacing: 0.03em;
    color: $color-black;
  }
}

.user-info {
  margin-bottom: 24px;

  > .title {
    font-weight: 800;
    font-size: 28px;
    line-height: 34px;
    letter-spacing: 0.0038em;
  }

  >.initials {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background: $color-yellow-100;
    width: 40px;
    height: 40px;
    color: $color-yellow-700;
    margin-right: 12px;   
  }
}
</style>
