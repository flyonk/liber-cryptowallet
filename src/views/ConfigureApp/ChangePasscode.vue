<template>
  <t-top-navigation with-fixed-footer @click:left-icon="router.back()">
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
      <m-base-button
        block
        @click="router.push({ name: Route.ChangePasscodeEnter })"
      >
        {{ $t('views.profile.profileSettings.changePasscode') }}
      </m-base-button>
    </template>
  </t-top-navigation>
</template>

<script lang="ts" setup>
import { inject } from 'vue';
import { useRouter } from 'vue-router';

import { STATIC_BASE_URL } from '@/constants';
import { Route } from '@/router/types';

import { TTopNavigation } from '@/components/ui';
import { uiKitKey } from '@/types/symbols';

const uiKit = inject(uiKitKey);
const { MBaseButton } = uiKit!;

const router = useRouter();
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
