<template>
  <t-top-navigation @click:left-icon="onBack">
    <template #title>
      {{ title }}
    </template>

    <template #content>
      <div class="passcode">
        <base-passcode
          v-if="actionType === EPasscodeActions.check"
          :action-type="actionType"
          :show-touch-faceid="false"
          @submit="onCheck"
        />
        <base-passcode
          v-if="actionType === EPasscodeActions.restore"
          :action-type="actionType"
          :show-touch-faceid="false"
          @submit="onRestore"
        />
      </div>
    </template>
  </t-top-navigation>
</template>

<script lang="ts" setup>
import { computed, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';

import { EPasscodeActions } from '@/types/base-component';
import { EConfirmationTypes, useMfaStore } from '@/stores/mfa';
import { usePasscodeStore } from '@/stores/passcode';
import { useErrorsStore } from '@/stores/errors';
import { Route } from '@/router/types';

import { BasePasscode, TTopNavigation } from '@/components/ui';

const mfaStore = useMfaStore();
const passcodeStore = usePasscodeStore();
const errorsStore = useErrorsStore();
const router = useRouter();

const actionType = ref(EPasscodeActions.check) as Ref<EPasscodeActions>;

const tempPasscode = ref('');

const title = computed(() => {
  const mapper = {
    [EPasscodeActions.check]: 'Enter new passcode',
    [EPasscodeActions.restore]: 'Confirm your passcode',
  };

  return mapper[
    actionType.value as EPasscodeActions.check | EPasscodeActions.restore
  ];
});

const onCheck = (passcode: string) => {
  tempPasscode.value = passcode;
  actionType.value = EPasscodeActions.restore;
};

const onBack = () => {
  const mapper = {
    [EPasscodeActions.check]: () => {
      router.back();
    },
    [EPasscodeActions.restore]: () => {
      actionType.value = EPasscodeActions.check;
    },
  };

  return mapper[
    actionType.value as EPasscodeActions.check | EPasscodeActions.restore
  ]();
};

const onRestore = async (passcode: string) => {
  try {
    if (tempPasscode.value === passcode) {
      mfaStore.show({
        confirmations: [EConfirmationTypes.email, EConfirmationTypes.number],
      });

      const isSuccess = await passcodeStore.restore({
        new_pass_code: passcode,
      });

      if (isSuccess) {
        router.push({ name: Route.RestorePasscodeSuccess });
      }
    } else {
      errorsStore.handle({
        err: new Error('invalid'),
        name: 'Restore Passcode',
        ctx: 'onRestore',
        description: 'Passcodes are not match',
        silence: true,
      });
    }
  } catch (e) {
    errorsStore.handle({
      err: e,
      name: 'Restore Passcode',
      ctx: 'onRestore',
      description: 'Unexpected error is occurred',
    });
  }
};
</script>

<style lang="scss" scoped>
.passcode {
  margin: 132px 0 0;
}
</style>
