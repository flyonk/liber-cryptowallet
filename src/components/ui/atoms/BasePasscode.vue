<template>
  <div class="base-passcode">
    <div class="code">
      <div
        v-for="circle in 4"
        :key="circle"
        :class="{ '-active': passcode.length >= circle }"
        class="circle-wrapper"
      />
    </div>

    <div class="controls">
      <div
        v-for="item in 9"
        :key="item"
        class="number-button text--large-title"
        @click="setNumber(item.toString())"
      >
        {{ item }}
      </div>
      <div class="number-button" @click="showTouchId">
        <template v-if="props.showTouchFaceid">
          <img v-if="identificationIcon" :src="identificationIcon" alt />
        </template>
      </div>
      <div class="number-button text--large-title" @click="setNumber('0')">
        0
      </div>
      <div class="number-button" @click="clear">
        <img alt src="@/assets/icon/clear-button.svg" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, PropType, ref } from 'vue';
import { get, set } from '@/helpers/storage';

import { getSupportedOptions, verifyIdentity } from '@/helpers/identification';
import { EPasscodeActions } from '@/types/base-component';
import { EStorageKeys } from '@/types/storage';

const props = defineProps({
  actionType: {
    type: String as PropType<EPasscodeActions>,
    default: EPasscodeActions.compare,
  },
  showTouchFaceid: {
    type: Boolean,
    default: true,
  },
});

const getStoredPasscode = async () => {
  const value = await get(EStorageKeys.passcode);
  return value || '0000';
};

async function checkPasscode(passcode: string) {
  const storedPassCode = await getStoredPasscode();
  return storedPassCode === passcode;
}

async function setPasscode(passcode: string) {
  await set({
    key: EStorageKeys.passcode,
    value: passcode,
  });
  return true;
}

function getSubmitFunction(actionType: string) {
  switch (actionType) {
    case EPasscodeActions.store:
      return setPasscode;
    case EPasscodeActions.compare:
      return checkPasscode;

    default:
      return checkPasscode;
  }
}

const onSubmit = getSubmitFunction(props.actionType);

const showTouchId = () => {
  if (identificationIcon.value) {
    verifyIdentity()
      .then(() => {
        emit('submit', true);
      })
      .catch(() => {
        emit('submit', false);
      });
  }
};

const identificationIcon = ref('');
const passcode = ref('');

onBeforeMount(async (): Promise<void> => {
  const option = await getSupportedOptions();

  if (option === 'face-id') {
    identificationIcon.value = require('@/assets/icon/faceid.svg');
  }
  if (option === 'touch-id') {
    identificationIcon.value = require('@/assets/icon/touchid.svg');
  }
});

/**
 * emit true value if passcode is correct
 * emit false value if passcode is wrong
 */
const emit = defineEmits(['submit']);

function setNumber(number: string): void {
  if (passcode.value.length < 4) {
    passcode.value = passcode.value + number;

    if (passcode.value.length === 4) {
      onSubmit(passcode.value)
        .then((result: boolean) => {
          if (!result) passcode.value = '';
          emit('submit', result);
        })
        .catch(() => {
          passcode.value = '';
          emit('submit', false);
        });
    }
  }
}

function clear(): void {
  passcode.value = passcode.value.slice(0, -1);
}
</script>

<style lang="scss" scoped>
.base-passcode {
  > .code {
    display: flex;
    width: 100%;
    justify-content: center;
  }

  > .controls {
    margin-top: 56px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
  }
}

.circle-wrapper {
  width: 16px;
  height: 16px;
  background: $color-grey;
  border-radius: 50%;

  &:not(:last-child) {
    margin-right: 32px;
  }

  &.-active {
    background: $color-primary;
  }
}

.number-button {
  width: 90px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  user-select: none;

  &:active {
    background-color: $color-primary-50;
  }
}
</style>
