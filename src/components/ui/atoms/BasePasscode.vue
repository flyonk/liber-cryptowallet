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
        <img alt :src="`${STATIC_BASE_URL}/static/media/clear-button.svg`" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, PropType, ref } from 'vue';

import { getSupportedOptions, verifyIdentity } from '@/helpers/identification';
import { usePasscodeStore } from '@/stores/passcode';
import { useMfaStore } from '@/stores/mfa';
import { set } from '@/helpers/storage';
import { STATIC_BASE_URL } from '@/constants';

import { EStorageKeys } from '@/types/storage';
import { EPasscodeActions } from '@/types/base-component';
import { Route } from '@/router/types';
import { useErrorsStore } from '@/stores/errors';

const passcodeStore = usePasscodeStore();
const mfaStore = useMfaStore();

const errorsStore = useErrorsStore();

/**
 * emit true value if passcode is correct
 * emit false value if passcode is wrong
 */
const emit = defineEmits(['submit']);

const props = defineProps({
  actionType: {
    type: String as PropType<EPasscodeActions>,
    default: EPasscodeActions.compare,
  },
  showTouchFaceid: {
    type: Boolean,
    default: true,
  },
  successRoute: {
    type: String,
    default: Route.ProfileSettings,
  },
});

const identificationIcon = ref('');
const passcode = ref('');

async function updatePassCode(passcode: string) {
  mfaStore.show({
    successRoute: {
      name: props.successRoute,
    },
  });
  return await passcodeStore.update({ new_pass_code: passcode });
}

async function comparePasscode(passcode: string) {
  return await passcodeStore.verify({ pass_code: passcode });
}

async function setPasscode(passcode: string) {
  const isCreated = await passcodeStore.create({ pass_code: passcode });

  if (isCreated) {
    await set({
      key: EStorageKeys.passcode,
      value: 'true',
    });
  }

  return isCreated;
}

async function checkPasscode(passcode: string) {
  emit('submit', passcode);
}

function getSubmitFunction(actionType: string) {
  switch (actionType) {
    case EPasscodeActions.store:
      return setPasscode;
    case EPasscodeActions.compare:
      return comparePasscode;
    case EPasscodeActions.update:
      return updatePassCode;
    case EPasscodeActions.check:
    case EPasscodeActions.restore:
      return checkPasscode;
    default:
      return comparePasscode;
  }
}

const onSubmit = getSubmitFunction(props.actionType);

const showTouchId = () => {
  if (identificationIcon.value) {
    verifyIdentity()
      .then((state) => {
        emit('submit', state);
      })
      .catch((err) => {
        emit('submit', false);
        errorsStore.handle({
          err,
          name: 'BasePasscode',
          ctx: 'showTouchId',
          description: 'Verify identity error',
        });
      });
  }
};

onBeforeMount(async (): Promise<void> => {
  //Hack for iOS bug when passcode is not cleared
  passcode.value = '';

  if (props.showTouchFaceid) {
    const option = await getSupportedOptions();

    if (option === 'face-id') {
      identificationIcon.value = `${STATIC_BASE_URL}/static/media/faceid.svg`;
    }
    if (option === 'touch-id') {
      identificationIcon.value = `${STATIC_BASE_URL}/static/menu/touchid.svg`;
    }
  }
});

function setNumber(number: string): void {
  if (passcode.value.length < 4) {
    passcode.value = passcode.value + number;

    if (passcode.value.length === 4) {
      onSubmit(passcode.value)
        .then((result) => {
          passcode.value = '';
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
  touch-action: none;

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
  font-weight: 400;

  @include iPhoneSE {
    width: 70px;
    height: 70px;
  }

  &:active {
    background-color: $color-primary-50;
  }
}
</style>
