<template>
  <div class="message-menu">
    <p class="cancel" @click="closeMenu">Cancel</p>
    <h2 class="title">New Message</h2>
    <m-base-input
      v-model="recipient"
      :type="TypeBaseInput.Text"
      label="To"
    ></m-base-input>
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue';
// import { useRouter } from 'vue-router';
import { TypeBaseInput } from '@/components/ui/molecules/base-input/types';
// import { Route } from '@/router/types';
import { uiKitKey } from '@/types/symbols';

const uiKit = inject(uiKitKey);
const { MBaseInput } = uiKit!;

// const router = useRouter();
const emit = defineEmits(['closeMenu']);

function closeMenu() {
  emit('closeMenu');
}

const recipient = ref('');
// const clickHandle = () => {
//   router.push({
//     name: Route.PayRecipientsLiber,
//     params: { id: contactId },
//   });
// };
</script>

<style lang="scss" scoped>
.message-menu {
  bottom: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-bottom: 50px;

  > .cancel {
    font-weight: 600;
    font-size: 17px;
    line-height: 22px;
    letter-spacing: -0.0043em;
    color: $color-primary-500;
    margin-bottom: 24px;
  }

  > .title {
    font-weight: 800;
    font-size: 28px;
    line-height: 34px;
    color: $color-black;
    letter-spacing: 0.0038em;
    margin-bottom: 28px;
  }
}

.communication-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid $color-grey-500;
}

.send-method {
  > .label {
    font-weight: 500;
    font-size: 11px;
    line-height: 13px;
    display: flex;
    align-items: center;
    letter-spacing: 0.0006em;
    color: $color-brand-2-300;
  }

  > .data {
    font-weight: 500;
    font-size: 17px;
    line-height: 22px;
    display: flex;
    align-items: center;
    letter-spacing: -0.0043em;
    color: $color-brand-550;
  }
}
</style>
