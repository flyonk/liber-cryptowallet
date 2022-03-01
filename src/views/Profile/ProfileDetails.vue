<template name="ProfileEdit">
  <div class="profile-edit">
    <div class="profile-header">
      <img
        class="back"
        src="@/assets/icon/arrow-left.svg"
        alt="arrow-left"
        @click="$router.push('/profile')"
      >
      <div class="name-info">
        <h1 class="title">
          Edit Profile
        </h1>
        <div class="initials">
          {{ nameInitials }}
        </div>
      </div>
    </div>
    <div class="personal-information">
      <h1 class="subtitle">
        Personal Information
      </h1>
      <div class="edit-form">
        <BaseInput
          v-model="user.name"
          type="text"
        >
          <template #label>
            Name
          </template>
        </BaseInput>
        <BaseInput
          v-model="user.liberID"
          type="text"
        >
          <template #label>
            Liber ID
          </template>
        </BaseInput>
        <BaseInput
          v-model="user.date_of_birth"
          type="text"
          pattern="\d*"
        >
          <template #label>
            Date of Birth
          </template>
        </BaseInput>
        <BaseInput
          v-model="user.residential_address"
          type="text"
        >
          <template #label>
            Residential Address
          </template>
        </BaseInput>
        <BaseButton class="btn">
          Verify Identity
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BaseInput from '@/components/UI/BaseInput.vue'
import BaseButton from '@/components/UI/BaseButton.vue'

const accountName = 'Abraham Watson';
const user = {
  name: '',
  liberID: '',
  date_of_birth: '',
  residential_address: ''
}
// const accountID = '@abrahamwatson';

const nameInitials = computed(() => {
  let parts = accountName.split(' ');
  return parts[0][0] + parts[1][0];
});


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

  > .initials {
    height: 56px;
    width: 56px;
    background: $color-yellow-100;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    align-self: center;
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

  >.btn {
    margin-top: auto;
  }
}
</style>
