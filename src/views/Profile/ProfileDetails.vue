<template name="ProfileEdit">
  <div class="profile-edit">
    <div class="profile-header">
      <img
        class="back"
        src="@/assets/icon/arrow-left.svg"
        alt="arrow-left"
        @click="$router.push('/profile')"
      />
      <div class="name-info">
        <h1 class="title">{{ $t('views.profile.profileEdit.editProfile') }}</h1>
        <ContactInitials :name="accountName" />
      </div>
    </div>
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
          <template #label> {{ $t('views.profile.profileEdit.id') }} </template>
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
        <BaseButton class="btn">
          {{ $t('views.profile.profileEdit.verify') }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseInput from '@/components/ui/molecules/base-input/BaseInput.vue';
import BaseButton from '@/components/ui/molecules/base-button/BaseButton.vue';
import ContactInitials from '@/components/ui/atoms/ContactInitials.vue';

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

  > .btn {
    margin-top: auto;
  }
}
</style>
