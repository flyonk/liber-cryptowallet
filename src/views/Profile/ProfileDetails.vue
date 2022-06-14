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
        <ContactInitials :name="accountName" />
      </div>
    </template>
    <template #content>
      <div class="personal-information">
        <h1 class="subtitle">
          {{ $t('views.profile.profileEdit.personalInfo') }}
        </h1>
        <div class="edit-form">
          <BaseInput v-model="user.name" type="text">
            <template #label>
              {{ $t('views.profile.profileEdit.name') }}
            </template>
          </BaseInput>
          <BaseInput v-model="user.liberID" type="text">
            <template #label>
              {{ $t('views.profile.profileEdit.id') }}
            </template>
          </BaseInput>
          <BaseInput v-model="user.date_of_birth" type="text" pattern="\d*">
            <template #label>
              {{ $t('views.profile.profileEdit.dateOfBirth') }}
            </template>
          </BaseInput>
          <BaseInput v-model="user.residential_address" type="text">
            <template #label>
              {{ $t('views.profile.profileEdit.address') }}
            </template>
          </BaseInput>
        </div>
      </div></template
    >
    <template #fixed-footer>
      <BaseButton class="footer-btn">
        {{ $t('views.profile.profileEdit.verify') }}
      </BaseButton>
    </template>
  </t-top-navigation>
</template>

<script setup lang="ts">
import BaseInput from '@/components/ui/molecules/base-input/BaseInput.vue';
import BaseButton from '@/components/ui/molecules/base-button/BaseButton.vue';
import ContactInitials from '@/components/ui/atoms/ContactInitials.vue';
import { TTopNavigation } from '@/components/ui';

const accountName = 'Abraham Watson';
const user = {
  name: '',
  liberID: '',
  date_of_birth: '',
  residential_address: '',
};
// const accountID = '@abrahamwatson';
</script>

<style lang="scss" scoped>
.profile-edit {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 60px 16px 50px;
  flex-grow: 1;
  overflow: auto;
}

.profile-header {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  > .back {
    margin-bottom: 20px;
    width: 24px;
    height: 24px;
  }
}

.name-info {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  > .title {
    font-weight: 800;
    font-size: 28px;
    line-height: 34px;
    letter-spacing: 0.0038em;
    margin-bottom: 8px;
  }
}

.personal-information {
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  > .subtitle {
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    line-height: 18px;
    color: $color-brand-2-300;
    margin-bottom: 15px;
  }
}

.edit-form {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.footer-btn {
  width: 100%;
}

.initials-wrapper > :deep(.initials) {
  width: 56px;
  height: 56px;
}
</style>
