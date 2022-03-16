<template>
  <div class="dashboard">
    <div class="header flex mb-4">
      <Skeleton shape="circle" size="40px" class="mr-2" />
      <Skeleton border-radius="12px" width="40%" height="2rem" />
      <img src="@/assets/icon/bell.svg" class="ml-auto" />
    </div>
    <ul class="tabs flex mb-7">
      <Skeleton
        v-for="(item, index) in 3"
        :key="index"
        class="mr-5"
        border-radius="12px"
        width="60px"
        height="11px"
      />
    </ul>
    <div class="currencies flex items-center justify-content-between mb-6">
      <div>
        <Skeleton
          border-radius="12px"
          width="90px"
          height="24px"
          class="mb-4"
        />
        <Skeleton border-radius="12px" width="136px" height="11px" />
      </div>
      <div>
        <Skeleton shape="circle" size="40px" class="mr-2" />
      </div>
    </div>
    <Skeleton border-radius="12px" width="227px" height="14px" class="mb-4" />
    <Skeleton border-radius="12px" width="222px" height="11px" class="mb-2" />
    <Skeleton border-radius="12px" width="222px" height="11px" class="mb-5" />
    <div class="flex mb-6">
      <Skeleton border-radius="8px" width="104px" height="40px" class="mr-2" />
      <Skeleton border-radius="8px" width="88px" height="40px" class="mr-2" />
      <Skeleton border-radius="8px" width="48px" height="40px" />
    </div>
    <div class="flex justify-content-between mb-4">
      <Skeleton border-radius="16px" width="82px" height="11px" />
      <Skeleton border-radius="16px" width="44px" height="11px" />
    </div>
    <Skeleton border-radius="20px" width="139px" height="11px" class="mb-4" />
    <Skeleton border-radius="20px" width="82px" height="11px" class="mb-4" />
    <div class="flex">
      <Skeleton
        border-radius="16px"
        width="160px"
        height="160px"
        class="mr-2"
      />
      <Skeleton
        border-radius="16px"
        width="160px"
        height="160px"
        class="mr-2"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Skeleton from 'primevue/skeleton';
</script>

<style lang="scss" scoped>
.dashboard {
  padding: 0 15px;
}
</style>
