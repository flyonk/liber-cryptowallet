<template name="first-invite">
  <div class="first-invite">
    <div class="header invite-header">
      <img
        class="back mr-2"
        src="@/assets/icon/close.svg"
        alt="arrow-left"
        @click="$router.push('/contacts')"
      />
      <h1 v-if="isAllowAccessToContacts" class="text--title-1 mb-2">
        {{ $t('views.sendfunds.firstTimeInvite.inviteFriends') }}
      </h1>
      <h1 v-else class="text--title-1 mb-2">
        {{ $t('views.sendfunds.firstTimeInvite.findFriends') }}
      </h1>
      <p v-if="isAllowAccessToContacts" class="description">
        {{ $t('views.sendfunds.firstTimeInvite.inviteAndShare') }}
      </p>
      <p v-else class="description text--body">
        {{ $t('views.sendfunds.firstTimeInvite.requestMoney') }}
      </p>
    </div>
    <div v-if="isAllowAccessToContacts" class="invite-controls">
      <button class="btn" @click="$router.push('/contacts/send_link')">
        <img src="@/assets/icon/chain.svg" class="icon mr-2" />
        {{ $t('views.sendfunds.firstTimeInvite.shareLink') }}
      </button>
      <button class="btn" @click="$router.push('/contacts/send/invite')">
        <img src="@/assets/icon/invite.svg" class="icon mr-2" />
        {{ $t('views.sendfunds.firstTimeInvite.invitePhone') }}
      </button>
    </div>
    <div v-if="isAllowAccessToContacts" class="invite-main">
      <img class="dragndrop" src="@/assets/images/dragndrop-bg.png" />
      <h2 class="text--title-3 mb-1">
        {{ $t('views.sendfunds.firstTimeInvite.enablePermissions') }}
      </h2>
      <p class="text-default mb-4">
        Quickly invite friends from your <br />
        contacts list
      </p>
      <a class="link text--headline" @click="isAllowAccessToContacts = false">{{
        $t('views.sendfunds.firstTimeInvite.accessContacts')
      }}</a>
    </div>
    <div v-else class="invite-main">
      <img class="dragndrop" src="@/assets/images/dragndrop-bg.png" />
      <p class="annotation text--footnote">
        {{ $t('views.sendfunds.firstTimeInvite.hideYourself') }}
      </p>
      <m-base-button class="btn mb-2" size="large" view="simple">
        {{ $t('views.sendfunds.firstTimeInvite.accessContacts') }}
      </m-base-button>
      <m-base-button
        class="btn"
        size="large"
        view="flat"
        @click="isAllowAccessToContacts = true"
      >
        {{ $t('views.sendfunds.firstTimeInvite.notNow') }}
      </m-base-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { uiKitKey } from '@/types/symbols';
import { inject, ref } from 'vue';

const uiKit = inject(uiKitKey);
const { MBaseButton } = uiKit!;

const isAllowAccessToContacts = ref(false);
</script>

<style lang="scss" scoped>
.first-invite {
  height: 100vh;
  padding: 60px 16px 0;
  flex-grow: 1;
  overflow: auto;
}

.invite-header {
  margin-bottom: 20px;

  > .back {
    width: 20;
    height: 20;
    margin-bottom: 21px;
  }

  > .description {
    color: $color-brand-550;
  }
}

.invite-controls {
  display: flex;

  > .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    background: $color-primary-500;
    border-radius: 8px;
    color: $color-white;
    font-weight: 600;
    font-size: 13px;
    line-height: 18px;
    height: 40px;
    width: 30%;
    margin-right: 8px;

    &:last-child {
      width: 70%;
      margin-right: 0;
    }
  }
}

.invite-main {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding-top: 60px;

  > .dragndrop {
    max-height: 315px;
    margin-bottom: 24px;
  }

  > .link {
    color: $color-primary-500;
    text-shadow: 0 1px 2px rgb(0 0 0 / 4%);
  }

  > .annotation {
    text-align: center;
    color: $color-brand-2-300;
    margin-bottom: 24px;
  }
}
</style>
