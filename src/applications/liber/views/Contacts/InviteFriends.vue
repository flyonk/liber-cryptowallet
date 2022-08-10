<template name="invite-friends">
  <t-top-navigation class="min-h-screen">
    <template #title>Invite Friends</template>
    <template #content>
      <div class="content-block flex flex-column justify-center h-full">
        <p class="text--body mb-3">
          Invite a friend and share the Liber experience with them
        </p>
        <div class="controls flex w-full h-full">
          <m-base-button size="large" class="mr-2 w-1/2"
            ><p class="text--footnote whitespace-nowrap">
              <i class="icon-link" /> Share Link
            </p></m-base-button
          >
          <m-base-button size="large" class="w-1/2"
            ><p class="text--footnote whitespace-nowrap">
              Invite by Phone or Email
            </p></m-base-button
          >
        </div>
        <div class="main">
          <img
            :src="`${STATIC_BASE_URL}/static/illustrations/empty_friend.png`"
            alt="friend"
            class="image"
          />
          <h2 class="text--title-3 font-semibold mb-1">
            Enable contacts permission
          </h2>
          <p class="text-default mb-4">
            Quickly invite friends from your contacts list
          </p>
          <p class="link text--headline">Allow access to contacts</p>
        </div>
      </div>
    </template>
  </t-top-navigation>
</template>

<script setup lang="ts">
import { inject } from 'vue';
// import { Route } from '@/router/types';
// import { uiKitKey } from '@/types/symbols';
// import { useRouter } from 'vue-router';
// import { useAccountStore } from '@/applications/liber/stores/account';
import { STATIC_BASE_URL } from '@/constants';
import { TTopNavigation } from '@/components/ui';
import { uiKitKey } from '@/types/symbols';

const uiKit = inject(uiKitKey);
const { MBaseButton } = uiKit!;
</script>

<style lang="scss" scoped>
.content-block {
  > .controls {
    margin-bottom: 105px;

    @include iPhoneSE {
      margin-bottom: 40px;
    }
  }

  > .main {
    display: flex;
    flex-direction: column;
    align-items: center;

    > .image {
      width: 155px;
      margin-bottom: 105px;

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
