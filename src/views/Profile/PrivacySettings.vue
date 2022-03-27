<template name="PrivacySettings">
  <div class="privacy-settings">
    <header class="header">
      <img
        class="back"
        src="@/assets/icon/arrow-left.svg"
        alt="arrow-left"
        @click="$router.push('/profile')"
      />
    </header>
    <h1 class="title">{{ $t('views.profile.profilePrivacy.privacy') }}</h1>
    <main class="main">
      <h6 class="subtitle">
        {{ $t('views.profile.profilePrivacy.marketing') }}
      </h6>
      <section class="section">
        <div class="header">
          <h3 class="title">
            {{ $t('views.profile.profilePrivacy.marketingEmails') }}
          </h3>
          <BaseSwitch
            class="switch"
            :model-value="profileStore.getMarketing.isEmail"
            @update:model-value="handleEmailUpdate"
          />
        </div>
        <div class="description">
          {{ $t('views.profile.profilePrivacy.receiveEmails') }}
        </div>
      </section>
      <hr class="separator" />
      <section class="section">
        <div class="header">
          <h3 class="title">
            {{ $t('views.profile.profilePrivacy.marketingPushes') }}
          </h3>
          <BaseSwitch
            class="switch"
            :model-value="profileStore.getMarketing.isPushNotification"
            @update:model-value="handlePushesUpdate"
          />
        </div>
        <div class="description">
          {{ $t('views.profile.profilePrivacy.receivePushNotifications') }}
        </div>
      </section>
      <hr class="separator" />
      <section class="section">
        <div class="header">
          <h3 class="title">{{ $t('views.profile.profilePrivacy.social') }}</h3>
          <BaseSwitch
            class="switch"
            :model-value="profileStore.getMarketing.isSocialMedia"
            @update:model-value="handleSocialMediaUpdate"
          />
        </div>
        <div class="description">
          {{ $t('views.profile.profilePrivacy.shareInformation') }}
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { BaseSwitch } from '@/components/ui';
import { useProfileStore } from '@/stores/profile';

const profileStore = useProfileStore();

const handleEmailUpdate = () => {
  profileStore.getMarketing.isEmail = !profileStore.getMarketing.isEmail;
};

const handlePushesUpdate = () => {
  profileStore.getMarketing.isPushNotification =
    !profileStore.getMarketing.isPushNotification;
};

const handleSocialMediaUpdate = () => {
  profileStore.getMarketing.isSocialMedia =
    !profileStore.getMarketing.isSocialMedia;
};
</script>

<style lang="scss">
.privacy-settings {
  height: 100%;
  padding: 60px 16px 0;
  flex-grow: 1;
  overflow: auto;

  > .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  > .title {
    font-weight: 800;
    font-size: 28px;
    line-height: 34px;
    letter-spacing: 0.0038em;
    margin-bottom: 24px;
  }

  > .main > .subtitle {
    font-weight: 600;
    font-size: 13px;
    line-height: 18px;
    letter-spacing: -0.0008em;
    color: $color-dark-grey;
    margin-bottom: 10px;
  }

  > .main > .section {
    margin: 17px 0;
  }

  > .main > .section > .header {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  > .main > .section > .header > .title {
    font-family: Inter, sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 17px;
    line-height: 22px;
    letter-spacing: -0.0043em;
    color: $color-brand-primary;
  }

  > .main > .section > .description {
    width: 235px;
    font-family: Inter, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 18px;
    letter-spacing: -0.0008em;
    color: $color-dark-grey;
  }

  > .main > .separator {
    background: $color-grey;
    opacity: 0.3;
  }
}
</style>
