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

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseButton',

  props: {
    block: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'large',
      validator: (value) => ['large', 'medium', 'small', 'x-small'].includes(value)
    },
    view: {
      type: String,
      default: 'simple',
      validator: (value) => ['simple', 'secondary', 'ghost', 'flat'].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    },
    iconLeft: {
      type: [String, null],
      default: null
    },
    iconRight: {
      type: [String, null],
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    icon: {
      type: [String, null],
      default: null
    }
  },

  computed: {
    classes() {
      return [
        {
          'block': this.block,
          'disabled': this.disabled,
          'with-icon-left': this.iconLeft,
          'with-icon-right': this.iconRight,
          'only-icon': this.icon
        },
        `view-${this.view}`,
        `size-${this.size}`
      ];
    }
  }
});
</script>

<style lang='scss'>
.base-button {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  transition: all 0.5s;

  .label {
    font-weight: 600;
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &.block {
    width: 100%
  }

  &.size- {
    &large {
      -webkit-border-radius: 13px;
      -moz-border-radius: 13px;
      border-radius: 13px;
      padding: 13px 24px;

      .label {
        font-size: 17px;
        line-height: 22px;
        letter-spacing: -0.0043em;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
      }

      i {
        font-size: 24px;
      }
    }

    &medium {
      -webkit-border-radius: 8px;
      -moz-border-radius: 8px;
      border-radius: 8px;
      padding: 11px 16px;

      .label {
        font-size: 13px;
        line-height: 18px;
        letter-spacing: -0.0008em;
      }
    }

    &small {
      height: 32px;
      width: 32px;
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      border-radius: 50%;
      padding: 0 !important;
    }

    &x-small {
      height: 24px;
      width: 24px;
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      border-radius: 50%;
      padding: 0 !important;
    }
  }

  &.view- {
    &simple {
      background: var(--ion-color-ui-primary-500);

      .label, i {
        color: #fff;
      }

      &:disabled, &[disabled] {
        background: var(--ion-color-grey-500) !important;
      }

      &:hover, &:focus {
        background: var(--ion-color-ui-primary-400);
      }

      &:active {
        background: var(--ion-color-ui-primary-600);
      }
    }

    &secondary {
      background: var(--ion-color-light-grey);

      .label, i {
        color: var(--ion-color-ui-primary-500);
      }

      &:disabled, &[disabled] {
        background: var(--ion-color-brand-2-100) !important;

        .label, i {
          color: #fff;
        }
      }

      &:hover, &:focus {
        background: var(--ion-color-ui-primary-100);
      }

      &:active {
        background: var(--ion-color-ui-primary-100);
      }
    }

    &ghost {
      background: transparent;
      border: 2px solid var(--ion-color-ui-primary-500);

      .label, i {
        color: var(--ion-color-ui-primary-500);
      }

      &:disabled, &[disabled] {
        border-color: var(--ion-color-brand-2-100) !important;

        .label, i {
          color: var(--ion-color-brand-2-100);
        }
      }

      &:hover, &:focus {
        background: var(--ion-color-ui-primary-50);
      }

      &:active {
        background: var(--ion-color-ui-primary-100);
      }
    }

    &flat {
      padding: 13px 0;
      background: transparent;

      .label, i {
        color: var(--ion-color-ui-primary-500);
      }

      &:disabled, &[disabled] {
        .label, i {
          color: var(--ion-color-brand-2-100) !important;
        }
      }

      &:hover, &:focus {
        .label, i {
          color: var(--ion-color-ui-primary-400);
        }
      }

      &:active {
        .label, i {
          color: var(--ion-color-ui-primary-600);
        }
      }
    }
  }

  &.with-icon-left {
    .label {
      margin-left: 13px;
    }
  }

  &.with-icon-right {
    .label {
      margin-right: 13px;
    }
  }

  &.only-icon {
    padding: 12px;
  }
}

</style>
