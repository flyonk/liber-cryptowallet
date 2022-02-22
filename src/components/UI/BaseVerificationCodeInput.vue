<template>
  <div class="base-verification-code-input">
    <div class="input-container">
      <template
        v-for="(v, index) in fields"
        :key="`input-${index}`"
      >
        <div class="input-wrapper">
          <input
            :ref="el => { if (el) inputs[index] = el as HTMLElement }"
            :data-id="index"
            pattern="[0-9]"
            type="number"
            :value="activationCode[index]"
            min="0"
            max="9"
            @input="onChange"
            @keydown.delete.prevent="onDelete"
          >
        </div>
      </template>
    </div>

    <div class="button-submit">
      <base-button
        v-if="withPasteButton"
        view="secondary"
        block
        @click="onPaste"
      >
        Paste
      </base-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeUpdate, Ref, ref } from 'vue';
import { Clipboard } from '@capacitor/clipboard';

import { BaseButton } from '@/components/UI';

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
    default: true
  }
});

const emit = defineEmits(['change', 'complete']);

const inputs = ref([]) as Ref<HTMLElement[]>;

const activationCode = ref([]) as Ref<string[]>;

onBeforeUpdate(() => {
  inputs.value = []
})

const focusNextInput = (currentId: number) => {
  const nextInput = inputs.value[currentId + 1] as HTMLElement | undefined;

  if (nextInput) {
    nextInput.focus();
  }
}

const focusPrevInput = (currentId: number) => {
  const prevInput = inputs.value[currentId - 1] as HTMLElement | undefined;

  if (prevInput) {
    prevInput.focus();
  }
}

const activationCodeString = computed(() => activationCode.value.join(''))

const onChange = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  const currentId = parseInt((event.target as HTMLInputElement).dataset.id as string);


  if (value.length > 1) {
    activationCode.value[currentId] = value[value.length - 1];
  } else {
    activationCode.value[currentId] = value;
  }
  
  if (value.length >= 1) {
    focusNextInput(currentId);
    
    if (activationCode.value.filter(code => code).length === props.fields) {
      emit('complete', activationCodeString.value)
    }
  } else if (value.length === 0) {
      focusPrevInput(currentId);
    }
};

const onDelete = (event: Event) => {
  const currentId = parseInt((event.target as HTMLInputElement).dataset.id as string);

  activationCode.value[currentId] = '';

  focusPrevInput(currentId);
}

const onPaste = async (): Promise<void> => {
  try {
    const { value } = await Clipboard.read();

    if (/^\d+$/.test(value)) {
      const substringValue = value.substr(0, 6)
      
      activationCode.value = [...substringValue]
    }
  } catch (e) {
    console.error(e)
  }
}
</script>

<style lang="scss">
.base-verification-code-input {
  .button-submit {
    position: fixed;
    bottom: 50px;
    left: 16px;
    right: 16px;
  }
}

.input-container {
  display: flex;
  width: 100%;
}

.input-wrapper {
  &:not(:last-child) {
    margin-right: 12px;
  }
}

.input-item {
  width: 100%;
  text-align: center;
  padding: 16px;
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
