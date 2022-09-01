<template name="DashboardVerification">
  <div class="verification">
    <div class="dragndrop">
      <img
        v-if="isVerificationSuccess"
        src="@/assets/images/verification_success.jpg"
      />
      <img v-else src="@/assets/images/dragndrop-bg.png" />
      <div v-if="isVerificationSuccess" class="main">
        <h1 class="title">{{ $t('views.dashboard.verification.verified') }}</h1>
        <div class="description">
          {{ $t('views.dashboard.verification.successDescription') }}
        </div>
      </div>
      <div v-else class="main">
        <h1 class="title">{{ $t('views.dashboard.verification.failed') }}</h1>
        <div class="description">
          {{ $t('views.dashboard.verification.failDescription') }}
        </div>
      </div>
      <div class="controls">
        <button v-if="isVerificationSuccess" class="btn">
          {{ $t('views.dashboard.verification.deposit') }}
        </button>
        <button v-else class="btn">
          {{ $t('views.dashboard.verification.tryAgain') }}
        </button>
        <button class="btn">
          {{ $t('views.dashboard.verification.close') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const isVerificationSuccess = ref(true);
</script>

<style scoped lang="scss">
.verification {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 10px 60px;
  height: 100%;

  > .dragndrop {
    display: flex;
    flex-direction: column;
    width: 343px;
    height: 345px;
    border-radius: 24px;

    > image {
      width: 200px;
    }

    > .main {
      display: flex;
      flex-direction: column;
      padding-top: 24px;
      margin-bottom: 58px;

      > .title {
        font-weight: 600;
        font-size: 22px;
        line-height: 34px;
        text-align: center;
        letter-spacing: -0.0026em;
        margin-bottom: 16px;
      }

      > .description {
        font-size: 17px;
        line-height: 22px;
        text-align: center;
        letter-spacing: -0.0043em;
        color: $color-brand-primary;
      }
    }

    > .controls {
      > .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 24px;
        width: 343px;
        height: 48px;
        background: $color-primary;
        border-radius: 13px;
        color: $color-white;
        font-weight: 600;
        font-size: 17px;

        &:last-child {
          background: transparent;
          color: $color-primary;
        }
      }
    }
  }
}
</style>
