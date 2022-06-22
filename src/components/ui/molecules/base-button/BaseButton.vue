<template>
  <button
    :class="classes"
    :disabled="disabled"
    class="base-button"
    type="button"
  >
    <i v-if="icon" :class="icon" />
    <div v-else class="container">
      <i v-if="iconLeft" class="icon-left icon" :class="iconLeft" />
      <div class="label">
        <slot />
      </div>
      <i v-if="iconRight" class="icon-right icon" :class="iconRight" />
    </div>
  </button>
</template>

<script lang="ts" setup>
import { computed, toRefs } from 'vue';

import {
  SizeBaseButton,
  ViewBaseButton,
} from '@/components/ui/molecules/base-button/types';

const props = defineProps({
  block: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: SizeBaseButton.Large,
    validator: (value: string) => Object.values(SizeBaseButton).includes(value),
  },
  view: {
    type: String,
    default: ViewBaseButton.Simple,
    validator: (value: string) => Object.values(ViewBaseButton).includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  iconLeft: {
    type: [String, null],
    default: null,
  },
  iconRight: {
    type: [String, null],
    default: null,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: [String, null],
    default: null,
  },
});

const { block, size, view, disabled, iconLeft, iconRight, icon } =
  toRefs(props);

const classes = computed(() => [
  {
    '-block': block.value,
    '-disabled': disabled.value,
    '-with-icon-left': iconLeft.value,
    '-with-icon-right': iconRight.value,
    '-only_icon': icon.value,
  },
  `-${view.value}`,
  `-${size.value}`,
]);
</script>

<style lang="scss">
.base-button {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  transition: all 0.5s;

  > .container {
    display: flex;
    align-items: center;
    justify-content: center;

    > .label {
      font-weight: 600;
    }
  }

  &.-block {
    width: 100%;
  }

  &.-large {
    border-radius: 13px;
    padding: 13px 24px;

    > .container {
      > .label {
        font-size: 17px;
        line-height: 22px;
        letter-spacing: -0.0043em;
        text-shadow: 0 1px 2px rgb(0 0 0 / 4%);
      }
    }

    > i {
      font-size: 24px;
    }
  }

  &.-medium {
    border-radius: 8px;
    padding: 11px 16px;
    width: auto;
    min-width: 105px;
    max-width: 125px;
    max-height: 40px;

    > .container {
      > .label {
        font-size: 13px;
        line-height: 18px;
        letter-spacing: -0.0008em;
      }
    }
  }

  &.-flat {
    padding: 0;
    background: transparent;

    > .container {
      > .label,
      i {
        color: $color-primary;
      }
    }

    &:disabled,
    &[disabled] {
      > .container {
        > .label,
        i {
          color: $color-brand-2-100 !important;
        }
      }
    }

    &:hover,
    &:focus {
      > .container {
        > .label,
        i {
          color: $color-primary-400;
        }
      }
    }

    &:active {
      > .container {
        > .label,
        i {
          color: $color-primary-600;
        }
      }
    }
  }

  &.-ghost {
    background: transparent;
    border: 2px solid $color-primary;

    > .container {
      > .label,
      i {
        color: $color-primary;
      }
    }

    &:disabled,
    &[disabled] {
      border-color: $color-brand-2-100 !important;

      > .container {
        > .label,
        i {
          color: $color-brand-2-100;
        }
      }
    }

    &:hover,
    &:focus {
      background: $color-primary-50;
    }

    &:active {
      background: $color-primary-100;
    }
  }

  &.-only-icon {
    padding: 12px;
  }

  &.-finance-action {
    min-width: 0;
    padding: 10px;
    border: 0.5px solid $color-light-grey;
    box-shadow: 0 1px 3px -3px rgb(64 70 105 / 21%);
    border-radius: 8px;
    background: $color-white;

    &:disabled,
    &[disabled] {
      background: $color-brand-2-50;

      > .container {
        > .icon {
          background: $color-brand-2-200;
        }

        > .label {
          background: $color-brand-2-300;
        }
      }
    }

    &:hover,
    &:focus {
      box-shadow: none;
      border-color: $color-grey-300;
    }

    &:active {
      background: $color-light-grey-500;
      box-shadow: none;
      border-color: $color-light-grey-500;
    }

    > .container {
      > .icon {
        color: $color-primary-500;
      }
    }

    &.-with-icon-left {
      > .container {
        > .label {
          margin-left: 8px;
          color: $color-brand-500;
        }
      }
    }
  }

  &.-secondary {
    background: $color-light-grey;

    > .container {
      > .label,
      i {
        color: $color-primary;
      }
    }

    &:disabled,
    &[disabled] {
      background: $color-brand-2-100 !important;

      > .container {
        > .label,
        i {
          color: $color-white;
        }
      }
    }

    &:hover,
    &:focus {
      background: $color-primary-100;
    }

    &:active {
      background: $color-primary-100;
    }
  }

  &.-transparent {
    background: transparent;

    > .container {
      > .label,
      i {
        color: $color-primary;
      }
    }

    &:disabled,
    &[disabled] {
      background: $color-brand-2-100 !important;

      > .container {
        > .label,
        i {
          color: $color-white;
        }
      }
    }

    &:hover,
    &:focus {
      background: $color-primary-100;
    }

    &:active {
      background: $color-primary-100;
    }
  }

  &.-white {
    background: $color-white;
    box-shadow: 0 2px 4px -3px rgb(64 70 105 / 21%);
    border-radius: 8px;
  }

  &.-simple {
    background: $color-primary;

    > .container {
      > .label,
      i {
        color: $color-white;
      }
    }

    &:disabled,
    &[disabled] {
      background: $color-grey !important;
    }

    &:hover,
    &:focus {
      background: $color-primary-400;
    }

    &:active {
      background: $color-primary-600;
    }
  }

  &.-small {
    height: 32px;
    width: 32px;
    border-radius: 50%;
    padding: 0 !important;
  }

  &.-x-small {
    height: 24px;
    width: 24px;
    border-radius: 50%;
    padding: 0 !important;
  }

  &.-with-icon-left {
    > .container {
      > .label {
        margin-left: 13px;
      }
    }
  }

  &.-with-icon-right {
    > .container {
      > .label {
        margin-right: 13px;
      }
    }
  }
}
</style>
