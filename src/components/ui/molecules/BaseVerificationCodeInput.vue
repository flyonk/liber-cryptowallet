<template>
  <div class="verification-input">
    <div class="input-container">
      <template v-for="(v, index) in fields" :key="`input-${index}`">
        <div class="input-wrapper" :class="{ '-dash': fields === 6 }">
          <input
            :ref="el => { if (el) inputs[index] = el as HTMLElement }"
            class="input-item text--title-1"
            :data-id="index"
            pattern="\d*"
            :type="type"
            :value="activationCode[index]"
            min="0"
            max="9"
            @input="onChange"
            @keydown.delete.prevent="onDelete"
          />
        </div>
      </template>
    </div>

    <div class="submit">
      <base-button
        v-if="withPasteButton"
        view="secondary"
        block
        @click="onPaste"
        >{{ $t('ui.baseverificationcodeinput.paste') }}</base-button
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeUpdate, Ref, ref, watch } from 'vue';
import { Clipboard } from '@capacitor/clipboard';

import { BaseButton } from '@/components/ui';
import { useErrorsStore } from '@/stores/errors';

const props = defineProps({
  type: {
    type: String,
    default: 'number',
  },
  fields: {
    type: Number,
    default: 6,
  },
  withPasteButton: {
    type: Boolean,
    default: false,
  },
  isError: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['change', 'complete', 'update:modelValue']);

const inputs = ref([]) as Ref<HTMLElement[]>;

const activationCode = ref([]) as Ref<string[]>;

const errorsStore = useErrorsStore();

onBeforeUpdate(() => {
  inputs.value = [];
});

const focusNextInput = (currentId: number) => {
  const nextInput = inputs.value[currentId + 1] as HTMLElement | undefined;

  if (nextInput) {
    nextInput.focus();
    return currentId + 1;
  }
  return currentId;
};

const focusPrevInput = (currentId: number) => {
  const prevInput = inputs.value[currentId - 1] as HTMLElement | undefined;

  if (prevInput) {
    prevInput.focus();
  }
};

const activationCodeString = computed(() => activationCode.value.join(''));

const onChange = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  const currentId = parseInt(
    (event.target as HTMLInputElement).dataset.id as string
  );

  if (value.length > 1) {
    activationCode.value = activationCode.value.map(
      (item: string, index: number) => {
        if (index === +currentId) {
          return value[value.length - 1];
        }
        return item;
      }
    );
  } else {
    activationCode.value[currentId] = value;
  }

  if (value.length >= 1) {
    const focusedInputId = focusNextInput(currentId);

    if (activationCode.value.filter((code) => code).length === props.fields) {
      emit('update:modelValue', activationCodeString.value);
      emit('complete', activationCodeString.value);

      const currentInput = inputs.value[focusedInputId] as
        | HTMLElement
        | undefined;

      if (currentInput) {
        currentInput.blur();
      }
    }
  } else if (value.length === 0) {
    focusPrevInput(currentId);
  }
};

const onDelete = (event: Event) => {
  const currentId = parseInt(
    (event.target as HTMLInputElement).dataset.id as string
  );

  activationCode.value[currentId] = '';

  focusPrevInput(currentId);
};

const onPaste = async (): Promise<void> => {
  try {
    const { value } = await Clipboard.read();

    if (/^\d+$/.test(value)) {
      const substringValue = value.substr(0, 6);

      activationCode.value = [...substringValue];
    }
  } catch (err) {
    errorsStore.handle(err, 'BaseVerificationCodeInput', 'onPaste');
  }
};

watch(
  () => props.isError,
  (newValue, oldValue) => {
    if (!newValue && oldValue) {
      activationCode.value = [];
    }
  }
);
</script>

<style lang="scss" scoped>
.verification-input {
  width: 100%;

  & > .submit {
    position: fixed;
    bottom: 50px;
    left: 16px;
    right: 16px;
  }
}

.input-container {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.input-wrapper {
  flex-grow: 1;

  &:not(:last-child) {
    margin-right: 12px;
  }

  &.-dash:nth-child(3) {
    margin-right: 25px;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      right: -16px;
      transform: translateY(-50%);
      width: 8px;
      height: 1px;
      background: $color-grey-500;
    }
  }
}

.input-item {
  width: 100%;
  text-align: center;
  padding: 10px 4px;
  border-radius: 12px;
  border: 1px solid transparent;
  background: $color-light-grey;

  &:focus {
    outline: none;
    border-color: $color-primary;
    background: transparent;
  }
}
</style>
