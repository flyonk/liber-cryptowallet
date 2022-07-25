<template>
  <section class="example-story" :style="stylePaddings">
    <header class="header">
      <h1 class="title">{{ props.headerTitle }}</h1>
      <img
        class="logo"
        alt="logo"
        width="90"
        height="32"
        :src="props.logoImg"
      />
    </header>
    <main class="main">
      <h1 class="title">{{ props.baseTitle }}</h1>
      <div class="imagecontainer">
        <img class="image" :src="props.baseImg" @contextmenu.prevent.stop />
      </div>
    </main>
  </section>
</template>

<script lang="ts" setup>
import useSafeAreaPaddings from '@/helpers/safeArea';

defineEmits(['login', 'signup']);

const { stylePaddings } = useSafeAreaPaddings();

const props = defineProps({
  headerTitle: {
    type: String,
    default: '',
  },
  baseTitle: {
    type: String,
    default: '',
  },
  logoImg: {
    type: String,
    required: true,
  },
  baseImg: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.example-story {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: $color-brand-2-800;
  padding-left: 24px !important;
  padding-right: 24px !important;

  > .header {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin: 24px 0;

    & > .title {
      font-family: Inter, sans-serif;
      font-style: normal;
      font-weight: 600;
      font-size: 13px;
      line-height: 18px;
      color: $color-white;
    }
  }

  > .main {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: scroll;
    padding-bottom: 70px;

    & > .title {
      font-weight: 800;
      font-size: 34px;
      line-height: 41px;
      letter-spacing: 0.004em;
      color: $color-white;

      @media (max-height: 680px) {
        font-size: 30px;
      }
    }

    & > .imagecontainer {
      display: flex;
      justify-content: center;
      overflow: hidden;
      margin-top: auto;
    }
  }
}
</style>
