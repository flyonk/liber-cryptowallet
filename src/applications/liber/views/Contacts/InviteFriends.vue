<template name="invite-friends">
  <t-top-navigation
    left-icon-name="icon-app-navigation-close"
    class="max-h-screen overflow-hidden"
    @click:left-icon="$router.go(-1)"
  >
    <template #title>{{ $t('views.inviteFriends.title') }}</template>
    <template #content>
      <div class="content-block flex flex-column justify-center h-full">
        <p class="text--body mb-3">
          {{ $t('views.inviteFriends.inviteFriend') }}
        </p>
        <div
          class="controls flex w-full h-full"
          :class="{ 'mb-5': !isContactsListAllowed }"
        >
          <m-base-button
            icon-left="icon-link"
            size="medium"
            class="grow mr-2"
            disabled
            ><p class="text--footnote whitespace-nowrap">
              {{ $t('views.inviteFriends.shareLink') }}
            </p></m-base-button
          >
          <m-base-button
            icon-left="icon-check"
            size="medium"
            class="grow"
            @click="$router.push({ name: Route.ContactsSendInvite })"
            ><p class="text--footnote whitespace-nowrap">
              {{ $t('views.inviteFriends.invitePhone') }}
            </p></m-base-button
          >
        </div>
        <div v-if="isContactsListAllowed" class="main items-center">
          <img
            :src="`${STATIC_BASE_URL}/static/illustrations/empty_friend.png`"
            alt="friend"
            class="image"
          />
          <h2 class="text--title-3 font-semibold mb-1 hidden">
            {{ $t('views.inviteFriends.enableContacts') }}
          </h2>
          <p class="text-default mb-4 hidden">
            {{ $t('views.inviteFriends.quickInvite') }}
          </p>
          <p class="link text--headline hidden">
            {{ $t('views.inviteFriends.acessContacts') }}
          </p>
        </div>
        <div v-else class="main w-full">
          <h2 class="text--footnote color-dark-gray font-medium mb-1">
            {{ $t('views.inviteFriends.contactsList.contacts') }}
          </h2>
          <p class="text--footnote mb-4">
            {{ $t('views.inviteFriends.contactsList.privacy') }}
          </p>
          <m-base-input v-model="filterContacts" type="email">
            <template #label>
              {{
                $t('views.inviteFriends.contactsList.searchFilter')
              }}</template
            >
          </m-base-input>
          <contacts-list
            :contacts="mockedContacts"
            with-radio
            @contact-click="handleContactClick"
          />
          <m-base-button
            size="large"
            view="simple"
            class="invite-btn"
            disabled
            >{{ $t('views.inviteFriends.title') }}</m-base-button
          >
        </div>
      </div>
    </template>
  </t-top-navigation>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue';
import { Route } from '@/router/types';
// import { useRoute } from 'vue-router';
// import { useAccountStore } from '@/applications/liber/stores/account';
import { STATIC_BASE_URL } from '@/constants';
import { TTopNavigation } from '@/components/ui';
import { uiKitKey } from '@/types/symbols';
import ContactsList from '@/components/ui/organisms/ContactsList.vue';
// import { useRecipientsStore } from '@/stores/recipients';
import { Contact } from '@/types/contacts';
import { mockedContacts } from '@/helpers/contacts';

const uiKit = inject(uiKitKey);
const { MBaseButton, MBaseInput } = uiKit!;

// todo handler for check first time user on this page or not after adding API someday
const isContactsListAllowed = ref(false);

const handleContactClick = (data: Contact) => {
  // todo implement logic for invite friends
  console.warn('contact data', data);
};
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
    height: 500px;
    flex-direction: column;

    @include iPhoneSE {
      height: 350px;
    }

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

.invite-btn {
  bottom: 20px;
}

:deep(.container) {
  white-space: nowrap;
}

:deep(.base-input) {
  width: 100%;
  margin-bottom: 24px;
}

:deep(.main-list) {
  max-height: 350px;
  overflow: auto;
}

:deep(.base-button) {
  min-width: 35% !important;

  &:last-child {
    min-width: 64% !important;
  }
}

.template-top-navigation > :deep(.content) {
  margin-top: 0;
}
</style>
