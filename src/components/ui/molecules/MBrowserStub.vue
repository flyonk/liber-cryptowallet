<template>
  <div class="stub-wrapper">
    <img
      :src="`${STATIC_BASE_URL}/static/media/phone_stub.png`"
      alt="arrow-left"
      class="image"
    />
    <h1 class="title">{{ $t('browserStub.title') }}</h1>
    <p class="description">
      {{ $t('browserStub.description') }}
    </p>
    <m-base-button class="btn mb-3" size="large" view="simple">
      {{ $t('browserStub.installButton') }}
    </m-base-button>
  </div>
</template>

<script lang="ts" setup>
import { inject } from 'vue';
import { STATIC_BASE_URL } from '@/constants';
import { uiKitKey } from '@/types/symbols';

const uiKit = inject(uiKitKey);
const { MBaseButton } = uiKit!;
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
</style>
