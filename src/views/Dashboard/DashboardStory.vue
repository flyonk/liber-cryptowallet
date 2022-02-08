<template name="DashboardStory">
  <div class="dashboard-story">
    <div class="header">
      <img class="close-btn" src="@/assets/icon/close_big.svg" alt="close" />
      <img
        class="image"
        src="@/assets/icon/todo/empty-profile.svg"
        alt="story"
      />
    </div>
    <div class="main">
      <h1 class="title">Verify your identity</h1>
      <p class="description">
        We require you to verify your identity before you can use this feature.
      </p>
      <img
        class="image"
        src="@/assets/images/passport_upload.png"
        alt="upload document"
      />
      <button class="btn">Verify identity</button>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.dashboard-story {
  height: 100%;
  padding: 32px 24px;
  background: linear-gradient(
    180deg,
    $color-light-grey 0%,
    rgba(237, 240, 251, 0) 20%
  );

  > .header {
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;

    > .close-btn {
      height: 24px;
      width: 24px;
      margin-bottom: 15px;
    }

    > .image {
      height: 45px;
      width: 45px;
    }
  }

  > .main {
    > .title {
      font-weight: 800;
      font-size: 28px;
      line-height: 34px;
      letter-spacing: 0.0038em;
      margin-bottom: 16px;
    }

    > .description {
      font-size: 17px;
      line-height: 22px;
      letter-spacing: -0.0043em;
      margin-bottom: 32px;
    }

    > .image {
      padding-left: 10%;
      margin-bottom: 62px;
    }

    > .btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 343px;
      height: 48px;
      left: 16px;
      top: 710px;
      background: $color-primary;
      border-radius: 13px;
      color: $color-white;
      font-weight: 600;
      font-size: 17px;
      line-height: 22px;
    }
  }
}
</style>
