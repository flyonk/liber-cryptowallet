<template name="PrivacySettings">
  <div class="privacy-settings">
    <header class="header">
      <img
        class="back"
        src="@/assets/icon/arrow-left.svg"
        alt="arrow-left"
        @click="$router.push('/account/settings')"
      />
    </header>
    <h1 class="title">Privacy</h1>
    <main class="main">
      <h6 class="subtitle">Marketing</h6>
      <section class="section">
        <div class="header">
          <h3 class="title">Marketing emails</h3>
          <BaseSwitch
            class="switch"
            :modelValue="isEmailsAgreement"
            @update:model-value="
              isEmailsAgreement = !isEmailsAgreement
            "
          />
        </div>
        <div class="description">
          I am happy to receive emails about Liber products, services and offers
          that may interest me
        </div>
      </section>
      <hr class="separator" />
      <section class="section">
        <div class="header">
          <h3 class="title">Marketing pushes</h3>
          <BaseSwitch
            class="switch"
            :modelValue="isPushesAgreement"
            @update:model-value="
              isPushesAgreement = !isPushesAgreement
            "
          />
        </div>
        <div class="description">
          I am happy to receive push notifications about Liber product, services
          and offers that may interest me
        </div>
      </section>
      <hr class="separator" />
      <section class="section">
        <div class="header">
          <h3 class="title">Social media & advertising platforms</h3>
          <BaseSwitch
            class="switch"
            :modelValue="isSocialMediaAgreement"
            @update:model-value="
              isSocialMediaAgreement = !isSocialMediaAgreement
            "
          />
        </div>
        <div class="description">
          I am happy for Liber to share information, such as my name, emals
          address and app events witg social media and advertising platforms, to
          allow Liber to advertise to me and others like me and to conduct
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { BaseSwitch } from '@/components/UI';
import { ref } from 'vue';

let isEmailsAgreement = ref(true);
let isPushesAgreement = ref(true);
let isSocialMediaAgreement = ref(true);
</script>

<style lang="scss">
.privacy-settings {
  height: 100%;
  padding: 60px 16px 0;
  flex-grow: 1;
  overflow: auto;

  > .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  > .title {
    font-weight: 800;
    font-size: 28px;
    line-height: 34px;
    letter-spacing: 0.0038em;
    margin-bottom: 24px;
  }

  > .main > .subtitle {
    font-weight: 600;
    font-size: 13px;
    line-height: 18px;
    letter-spacing: -0.0008em;
    color: $color-dark-grey;
    margin-bottom: 10px;
  }

  > .main > .section {
    margin: 17px 0px 17px 0px;
  }

  > .main > .section > .header {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  > .main > .section > .header > .title {
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 17px;
    line-height: 22px;
    letter-spacing: -0.0043em;
    color: $color-brand-primary;
  }

  > .main > .section > .description {
    width: 235px;
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 18px;
    letter-spacing: -0.0008em;
    color: $color-dark-grey;
  }

  > .main > .separator {
    background: $color-grey;
    opacity: 0.3;
  }
}
</style>