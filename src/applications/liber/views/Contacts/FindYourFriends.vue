<template name="find-friends">
  <t-top-navigation
    left-icon-name="icon-app-navigation-close"
    class="min-h-screen"
    @click:left-icon="$router.go(-1)"
  >
    <template #title>{{ $t('views.findYourFriends.title') }}</template>
    <template #content>
      <div class="content-block flex flex-column justify-center h-full">
        <p class="description text--body">
          {{ $t('views.findYourFriends.sendMeRequest') }}
        </p>
        <div class="main">
          <img
            :src="`${STATIC_BASE_URL}/static/illustrations/friends-search.png`"
            alt="friend"
            class="image"
          />
          <p class="text--footnote text-center mb-5">
            {{ $t('views.findYourFriends.hideYourSelf') }}
          </p>
          <div class="flex w-full justify-center mb-2">
            <m-base-button size="large" class="w-full">
              {{ $t('views.findYourFriends.accessContacts') }}
            </m-base-button>
          </div>
          <div class="flex w-full justify-center">
            <m-base-button size="large" view="flat" class="w-full">
              {{ $t('views.findYourFriends.notNow') }}
            </m-base-button>
          </div>
        </div>
      </div>
    </template>
  </t-top-navigation>
</template>

<script setup lang="ts">
import { inject } from 'vue';
// import { Route } from '@/router/types';
import { uiKitKey } from '@/types/symbols';
// import { useRouter } from 'vue-router';
// import { useAccountStore } from '@/applications/liber/stores/account';
import { STATIC_BASE_URL } from '@/constants';
import { TTopNavigation } from '@/components/ui';

const uiKit = inject(uiKitKey);
const { MBaseButton } = uiKit!;
</script>
<style lang="scss" scoped>
.content-block {
  > .description {
    margin-bottom: 85px;

    @include iPhoneSE {
      margin-bottom: 40px;
    }
  }

  > .main {
    display: flex;
    flex-direction: column;
    align-items: center;

    > .image {
      width: 200px;
      margin-bottom: 85px;

      @include iPhoneSE {
        margin-bottom: 40px;
      }
    }

    > .link {
      color: #2862ff;
    }
  }
}
</style>
