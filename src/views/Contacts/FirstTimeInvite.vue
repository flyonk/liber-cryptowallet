<template name="first-invite">
  <div class="first-invite">
    <div class="header invite-header">
      <img
        class="back mr-2"
        src="@/assets/icon/close.svg"
        alt="arrow-left"
        @click="$router.push('/contacts')"
      >
      <h1
        v-if="isAllowAccessToContacts"
        class="title"
      >
        Invite Friends
      </h1>
      <h1
        v-else
        class="title"
      >
        Find youd friends
      </h1>
      <p
        v-if="isAllowAccessToContacts"
        class="description"
      >
        Invite a friend and share the Liber experience with them
      </p>
      <p
        v-else
        class="description"
      >
        Send and request money from your friends more easily, split bills and much more.
      </p>
    </div>
    <div
      v-if="isAllowAccessToContacts"
      class="invite-controls"
    >
      <button
        class="btn"
        @click="$router.push('/contacts/send_link')"
      >
        <img
          src="@/assets/icon/chain.svg"
          class="icon mr-2"
        >
        Share link
      </button>
      <button
        class="btn"
        @click="$router.push('/contacts/send/invite')"
      >
        <img
          src="@/assets/icon/invite.svg"
          class="icon mr-2"
        >
        Invite by phone or email
      </button>
    </div>
    <div
      v-if="isAllowAccessToContacts"
      class="invite-main"
    >
      <img
        class="dragndrop"
        src="@/assets/images/dragndrop-bg.png"
      >
      <h2 class="title">
        Enable contacts permission
      </h2>
      <p class="description">
        Quickly invite friends from your <br> contacts list
      </p>
      <a
        class="link"
        @click="isAllowAccessToContacts = false"
      >Allow access to contacts</a>
    </div>
    <div
      v-else
      class="invite-main"
    >
      <img
        class="dragndrop"
        src="@/assets/images/dragndrop-bg.png"
      >
      <p class="annotation">
        You can hide yourself from being visible to your CryptoWize friends at any time through your
        privacy settings.
      </p>
      <BaseButton
        class="btn mb-2"
        size="large"
        view="simple"
      >
        Allow access to contacts
      </BaseButton>
      <BaseButton
        class="btn"
        size="large"
        view="flat"
        @click="isAllowAccessToContacts = true"
      >
        Not now
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/UI/BaseButton.vue'
import { ref } from 'vue';

const isAllowAccessToContacts = ref(false)


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

  >.back {
    width: 20;
    height: 20;
    margin-bottom: 21px;
  }

  >.title {
    font-weight: 800;
    font-size: 28px;
    line-height: 34px;
    letter-spacing: 0.0038em;
    color: $color-black;
    margin-bottom: 8px;
  }

  >.description {
    font-size: 17px;
    line-height: 22px;
    letter-spacing: -0.0043em;
    color: #0D1F3C;
  }
}

.invite-controls {
  display: flex;

  >.btn {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #2862FF;
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

  >.dragndrop {
    max-height: 315px;
    margin-bottom: 24px;
  }

  >.title {
    font-weight: 600;
    font-size: 20px;
    line-height: 25px;
    text-align: center;
    letter-spacing: -0.0045em;
    color: $color-black;
    margin-bottom: 8px;
  }

  >.description {
    font-size: 16px;
    line-height: 21px;
    text-align: center;
    letter-spacing: -0.0031em;
    margin-bottom: 20px;
  }

  >.link {
    font-weight: 600;
    font-size: 17px;
    line-height: 22px;
    letter-spacing: -0.0043em;
    color: #2862FF;
    text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.04);
  }

  >.annotation {
    font-size: 13px;
    line-height: 18px;
    text-align: center;
    letter-spacing: -0.0008em;
    color: $color-brand-2-300;
    margin-bottom: 24px;
  }
}
</style>
