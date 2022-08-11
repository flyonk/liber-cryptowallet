<template>
  <div class="stub-wrapper">
    <div class="browser">
      <img
        :src="`${STATIC_BASE_URL}/static/media/phone_stub.png`"
        alt="arrow-left"
        class="image"
      />
      <h1 class="title">{{ $t('browserStub.title') }}</h1>
      <p class="description">
        {{ $t('browserStub.description') }}
      </p>
    </div>
    <div class="rotate">
      <img
        :src="`${STATIC_BASE_URL}/static/media/phone_stub.png`"
        alt="arrow-left"
        class="image"
      />
      <h1 class="title">{{ $t('browserStub.rotateTitle') }}</h1>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { STATIC_BASE_URL } from '@/constants';
</script>

<style lang="scss" scoped>
.stub-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100%;
  background: $color-white;
  z-index: 20;
  @media (max-width: 768px) {
    display: none;
  }

  > .browser {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    @media (max-width: 900px) {
      display: none;
    }

    > .title {
      font-style: normal;
      font-weight: 800;
      font-size: 50px;
      line-height: 56px;
      margin-bottom: 32px;
      text-align: center;
    }

    > .description {
      font-style: normal;
      font-weight: 400;
      font-size: 21px;
      line-height: 32px;
      text-align: center;
      color: #36416a;
      padding: 0 10%;
    }

    > .btn {
      margin-top: 5%;
    }
  }

  > .rotate {
    display: none;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    @media (orientation: landscape) and (max-width: 900px) {
      display: flex;
    }

    > .image {
      max-width: 150px;
    }

    > .title {
      font-style: normal;
      font-weight: 400;
      font-size: 21px;
      line-height: 32px;
      text-align: center;
      color: #36416a;
      padding: 0 10%;
    }
  }
}
</style>
