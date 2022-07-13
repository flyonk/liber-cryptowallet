<template>
  <div class="surprise-menu">
    <p class="cancel" @click="closeMenu">Cancel</p>
    <h2 class="title">I’ve got little surprise for you 🎁</h2>
    <MBaseInput type="text" class="m-base-input">
      <template #label> To </template>
    </MBaseInput>
    <MBaseInput type="text" class="m-base-input">
      <template #label> Cc </template>
    </MBaseInput>
    <MBaseInput type="text" class="m-base-input">
      <template #label> Bcc </template>
    </MBaseInput>
    <MBaseInput v-model="Subject" type="text" class="m-base-input">
      <template #label> Subject </template>
    </MBaseInput>
    <p class="description">
      Hey managing your money would be so much easier if you had Liber. Sign up
      with my link https://cryptowize.com/referral/abraham
    </p>
    <p class="sent">Sent from my iPhone</p>
    <m-base-button class="btn mt-auto" size="large"> Send </m-base-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { MBaseInput, MBaseButton } from '@liber-biz/crpw-ui-kit-liber';

const Subject = ref('I’ve got little surprise for you 🎁');

const emit = defineEmits(['closeMenu']);
function closeMenu() {
  emit('closeMenu');
}
</script>

<style lang="scss" scoped>
.m-base-input {
  margin: 0 0 16px;
}

.surprise-menu {
  bottom: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-bottom: 50px;

  > .cancel {
    font-weight: 600;
    font-size: 17px;
    line-height: 22px;
    letter-spacing: -0.0043em;
    color: $color-primary-500;
    margin-bottom: 24px;
  }

  > .title {
    font-weight: 800;
    font-size: 28px;
    line-height: 34px;
    color: $color-black;
    letter-spacing: 0.0038em;
    margin-bottom: 28px;
  }

  > .description {
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;
    letter-spacing: -0.0031em;
    color: $color-brand-550;
    margin-bottom: 18px;
  }
}
</style>
