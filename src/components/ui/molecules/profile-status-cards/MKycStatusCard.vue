<template>
  <div class="status-card">
    <div class="header">
      <img
        class="image"
        :src="`${STATIC_BASE_URL}/static/todo/empty-profile.svg`"
        alt="status image"
      />
      <i :class="cardInfo.stateIcon" class="icon" />
    </div>
    <div class="body">
      <h1 class="title">
        {{ cardInfo.title }}
      </h1>
      <h1 class="description">
        {{ cardInfo.description }}
      </h1>
      <base-button
        v-if="cardInfo.isCtaRequired"
        class="cta"
        @click="$router.push({ name: Route.KYCMain })"
      >
        {{
          $t('views.profile.profilePhonesAndEmails.verifyIdentity')
        }}</base-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { BaseButton } from '@/components/ui';
import { EKYCStatus } from '@/models/profile/profile';
import { computed, PropType } from 'vue';
import { useI18n } from 'vue-i18n';
import { STATIC_BASE_URL } from '@/constants';
import { Route } from '@/router/types';
const { tm } = useI18n();

interface IKycStatusCard {
  title: string;
  description: string;
  isCtaRequired?: string;
  imgSrc: string;
  stateIcon: string;
}

const props = defineProps({
  kycStatus: {
    type: Number as PropType<EKYCStatus>,
    required: true,
  },
});

const cardInfo: IKycStatusCard = computed(() => {
  switch (props.kycStatus) {
    case EKYCStatus.not_started: {
      const title = tm(
        'views.profile.profilePhonesAndEmails.yourIdentityIsNotVerified'
      );
      const description = tm(
        'views.profile.profilePhonesAndEmails.friendsCanSendYouMoney'
      );
      const isCtaRequired = true;
      const imgSrc = `${STATIC_BASE_URL}/static/todo/empty-profile.svg`;
      const stateIcon = 'icon-attention_error';

      return { title, description, isCtaRequired, imgSrc, stateIcon };
    }
    case EKYCStatus.pending: {
      const title = tm(
        'views.profile.profilePhonesAndEmails.verificationInProgress'
      );
      const description = tm(
        'views.profile.profilePhonesAndEmails.weWillEmailAndSmsToYouVerification'
      );
      const imgSrc = `${STATIC_BASE_URL}/static/todo/empty-profile.svg`;
      const stateIcon = 'icon-attention_error';

      return { title, description, imgSrc, stateIcon };
    }
    case EKYCStatus.rejected: {
      const title = tm(
        'views.profile.profilePhonesAndEmails.yourIdentityIsNotVerified'
      );
      const description = tm(
        'views.profile.profilePhonesAndEmails.friendsCanSendYouMoney'
      );
      const isCtaRequired = true;
      const imgSrc = `${STATIC_BASE_URL}/static/todo/empty-profile.svg`;
      const stateIcon = 'icon-attention_error';

      return { title, description, isCtaRequired, imgSrc, stateIcon };
    }
    default: {
      return '';
    }
  }
});
</script>

<style lang="scss" scoped>
.status-card {
  padding: 24px;
  width: 100%;
  background: $color-light-grey-300;

  > .header {
    display: flex;
    justify-content: space-between;
    justify-items: start;

    > .icon {
      color: $color-primary;
      font-size: 20px;
    }
  }

  > .body {
    margin-top: 16px;

    > .title {
      font-weight: 700;
      font-size: 17px;
      line-height: 22px;
      letter-spacing: -0.0043em;
      color: $color-brand-primary;
    }

    > .description {
      margin-top: 8px;
      font-weight: 400;
      font-size: 17px;
      line-height: 22px;
      letter-spacing: -0.0043em;
      color: $color-brand-primary;
    }

    > .cta {
      margin-top: 16px;
      width: 100%;
    }
  }
}
</style>
