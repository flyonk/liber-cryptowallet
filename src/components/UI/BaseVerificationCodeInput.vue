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
            :autofocus="true"
            :data-id="index"
            :disabled="disabled"
            :pattern="type === 'number' ? '[0-9]' : undefined"
            :required="required"
            :type="type === 'number' ? 'tel' : type"
            :value="activationCode[index]"
            maxlength="2"
            @input="onChange"
            @keydown.delete.prevent="onDelete"
          >
        </div>
      </template>
    </div>

    <div class="button-submit">
      <base-button
        view="secondary"
        block
      >
        Paste
      </base-button>
    </div>
  </div>
</template>

<!-- <script lang="ts">
import { defineComponent } from "vue-demi";

export default defineComponent({
  name: 'CodeInput',
  props: {
    type: {
      type: String,
      default: 'number',
    },
    className: String,
    fields: {
      type: Number,
      default: 6,
    },
    fieldWidth: {
      type: Number,
      default: 58,
    },
    fieldHeight: {
      type: Number,
      default: 54,
    },
    autoFocus: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    title: String,
    change: Function,
    complete: Function,
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['change', 'complete'],
  data() {
    const { fields, values } = this;
    let vals;
    let autoFocusIndex = 0;
    if (this.values && this.values.length) {
      vals = [] as number[];
      for (let i = 0; i < fields; i++) {
        vals.push(values[i] || '');
      }
      autoFocusIndex = values.length >= fields ? 0 : values.length;
    } else {
      vals = Array(fields).fill('');
    }
    this.iRefs = [] as any[];
    for (let i = 0; i < fields; i++) {
      this.iRefs.push(`input_${i}`);
    }
    this.id = +new Date();
    return { values: vals as number[], autoFocusIndex };
  },
  methods: {
    onFocus(e: any) {
      e.target.select(e);
    },
    onKeyDown(e) {
      const index = parseInt(e.target.dataset.id);
      const prevIndex = index - 1;
      const nextIndex = index + 1;
      const prev = this.iRefs[prevIndex];
      const next = this.iRefs[nextIndex];
      switch (e.keyCode) {
        case KEY_CODE.backspace: {
          e.preventDefault();
          const vals = [...this.values];
          if (this.values[index]) {
            vals[index] = '';
            this.values = vals;
            this.triggerChange(vals);
          } else if (prev) {
            vals[prevIndex] = '';
            this.$refs[prev][0].focus();
            this.values = vals;
            this.triggerChange(vals);
          }
          break;
        }
        case KEY_CODE.left:
          e.preventDefault();
          if (prev) {
            this.$refs[prev][0].focus();
          }
          break;
        case KEY_CODE.right:
          e.preventDefault();
          if (next) {
            this.$refs[next][0].focus();
          }
          break;
        case KEY_CODE.up:
        case KEY_CODE.down:
          e.preventDefault();
          break;
        default:
          // this.handleKeys[index] = true;
          break;
      }
    },
    triggerChange(values = this.values) {
      const { fields } = this;
      const val = values.join('');
      this.$emit('change', val);
      if (val.length >= fields) {
        this.$emit('complete', val);
      }
    },
  },
}
);
</script> -->

<script lang="ts" setup>
import { computed, onBeforeUpdate, Ref, ref } from 'vue';

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
  fieldWidth: {
    type: Number,
    default: 58,
  },
  fieldHeight: {
    type: Number,
    default: 54,
  },
  autoFocus: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['change', 'complete']);

// const value = ref('');

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

  .input-wrapper {
    &:not(:last-child) {
      margin-right: 12px;
    }

    input {
      width: 100%;
      text-align: center;
      padding: 16px;
      border-radius: 12px;
      border: 1px solid transparent;
      background: $color-light-grey;

      &:focus {
        outline: none;
        border-color: $color-primary-500;
        background: transparent;
      }
    }
  }
}
</style>
