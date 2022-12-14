<template name="CloseAccount">
  <div v-if="showMenu" class="close-account">
    <img
      alt="logo"
      class="logo"
      :src="`${STATIC_BASE_URL}/static/media/logo.png`"
    />
    <h5 class="title">
      {{ $t('views.profile.profileSettings.preventClosingAccount') }}
    </h5>
    <p class="description">
      {{ $t('views.profile.profileSettings.freeToKeep') }}
    </p>
    <div class="control-buttons">
      <m-base-button class="keepopen" size="large" @click="$emit('closeMenu')">
        {{ $t('views.profile.profileSettings.keepOpen') }}
      </m-base-button>
      <m-base-button
        class="close"
        size="large"
        view="flat"
        @click="onCloseAccount"
      >
        {{ $t('views.profile.profileSettings.close') }}
      </m-base-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject, toRefs } from 'vue';
import { useRouter } from 'vue-router';

import { useProfileStore } from '@/stores/profile';
import { Route } from '@/router/types';

import { STATIC_BASE_URL } from '@/constants';

import { uiKitKey } from '@/types/symbols';

const uiKit = inject(uiKitKey);
const { MBaseButton } = uiKit!;

const profileStore = useProfileStore();
const router = useRouter();

const props = defineProps({
  showMenu: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['closeMenu']);

const { path } = toRefs(props);
console.log(path);

const onCloseAccount = async () => {
  await profileStore.closeAccount();

  router.push({ name: Route.WelcomeLogoScreen });
};
</script>

<style lang="scss" scoped>
.close-account {
  display: flex;
  padding: 150px 16px 100px;
  background: $color-white;
  border-radius: 15px 15px 0 0;
  z-index: 2;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 15px rgb(0 0 0 / 10%);
  width: 100%;
  height: 90%;
  position: absolute;
  bottom: 0;
  left: 0;

  > .logo {
    height: 55px;
    margin-bottom: 85px;
  }

  > .title {
    font-weight: 600;
    font-size: 20px;
    line-height: 25px;
    text-align: center;
    letter-spacing: -0.0045em;
    color: $color-brand-primary;
    margin-bottom: 15px;
  }

  > .description {
    padding: 0 20px;
    font-size: 17px;
    line-height: 22px;
    text-align: center;
    letter-spacing: -0.0043em;
    color: $color-brand-2-300;
  }

  > .control-buttons {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: auto;

    > .close {
      margin-top: 8px;
      height: 48px;
      color: $color-primary;
      background: none;
    }
  }
}
</style>
