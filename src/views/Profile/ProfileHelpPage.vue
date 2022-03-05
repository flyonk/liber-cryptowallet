<template name="ProfilePersonalDetails">
  <div class="personal-details">
    <div class="header">
      <img
        class="back"
        src="@/assets/icon/arrow-left.svg"
        alt="arrow-left"
        @click="$router.push('/profile')"
      />
      <div class="title">
        {{ $t('views.profile.profileHelp.hello') }} Abraham Watson, {{ $t('views.profile.profileHelp.help') }}
      </div>
      <BaseInput type="string">
        <template #label> {{ $t('views.profile.profileHelp.question') }} </template>
      </BaseInput>
    </div>
    <h6 class="subtitle">{{ $t('views.profile.profileHelp.issue') }}</h6>
    <ul class="issues-list">
      <li class="item">
        <p class="text">{{ $t('views.profile.profileHelp.secure') }}</p>
        <img class="right" src="@/assets/icon/arrow-right.svg" alt="right" />
      </li>
      <li class="item">
        <p class="text">{{ $t('views.profile.profileHelp.destinationTag') }}</p>
        <img class="right" src="@/assets/icon/arrow-right.svg" alt="right" />
      </li>
      <li class="item">
        <p class="text">{{ $t('views.profile.profileHelp.process') }}</p>
        <img class="right" src="@/assets/icon/arrow-right.svg" alt="right" />
      </li>
      <li class="item">
        <p class="text">{{ $t('views.profile.profileHelp.gamblingBlock') }}</p>
        <img class="right" src="@/assets/icon/arrow-right.svg" alt="right" />
      </li>
      <li class="item">
        <p class="text">{{ $t('views.profile.profileHelp.topUpAccount') }}</p>
        <img class="right" src="@/assets/icon/arrow-right.svg" alt="right" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import BaseInput from '@/components/UI/BaseInput.vue';
</script>

<style lang="scss" scoped>
.personal-details {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 60px 16px 50px;
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

  > .subtitle {
    font-weight: 600;
    font-size: 13px;
    line-height: 18px;
    letter-spacing: -0.0008em;
    color: $color-dark-grey;
    margin-bottom: 15px;
  }
}

.issues-list {
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  border: 1px solid #ebecf0;
  border-radius: 15px;

  > .item {
    padding: 15px;
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
      font-weight: 500;
      font-size: 16px;
      line-height: 21px;
      display: flex;
      align-items: center;
      letter-spacing: -0.0031em;
      color: $color-brand-primary;
    }
  }
}
</style>
