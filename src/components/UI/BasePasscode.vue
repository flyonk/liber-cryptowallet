<template>
  <div class="base-passcode">
    <div class="code">
      <div
        v-for="circle in 4"
        :key="circle"
        class="circle-wrapper"
        :class="{ '-active': passcode.length >= circle }"
      />
    </div>

    <div class="controls">
      <div class="number-button text--large-title" @click="setNumber('1')">
        1
      </div>
      <div class="number-button text--large-title" @click="setNumber('2')">
        2
      </div>
      <div class="number-button text--large-title" @click="setNumber('3')">
        3
      </div>
      <div class="number-button text--large-title" @click="setNumber('4')">
        4
      </div>
      <div class="number-button text--large-title" @click="setNumber('5')">
        5
      </div>
      <div class="number-button text--large-title" @click="setNumber('6')">
        6
      </div>
      <div class="number-button text--large-title" @click="setNumber('7')">
        7
      </div>
      <div class="number-button text--large-title" @click="setNumber('8')">
        8
      </div>
      <div class="number-button text--large-title" @click="setNumber('9')">
        9
      </div>
      <div class="number-button" @click="showTouchId">
        <template v-if="props.showTouchFaceid">
          <img v-if="identificationIcon" :src="identificationIcon" />
        </template>
      </div>
      <div class="number-button text--large-title" @click="setNumber('0')">
        0
      </div>
      <div class="number-button" @click="clear">
        <img src="@/assets/icon/clear-button.svg" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount, PropType } from 'vue';
import { Storage } from '@capacitor/storage';

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
  const { value } = await Storage.get({
    key: EStorageKeys.passcode,
  });
  return value || '0000';
};

async function checkPasscode(passcode: string) {
  const storedPassCode = await getStoredPasscode();
  return storedPassCode === passcode;
}

async function setPasscode(passcode: string) {
  await Storage.set({
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
 * emit true vqlue if passcode is correct
 * emit false value if passcode is wrong
 */
const emit = defineEmits(['submit']);

function setNumber(number: string): void {
  if (passcode.value.length < 4) {
    passcode.value = passcode.value + number;

    if (passcode.value.length === 4) {
      onSubmit(passcode.value)
        .then((result: boolean) => {
          emit('submit', result);
        })
        .catch(() => {
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
