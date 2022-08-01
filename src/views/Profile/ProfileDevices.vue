<template name="AccountDevices">
  <t-top-navigation @click:left-icon="$router.push('/profile')">
    <template #title>
      {{ $t('views.profile.profileDevices.devices') }}</template
    >
    <template #subtitle>
      {{ $t('views.profile.profileDevices.allowedDevices') }}</template
    >
    <template #content>
      <div class="account-devices">
        <div class="main">
          <ul v-for="device in devices" :key="device.id" class="list">
            <li class="item">
              <p class="text--headline text-dark-gray font-medium">
                {{ device.deviceName }}
              </p>
              <img :alt="device.agent_type" :src="getImage(device.agentType)" />
            </li>
            <li class="item">
              <p class="text-default text-dark-gray">
                {{ $t('views.profile.profileDevices.date') }}
              </p>
              <p class="description">
                {{ $filters.timestampToDate(device.loggedAt) }}
              </p>
            </li>
            <li class="item">
              <p class="text-default text-dark-gray">
                {{ $t('views.profile.profileDevices.location') }}
              </p>
              <p class="description">
                {{ device.location }}
              </p>
            </li>
            <li class="item">
              <p class="text-default text-dark-gray">
                {{ $t('views.profile.profileDevices.ip') }}
              </p>
              <p class="description">
                {{ device.ip }}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </template>
  </t-top-navigation>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref, Ref } from 'vue';

import { IUserDevice, TAgentType } from '@/models/auth/devices';
import { useAuthStore } from '@/stores/auth';

import { TTopNavigation } from '@/components/ui';

const authStore = useAuthStore();

const devices = ref([]) as Ref<IUserDevice[]>;

onBeforeMount(async () => {
  devices.value = await authStore.getDevices();
});

function getImage(agentType: TAgentType): string {
  if (agentType === 'ios' || agentType === 'android') {
    return require('@/assets/icon/mobile.svg');
  }

  return require('@/assets/icon/monitor.svg');
}
</script>

<style lang="scss" scoped>
.account-devices {
  display: flex;
  flex-direction: column;
  height: 100vh;
  flex-grow: 1;
  overflow: auto;

  > .main {
    > .list {
      border-bottom: 1px solid rgb(175 179 195 / 30%);
      margin-bottom: 25px;

      > .item {
        display: flex;
        width: 100%;
        justify-content: space-between;
        margin-bottom: 12px;

        &:first-child {
          margin-bottom: 20px;
        }

        > .description {
          font-weight: 500;
        }
      }
    }
  }
}
</style>
