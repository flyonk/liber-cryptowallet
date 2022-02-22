<template name="CloseAccount">
  <div
    v-if="showMenu"
    class="close-account"
  >
    <img
      class="logo"
      src="@/assets/images/liber-logo.png"
      alt="logo"
    >
    <h5 class="title">
      Hey, wait! Where are you going?
    </h5>
    <p class="description">
      It's free to keep a account, and opening a new one could take some time if you cancel
    </p>
    <div class="control-buttons">
      <BaseButton
        class="btn"
        size="large"
      >
        Keep account open
      </BaseButton>
      <BaseButton
        class="btn" 
        size="large"
        @click="$emit('closeMenu')"
      >
        Close account
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import BaseButton from '@/components/UI/BaseButton.vue'

const props = defineProps({
  showMenu: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['closeMenu'])

const { path } = toRefs(props)
console.log(path)


</script>

<style lang="scss" scoped>
.close-account {
  display: flex;
  padding: 150px 16px 100px;
  background: $color-white;
  border-radius: 15px 15px 0 0;
  z-index: 2;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 15px rgb(0 0 0 / 10%);
  width: 100%;
  height: 90%;
  position: absolute;
  bottom: 0;

  >.logo {
    height: 55px;
    margin-bottom: 85px;
  }

  >.title {
    font-weight: 600;
    font-size: 20px;
    line-height: 25px;
    text-align: center;
    letter-spacing: -0.0045em;
    color: #0D1F3C;
    margin-bottom: 15px;
  }

  >.description {
    padding: 0 20px;
    font-size: 17px;
    line-height: 22px;
    text-align: center;
    letter-spacing: -0.0043em;
    color: $color-brand-2-300;
  }
}

.control-buttons {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: auto;
}
</style>
