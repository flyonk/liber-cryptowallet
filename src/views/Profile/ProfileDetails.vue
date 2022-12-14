<template name="ProfileEdit">
  <t-top-navigation
    with-fixed-footer
    @click:left-icon="$router.push('/profile')"
  >
    <template #title>{{
      $t('views.profile.profileEdit.editProfile')
    }}</template>
    <template #right>
      <div class="initials-wrapper">
        <a-contact-initials :name="accountName" />
      </div>
    </template>
    <template #content>
      <div class="list-title font-weight--semibold text--footnote">
        {{ $t('views.profile.profileEdit.personalInfo') }}
      </div>
      <div class="list-item">
        <div class="title text--callout font-weight--medium">
          {{ $t('views.profile.profileEdit.name') }}
        </div>
        <div class="text--body font-weight--medium">
          {{ accountName }}
        </div>
      </div>
      <div class="list-item">
        <div class="title text--callout font-weight--medium">
          {{ $t('views.profile.profileEdit.dateOfBirth') }}
        </div>
        <div class="text--body font-weight--medium">
          {{ birthDate }}
        </div>
      </div>

      <div class="list-title font-weight--semibold text--footnote -second">
        {{ $t('views.profile.profileEdit.homeAddress') }}
      </div>
      <div class="list-item text--body font-weight--medium">
        {{ addressField }}
      </div>
    </template>
    <template #fixed-footer>
      <m-base-button
        class="footer-btn"
        @click="$router.push({ name: Route.ProfileChangeAddress })"
      >
        {{ $t('views.profile.profileEdit.changeHomeAddress') }}
      </m-base-button>
    </template>
  </t-top-navigation>
</template>

<script setup lang="ts">
import { computed, inject, onBeforeMount } from 'vue';

import { useProfileStore } from '@/stores/profile';
import { formatToNormalDate } from '@/helpers/datetime';
import { Route } from '@/router/types';

import { TTopNavigation } from '@/components/ui';
import { uiKitKey } from '@/types/symbols';

const uiKit = inject(uiKitKey);
const { AContactInitials, MBaseButton } = uiKit!;

const profileStore = useProfileStore();

const user = computed(() => profileStore.getUser);

const birthDate = computed(() =>
  user.value.birthDate ? formatToNormalDate(user.value.birthDate) : ''
);

const addressField = computed(() =>
  user.value.city && user.value.state
    ? `${user.value.streetAndNumber}, ${user.value.optionalAddress}, ${user.value.postalCode}, ${user.value.state}, ${user.value.city}`
    : 'No Address selected'
);

const accountName = computed(
  () => `${user.value.firstName} ${user.value.lastName}`
);

onBeforeMount(async () => {
  await profileStore.init();
});
</script>

<style lang="scss" scoped>
.footer-btn {
  width: 100%;
}

.initials-wrapper > :deep(.initials) {
  width: 56px;
  height: 56px;
  flex-shrink: 0;
}

.list-item {
  border-bottom: 1px solid $color-grey;
  display: flex;
  justify-content: space-between;
  padding: 16px 0;

  > .title {
    color: $color-dark-grey;
  }
}

.list-title {
  margin: 0 0 18px;

  &.-second {
    margin: 32px 0 0;
  }
}
</style>
