<template>
  <t-top-navigation
    v-if="showInfo"
    with-fixed-footer
    @click:left-icon="router.back()"
  >
    <template #title>
      {{ $t('views.profile.profileSettings.changePasscode') }}
    </template>
    <template #content>
      <div class="splash">
        <div class="illustration">
          <img
            :src="`${STATIC_BASE_URL}/static/illustrations/devices.png`"
            alt="devices"
          />
          <span class="text text--title-3 font-weight--semibold">
            {{ $t('views.changePasscode.aboutLiber') }}
          </span>
        </div>
      </div>
    </template>
    <template #fixed-footer>
      <base-button block @click="showInfo = !showInfo">
        {{ $t('views.profile.profileSettings.changePasscode') }}
      </base-button>
    </template>
  </t-top-navigation>
  <t-top-navigation
    v-else
    left-icon-name="icon-app-navigation-close"
    class="passcode-container"
    @click:left-icon="router.back()"
  >
    <template #title>
      {{ $t('views.passcodeEnter.newPasscode') }}
    </template>
    <template #content>
      <div class="passcode">
        <base-passcode
          :action-type="EPasscodeActions.update"
          @submit="onSubmit"
        />
      </div>
    </template>
  </t-top-navigation>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { EPasscodeActions } from '@/types/base-component';
import { STATIC_BASE_URL } from '@/constants';

import { BaseButton, BasePasscode, TTopNavigation } from '@/components/ui';

const router = useRouter();
const showInfo = ref(true);
</script>

<style lang="scss" scoped>
.change-passcode {
  padding: 0 16px;
}

.splash {
  & > .illustration {
    display: flex;
    flex-direction: column;
    align-items: center;

    & > .text {
      text-align: center;
    }
  }
}

.passcode {
  margin: 132px 0 0;
}
</style>
