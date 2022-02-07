<template name="AccountProfile">
  <div class="account-profile">
    <div class="header">
      <div class="left">
        <img
          class="back"
          src="@/assets/icon/arrow-left.svg"
          alt="arrow-left"
          @click="$router.push('/home')"
        />
        <h1 class="title">
          {{ accountName }}
        </h1>
        <div class="flex">
          <p class="account-id">
            My ID: <a class="link">{{ accountID }}</a>
          </p>
          <img src="@/assets/icon/edit.svg" alt="edit" />
        </div>
      </div>
      <div class="right">
        {{ nameInitials }}
      </div>
    </div>
    <div class="main">
      <img class="qr-code" src="@/assets/images/qr-code.png" alt="qr" />
      <p class="text">Get paid with</p>
      <div class="flex">
        <a class="link"> liber.me/abrahamwatson </a>
        <img src="@/assets/icon/copy.svg" alt="copy" />
      </div>
      <div class="controls">
        <button class="btn">Scan</button>
        <button class="btn active">My Code</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const accountName = 'Abraham Watson';
const accountID = '@abrahamwatson';

const nameInitials = computed(() => {
  let parts = accountName.split(' ');
  return parts[0][0] + parts[1][0];
});
</script>

<style lang="scss" scoped>
.account-profile {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 60px 16px 50px;
  flex-grow: 1;
  overflow: auto;

  > .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    > .left {
      > .back {
        margin-bottom: 20px;
      }

      > .title {
        font-weight: 800;
        font-size: 28px;
        line-height: 34px;
        letter-spacing: 0.0038em;
        margin-bottom: 8px;
      }

      > .account-id {
        font-size: 20px;
        line-height: 25px;
        display: flex;
        align-items: center;
        letter-spacing: -0.0045em;
        color: $color-brand-2-300;
      }
    }

    > .right {
      height: 56px;
      width: 56px;
      background: $color-yellow-100;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      align-self: center;
    }
  }

  > .main {
    padding-top: 46px;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;

    > .qr-code {
      margin-bottom: 40px;
    }

    > .text {
      font-weight: 500;
      font-size: 17px;
      line-height: 22px;
      text-align: center;
      letter-spacing: -0.0043em;
      color: $color-brand-2-300;
    }

    > .controls {
      margin-top: auto;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 40px;
      background: $color-light-grey;
      border-radius: 8px;

      > .btn {
        width: 48%;
        font-size: 16px;
        line-height: 21px;
        letter-spacing: -0.0031em;
        color: $color-brand-500;
      }

      > .active {
        height: 32px;
        left: 171px;
        top: 4px;
        background: $color-brand-500;
        border-radius: 6px;
        color: white;
        font-weight: 600;
        font-size: 16px;
        line-height: 21px;
        text-align: center;
        letter-spacing: -0.0031em;
      }
    }
  }
}

.link {
  color: $color-primary;
  padding: 0 6px;
}
</style>
