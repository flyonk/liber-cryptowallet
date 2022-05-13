<template>
  <div class="change-passcode">
    <div v-if="showInfo" class="splash">
      <top-navigation>
        {{ $t('views.profile.profileSettings.changePasscode') }}
      </top-navigation>

      <div class="illustration">
        <img
          src="https://static.dev.liber.casa/illustrations/devices.png"
          alt="devices"
        />
        <span class="text text--title-3 font-weight--semibold">
          {{ $t('views.changePasscode.aboutLiber') }}
        </span>
      </div>

      <div class="footer">
        <base-button block @click="showInfo = !showInfo">
          {{ $t('views.profile.profileSettings.changePasscode') }}
        </base-button>
      </div>
    </div>
    <div v-else class="passcode-container">
      <top-navigation left-icon-name="icon-app-navigation-close">
        Enter new passcode
      </top-navigation>
      <div class="passcode">
        <base-passcode
          :action-type="EPasscodeActions.create"
          @submit="onSubmit"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import { BaseButton, BasePasscode, TopNavigation } from '@/components/ui';

import { EPasscodeActions } from '@/types/base-component';

const showInfo = ref(true);

const onSubmit = (passcode: string) => {
  console.debug('passcode', passcode);
};
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

  & > .footer {
    position: fixed;
    bottom: 50px;
    left: 16px;
    right: 16px;
  }
}

.passcode-container {
  & > .passcode {
    margin: 132px 0 0;
  }
}
</style>
