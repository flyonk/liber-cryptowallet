<template>
  <article class="dashboard-banner" @click="$emit('click')">
    <i
      class="close-icon icon icon-app-navigation-close"
      @click.prevent="$emit('close-click')"
    />

    <img :src="imageUrl" alt="" />

    <p class="title">
      {{ title }}
    </p>
    <p class="description">
      {{ description }}
    </p>
  </article>
</template>

<script lang="ts" setup>
defineEmits(['click', 'close-click']);
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  imageUrl: {
    type: String,
    default: '',
  },
  backgroundColor: {
    type: String,
    default: '#ECF9EE',
  },
  titleColor: {
    type: String,
    default: '#3EAF4D',
  },
  descriptionColor: {
    type: String,
    default: '#1D5124',
  },
  iconColor: {
    type: String,
    default: '#1D5124',
  },
});
</script>

<style lang="scss" scoped>
.dashboard-banner {
  border-radius: 16px;
  position: relative;
  padding: 19px 16px;
  background: v-bind('backgroundColor');

  > .close-icon {
    position: absolute;
    top: 23px;
    right: 23px;
    color: v-bind('iconColor');
    font-weight: 600;
  }

  > .title {
    font-weight: 800;
    font-size: 10px;
    line-height: 13px;
    letter-spacing: 0.15em;
    color: v-bind('titleColor');
    text-transform: uppercase;
    margin: 27px 0 5px;
  }

  > .description {
    font-weight: 600;
    font-size: 16px;
    line-height: 21px;
    letter-spacing: -0.0031em;
    color: v-bind('descriptionColor');
  }
}
</style>
