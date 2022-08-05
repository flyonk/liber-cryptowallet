<template name="ProfilePersonalDetails">
  <t-top-navigation @click:left-icon="$router.push('/profile')">
    <template #title>
      {{ $t('views.profile.profileHelp.hello') }}
      {{ `${firstName} ${lastName}` }},
      {{ $t('views.profile.profileHelp.help') }}</template
    >
    <template #content>
      <div class="personal-details">
        <div class="header">
          <BaseInput v-model="value" type="text">
            <template #label>
              {{ $t('views.profile.profileHelp.question') }}
            </template>
          </BaseInput>
        </div>
        <h6 class="text--footnote mb-3 color-dark-gray font-bold">
          {{ $t('views.profile.profileHelp.issue') }}
        </h6>
        <ul class="issues-list">
          <li class="item">
            <p class="text-default font-medium text">
              {{ $t('views.profile.profileHelp.secure') }}
            </p>
            <img
              class="right"
              :src="`${STATIC_BASE_URL}/static/menu/arrow-right.svg`"
              alt="right"
            />
          </li>
          <li class="item">
            <p class="text-default font-medium text">
              {{ $t('views.profile.profileHelp.destinationTag') }}
            </p>
            <img
              class="right"
              :src="`${STATIC_BASE_URL}/static/menu/arrow-right.svg`"
              alt="right"
            />
          </li>
          <li class="item">
            <p class="text-default font-medium text">
              {{ $t('views.profile.profileHelp.process') }}
            </p>
            <img
              class="right"
              :src="`${STATIC_BASE_URL}/static/menu/arrow-right.svg`"
              alt="right"
            />
          </li>
          <li class="item">
            <p class="text-default font-medium text">
              {{ $t('views.profile.profileHelp.gamblingBlock') }}
            </p>
            <img
              class="right"
              :src="`${STATIC_BASE_URL}/static/menu/arrow-right.svg`"
              alt="right"
            />
          </li>
          <li class="item">
            <p class="text-default font-medium text">
              {{ $t('views.profile.profileHelp.topUpAccount') }}
            </p>
            <img
              class="right"
              :src="`${STATIC_BASE_URL}/static/menu/arrow-right.svg`"
              alt="right"
            />
          </li>
        </ul></div
    ></template>
  </t-top-navigation>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import BaseInput from '@/components/ui/molecules/base-input/BaseInput.vue';
import { TTopNavigation } from '@/components/ui';
import { STATIC_BASE_URL } from '@/constants';

import { useProfileStore } from '@/stores/profile';

const profileStore = useProfileStore();
let { firstName, lastName } = profileStore.getUser;

const value = ref('');
</script>

<style lang="scss" scoped>
.personal-details {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: auto;

  > .header {
    margin-bottom: 40px;

    > .back {
      margin-bottom: 20px;
    }

    > .title {
      font-weight: 800;
      font-size: 28px;
      line-height: 34px;
      letter-spacing: 0.0038em;
      margin-bottom: 15px;
    }
  }
}

.issues-list {
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  border: 1px solid #ebecf0;
  border-radius: 15px;

  > .item {
    padding: 12px 46px 12px 16px;
    display: flex;
    justify-content: space-between;
    height: 72px;
    border-bottom: 1px solid #ebecf0;

    &:last-child {
      border-bottom: 0;
    }

    > .icon {
      margin-right: 12px;
    }

    > .text {
      display: flex;
      align-items: center;
      color: $color-brand-primary;
    }
  }
}
</style>
