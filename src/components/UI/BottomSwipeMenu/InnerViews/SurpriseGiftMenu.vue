<template>
  <div class="surprise-menu">
    <p class="cancel" @click="closeMenu">Cancel</p>
    <h2 class="title">I’ve got little surprise for you 🎁</h2>
    <BaseInput type="text">
      <template #label> To </template>
    </BaseInput>
    <BaseInput type="text">
      <template #label> Cc </template>
    </BaseInput>
    <BaseInput type="text">
      <template #label> Bcc </template>
    </BaseInput>
    <BaseInput v-model="Subject" type="text">
      <template #label> Subject </template>
    </BaseInput>
    <p class="description">
      Hey managing your money would be so much easier if you had Liber. Sign up
      with my link https://cryptowize.com/referral/abraham
    </p>
    <p class="sent">Sent from my iPhone</p>
    <BaseButton class="btn mt-auto" size="large"> Send </BaseButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import BaseButton from '@/components/UI/BaseButton.vue';
import BaseInput from '@/components/UI/BaseInput.vue';

const Subject = ref('I’ve got little surprise for you 🎁');

const emit = defineEmits(['closeMenu']);
function closeMenu() {
  emit('closeMenu');
}
</script>

<style lang="scss" scoped>
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
    color: #2862ff;
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
    color: #0d1f3c;
    margin-bottom: 18px;
  }
}
</style>
