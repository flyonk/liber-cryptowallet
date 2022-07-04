<template>
  <div class="dashboard-container">
    <h2 class="title text--footnote font-weight--semibold">
      {{ $t('views.dashboard.home.libersave.title') }}
    </h2>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.dashboard-container {
  min-height: 100%;
}
.title {
  color: $color-dark-grey;
}
</style>
