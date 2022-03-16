<template name="AccountDevices">
  <div class="account-devices">
    <top-navigation @click:left-icon="$router.push('/profile')">
      {{ $t('views.profile.profileDevices.devices') }}
    </top-navigation>

    <p class="description">
      {{ $t('views.profile.profileDevices.allowedDevices') }}
    </p>

    <div class="main">
      <ul v-for="device in devices" :key="device.id" class="list">
        <li class="item">
          <p class="name -first">
            {{ device.device_name }}
          </p>
          <img :alt="device.agent_type" :src="getImage(device.agent_type)" />
        </li>
        <li class="item">
          <p class="name">
            {{ $t('views.profile.profileDevices.date') }}
          </p>
          <p class="description">
            {{ timestampToDate(device.logged_at) }}
          </p>
        </li>
        <li class="item">
          <p class="name">
            {{ $t('views.profile.profileDevices.location') }}
          </p>
          <p class="description">
            {{ device.location }}
          </p>
        </li>
        <li class="item">
          <p class="name">
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

<script lang="ts" setup>
import { onBeforeMount, ref, Ref } from 'vue';

import { IUserDevice, TAgentType } from '@/models/auth/devices';
import { timestampToDate } from '@/helpers/time';

import { TopNavigation } from '@/components/UI';

const mockData: IUserDevice[] = [
  {
    id: '1',
    agent_type: 'ios',
    device_name: 'iPhone XR',
    logged_at: '1641540870',
    ip: '45.234.12.154',
    location: 'Pavshino Russian Federation',
  },
  {
    id: '2',
    agent_type: 'mac',
    device_name: 'Chrome V96.0.4664.93 (Mac OS)',
    logged_at: '1641540870',
    ip: '45.234.12.154',
    location: 'Tallin Estonia',
  },
  {
    id: '3',
    agent_type: 'ios',
    device_name: 'iPhone XR',
    logged_at: '1641540870',
    ip: '45.234.12.154',
    location: 'Tbilisi Georgia',
  },
];

const devices = ref([]) as Ref<IUserDevice[]>;

onBeforeMount(() => {
  //  TODO: change when API for devices is ready
  devices.value = mockData;
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
  padding: 0 16px 50px;
  flex-grow: 1;
  overflow: auto;

  > .description {
    font-size: 17px;
    line-height: 22px;
    letter-spacing: -0.0043em;
    margin-bottom: 40px;
  }

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

        > .name {
          font-weight: 500;
          font-size: 16px;
          line-height: 21px;
          letter-spacing: -0.0031em;
          color: $color-dark-grey;

          &.-first {
            font-weight: 500;
            font-size: 17px;
            line-height: 22px;
            letter-spacing: -0.0043em;
            color: $color-brand-primary;
          }
        }

        > .description {
          font-weight: 500;
        }
      }
    }
  }
}
</style>
