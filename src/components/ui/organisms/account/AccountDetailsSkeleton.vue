<template>
  <div>
    <div class="qr-code-container">
      <Skeleton width="150px" height="150px" />
      <Skeleton class="text-default" width="65%" height="20px" />
    </div>
    <div class="wallet-block">
      <div class="wallet-info">
        <div class="titled-block">
          <Skeleton class="title" height="15px" width="20%"></Skeleton>
          <Skeleton class="content mt-1" height="17px" width="80%"></Skeleton>
        </div>
      </div>

      <div class="wallet-info">
        <div class="titled-block">
          <Skeleton class="title" height="15px" width="30%"></Skeleton>
          <Skeleton class="content mt-1" height="43px" width="100%"></Skeleton>
        </div>
      </div>

      <div class="wallet-footer">
        <div class="row row-footer">
          <Skeleton class="title" height="18px" width="45%" />
          <Skeleton class="content" height="18px" width="45%" />
        </div>
        <div class="row row-footer">
          <Skeleton class="title" height="18px" width="45%" />
          <Skeleton class="content" height="18px" width="45%" />
        </div>
        <div class="row row-footer">
          <Skeleton class="title" height="18px" width="45%" />
          <Skeleton class="content" height="18px" width="45%" />
        </div>
      </div>

      <div class="btns-container">
        <Skeleton
          class="title"
          height="48px"
          border-radius="16px"
          width="40%"
        />
        <Skeleton
          class="title"
          height="48px"
          border-radius="16px"
          width="43%"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Skeleton from 'primevue/skeleton';
</script>

<style lang="scss" scoped>
.qr-code-container {
  flex-grow: 1;
  margin: 28px 0 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.wallet-block {
  background-color: $color-white;
  margin: 0 -15px -15px;
  padding: 15px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.wallet-info {
  display: flex;
  align-items: center;
  padding: 15px;
  padding-bottom: 0;

  > .icon {
    font-size: 24px;
    margin: 0 0 0 15px;
    background: none;
  }
}

.titled-block {
  flex-grow: 1;
  overflow: hidden;

  & > .title {
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 18px;
    letter-spacing: -0.0008em;
    color: $color-dark-grey;
  }

  & > .content {
    overflow-wrap: break-word;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 21px;
    letter-spacing: -0.0031em;
    color: $color-black;
  }
}

.btns-container {
  display: flex;
  justify-content: space-between;
}

.text-default {
  color: $color-dark-grey;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  margin: 16px 0 36px;
}

.wallet-footer {
  padding: 15px;
  border: 1px solid $color-brand-2-50;
  border-radius: 12px;
  margin-top: 20px;
  margin-bottom: 40px;

  & > .row {
    margin-top: 6px;
    margin-bottom: 6px;
    display: flex;
    justify-content: space-between;
  }
}

.row-footer {
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 18px;

  & > .content {
    color: $color-brand-primary;
    font-weight: 500;
  }
}
</style>
