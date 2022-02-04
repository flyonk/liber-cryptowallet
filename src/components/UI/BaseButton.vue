<template>
  <button
    :class="classes"
    :disabled="disabled"
    class="base-button"
  >
    <i
      v-if="icon"
      :class="icon"
    />
    <div
      v-else
      class="container"
    >
      <i
        v-if="iconLeft"
        :class="iconLeft"
      />
      <div class="label">
        <slot />
      </div>
      <i
        v-if="iconRight"
        :class="iconRight"
      />
    </div>
  </button>
</template>

<script lang="ts" setup>
import { computed, toRefs } from 'vue';

const props = defineProps({
  block: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: 'large',
    validator: (value: string) =>
      ['large', 'medium', 'small', 'x-small'].includes(value),
  },
  view: {
    type: String,
    default: 'simple',
    validator: (value: string) =>
      ['simple', 'secondary', 'ghost', 'flat'].includes(value),
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
    '-block': block,
    '-disabled': disabled,
    '-with_icon_left': iconLeft,
    '-with_icon_right': iconRight,
    '-only_icon': icon,
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

    > .container {
      > .label {
        font-size: 13px;
        line-height: 18px;
        letter-spacing: -0.0008em;
      }
    }
  }

  &.-flat {
    padding: 13px 0;
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
    border: 2px solid $color-primary-500;

    > .container {
      > .label,
      i {
        color: $color-primary-500;
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

  &.-secondary {
    background: $color-light-grey;

    > .container {
      > .label,
      i {
        color: $color-primary-500;
      }
    }

    &:disabled,
    &[disabled] {
      background: $color-brand-2-100 !important;

      > .container {
        > .label,
        i {
          color: #fff;
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

  &.-simple {
    background: $color-primary-500;

    > .container {
      > .label,
      i {
        color: #fff;
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

  &.-with_icon_left {
    > .container {
      > .label {
        margin-left: 13px;
      }
    }
  }

  &.-with_icon_right {
    > .container {
      > .label {
        margin-right: 13px;
      }
    }
  }
}
</style>
