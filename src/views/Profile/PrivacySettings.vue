<template name="PrivacySettings">
  <t-top-navigation @click:left-icon="$router.push('/profile')">
    <template #title>{{ $t('views.profile.profilePrivacy.privacy') }}</template>
    <template #content
      ><div class="privacy-settings">
        <main class="main">
          <h6 class="text--footnote mb-2 color-dark-gray">
            {{ $t('views.profile.profilePrivacy.marketing') }}
          </h6>
          <section class="section">
            <div class="header">
              <h3 class="text--body color-main font-medium">
                {{ $t('views.profile.profilePrivacy.marketingEmails') }}
              </h3>
              <MBaseSwitch
                class="switch"
                :model-value="_isEmail"
                @update:model-value="handleEmailUpdate"
              />
            </div>
            <div class="description text--footnote">
              {{ $t('views.profile.profilePrivacy.receiveEmails') }}
            </div>
          </section>
          <hr class="separator" />
          <section class="section">
            <div class="header">
              <h3 class="text--body color-main font-medium">
                {{ $t('views.profile.profilePrivacy.marketingPushes') }}
              </h3>
              <MBaseSwitch
                class="switch"
                :model-value="_isPushNotification"
                @update:model-value="handlePushesUpdate"
              />
            </div>
            <div class="description text--footnote">
              {{ $t('views.profile.profilePrivacy.receivePushNotifications') }}
            </div>
          </section>
          <hr class="separator" />
          <section class="section">
            <div class="header">
              <h3 class="text--body color-main font-medium mb-1">
                {{ $t('views.profile.profilePrivacy.social') }}
              </h3>
              <MBaseSwitch
                class="switch"
                :model-value="_isSocialMedia"
                @update:model-value="handleSocialMediaUpdate"
              />
            </div>
            <div class="description text--footnote">
              {{ $t('views.profile.profilePrivacy.shareInformation') }}
            </div>
          </section>
        </main>
      </div></template
    >
  </t-top-navigation>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue';
import { useProfileStore } from '@/stores/profile';
import { onMounted } from 'vue-demi';

import { TTopNavigation } from '@/components/ui';
import { uiKitKey } from '@/types/symbols';

const uiKit = inject(uiKitKey);
const { MBaseSwitch } = uiKit!;

const profileStore = useProfileStore();
let _isEmail = ref(false);
let _isPushNotification = ref(false);
let _isSocialMedia = ref(false);

onMounted(async () => {
  if (!profileStore.getMarketing) {
    await profileStore.init();
  }

  const { isEmail, isPushNotification, isSocialMedia } =
    await profileStore.getMarketingFromStorage();
  _isEmail.value = isEmail;
  _isPushNotification.value = isPushNotification;
  _isSocialMedia.value = isSocialMedia;
});

const handleEmailUpdate = async () => {
  _isEmail.value = !_isEmail.value;
  profileStore.getMarketing.isEmail = _isEmail.value;
  await profileStore.setMarketingToStorage();
};

const handlePushesUpdate = async () => {
  _isPushNotification.value = !_isPushNotification.value;
  profileStore.getMarketing.isPushNotification = _isPushNotification.value;
  await profileStore.setMarketingToStorage();
};

const handleSocialMediaUpdate = async () => {
  _isSocialMedia.value = !_isSocialMedia.value;
  profileStore.getMarketing.isSocialMedia = _isSocialMedia.value;
  await profileStore.setMarketingToStorage();
};
</script>

<style lang="scss">
.privacy-settings {
  height: 100%;
  flex-grow: 1;
  overflow: auto;

  > .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  > .main > .section {
    margin: 17px 0;
  }

  > .main > .section > .header {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  > .main > .section > .description {
    width: 235px;
    font-family: Inter, sans-serif;
    color: $color-dark-grey;
  }

  > .main > .separator {
    background: $color-grey;
    opacity: 0.3;
  }
}
</style>
