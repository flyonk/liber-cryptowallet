<template name="ProfileEdit">
  <t-top-navigation
    with-fixed-footer
    left-icon-name="icon-app-navigation-close"
    @click:left-icon="$router.push('/profile')"
  >
    <template #title>{{
      $t('views.profile.profilePhonesAndEmails.acceptedPhonesAndEmails')
    }}</template>
    <template #top-right>
      <i class="icon-plus_circle add" @click="$router.back()" />
    </template>
    <template #content>
      <div class="profile-info">
        <h1 class="title">Liber ID</h1>
        <div class="data-container">
          <div class="row">
            <div class="wrapper">
              <i class="icon-verification icon" />
              <div class="id">@shootemov</div>
            </div>
            <i class="icon-copy icon" />
          </div>
        </div>
      </div>
      <div v-if="true" class="status-container">
        <div class="header">
          <img
            class="image"
            :src="`${STATIC_BASE_URL}/static/todo/empty-profile.svg`"
            alt="story"
          />
          <i class="icon-attention_error icon" />
        </div>
        <div class="body">
          <h1 class="title">
            {{
              $t(
                'views.profile.profilePhonesAndEmails.notificationContainerTitle'
              )
            }}
          </h1>
          <h1 class="description">
            {{
              $t(
                'views.profile.profilePhonesAndEmails.notificationContainerDescription'
              )
            }}
          </h1>
          <base-button class="cta">
            {{
              $t(
                'views.profile.profilePhonesAndEmails.notificationContainerCta'
              )
            }}</base-button
          >
        </div>
      </div>
      <div class="body-container">
        <h1 class="title">
          {{ $t('views.profile.profilePhonesAndEmails.acceptedContact') }}
        </h1>
        <ul class="data-list">
          <li class="item">
            <div class="label">Phone</div>
            <div class="value">
              <div class="phone">+7 777 777 77 77</div>
              <i class="icon-trash_full icon" />
            </div>
          </li>
          <li class="item">
            <div class="label">Email</div>
            <div class="value">
              <div class="email">test@example.com</div>
              <i class="icon-trash_full icon" />
            </div>
          </li>
        </ul>
        <!-- <ul>
          <li>
            <base-input v-model="phone" class="">
              <template #label> Email or Phone </template>
              <template v-if="phone.length > 1" #append>
                <i class="icon-plus_circle" @click="clearPhone" />
              </template>
            </base-input>
          </li>
        </ul> -->
        <base-button
          class="phone-adder"
          view="flat"
          icon-left="ci-plus"
          @click="true"
        >
          + {{ $t('views.newcontact.additionalphone') }}
        </base-button>
      </div>
    </template>
  </t-top-navigation>
</template>

<script setup lang="ts">
import { TTopNavigation } from '@/components/ui';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Route } from '@/router/types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BaseButton, BaseInput } from '@/components/ui';

import { STATIC_BASE_URL } from '@/constants';
import { ref } from 'vue';

const phone = ref('');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function clearPhone() {
  phone.value = '';
}
</script>

<style lang="scss" scoped>
.profile-info {
  > .title {
    font-weight: 600;
    font-size: 20px;
    line-height: 25px;
    letter-spacing: -0.0045em;
    color: $color-brand-primary;
  }

  > .data-container {
    > .row {
      border-bottom: 1px solid rgb(175 179 195 / 30%);
      padding: 16px 0;
      display: flex;
      justify-content: space-between;

      > .wrapper {
        display: flex;

        > .icon {
          color: $color-green-400;
          font-size: 20px;
        }

        > .id {
          margin-left: 5px;
          font-weight: 500;
          font-size: 17px;
          line-height: 22px;
          display: flex;
          align-items: center;
          letter-spacing: -0.0043em;
          color: $color-brand-primary;
        }
      }

      > .icon {
        color: $color-primary;
        font-size: 24px;
      }
    }
  }
}

.status-container {
  position: relative;
  width: calc(100% + 40px);
  left: -20px;
  padding: 24px 16px;
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

.body-container {
  margin-top: 24px;

  > .title {
    font-weight: 600;
    font-size: 20px;
    line-height: 25px;
    letter-spacing: -0.0045em;
    color: $color-brand-primary;
  }

  > .data-list {
    > .item {
      border-bottom: 1px solid rgb(175 179 195 / 30%);
      padding: 16px 0;

      > .label {
        font-weight: 500;
        font-size: 11px;
        line-height: 13px;
        letter-spacing: 0.0006em;
        color: $color-dark-grey;
      }

      > .value {
        display: flex;
        justify-content: space-between;

        > .phone {
          font-weight: 500;
          font-size: 17px;
          line-height: 22px;
          letter-spacing: -0.0043em;
        }

        > .email {
          font-weight: 500;
          font-size: 17px;
          line-height: 22px;
          letter-spacing: -0.0043em;
        }

        > .icon {
          color: $color-grey-500;
          font-size: 20px;
        }
      }
    }
  }

  > .phone-adder {
    margin-top: 30px;
  }
}

.add {
  font-size: 32px;
  color: $color-primary;
}
</style>
