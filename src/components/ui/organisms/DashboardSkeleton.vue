<template>
  <div class="page-wrapper">
    <t-top-navigation nav-with-custom-top-left nav-without-title>
      <template #top-left
        ><div class="header flex mb-4" style="width: 100%">
          <Skeleton shape="circle" size="40px" class="mr-2" />
          <Skeleton border-radius="12px" width="40%" height="2rem" /></div
      ></template>
      <template #top-right>
        <img src="@/assets/icon/bell.svg" class="ml-auto"
      /></template>
      <template #content>
        <div class="dashboard-container">
          <ul class="tabs flex mb-5">
            <Skeleton
              v-for="(item, index) in 3"
              :key="index"
              class="mr-5"
              border-radius="12px"
              width="60px"
              height="11px"
            />
          </ul>
          <div
            class="currencies flex items-center justify-content-between mb-3"
          >
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
          <div class="flex mb-6">
            <Skeleton
              border-radius="8px"
              width="104px"
              height="40px"
              class="mr-2"
            />
            <Skeleton
              border-radius="8px"
              width="88px"
              height="40px"
              class="mr-2"
            />
            <Skeleton border-radius="8px" width="48px" height="40px" />
          </div>
          <div class="flex justify-content-between mb-4">
            <Skeleton border-radius="16px" width="82px" height="11px" />
            <Skeleton border-radius="16px" width="44px" height="11px" />
          </div>
          <Skeleton
            border-radius="20px"
            width="100%"
            height="35px"
            class="mb-4"
          />
          <Skeleton
            border-radius="20px"
            width="100%"
            height="35px"
            class="mb-4"
          />
          <Skeleton
            border-radius="20px"
            width="100%"
            height="35px"
            class="mb-4"
          />
          <Skeleton
            border-radius="20px"
            width="30px"
            height="10px"
            class="mb-4"
          />
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
    </t-top-navigation>
  </div>
</template>

<script setup lang="ts">
import Skeleton from 'primevue/skeleton';
import { TTopNavigation } from '@/components/ui';
</script>

<style lang="scss" scoped>
.page-wrapper {
  height: 100vh;
}
</style>
