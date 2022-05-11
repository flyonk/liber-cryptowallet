<template name="send-link">
  <t-top-navigation
    with-fixed-footer
    @click:left-icon="$router.push('/contacts')"
  >
    <template #title>Send Via Link</template>
    <template #content>
      <div class="main-block">
        <div class="send-currency">
          <p class="label">Recipient will get</p>
          <p class="sum">0.321573346 USDT</p>
          <BaseInput type="text">
            <template #label> Add note </template>
          </BaseInput>
        </div>
      </div></template
    >
    <template #fixed-footer>
      <BaseButton class="footer-btn" size="large">
        Share link
      </BaseButton></template
    >
  </t-top-navigation>
</template>

<script setup lang="ts">
import { BaseInput, BaseButton, TTopNavigation } from '@/components/ui';
</script>

<style lang="scss" scoped>
.send-link {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 60px 16px 30px;
  flex-grow: 1;
  overflow: auto;
}

.header-link {
  margin-bottom: 40px;

  > .back {
    width: 20;
    height: 20;
    margin-bottom: 20px;
  }

  > .title {
    font-weight: 800;
    font-size: 28px;
    line-height: 34px;
    letter-spacing: 0.0038em;
    color: $color-black;
  }
}

.main-block {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  > .btn {
    margin-top: auto;
  }
}

.send-currency {
  > .label {
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    color: $color-brand-2-300;
    margin-bottom: 5px;
  }

  > .sum {
    font-weight: 500;
    font-size: 20px;
    line-height: 25px;
    letter-spacing: -0.0045em;
    color: $color-brand-550;
    margin-bottom: 30px;
  }
}

.footer-btn {
  width: 100%;
}
</style>
