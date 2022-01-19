<template>
  <router-view />
  <bottom-nav v-if="showNavBar" />
</template>

<script setup lang="ts">
import BottomNav from '@/components/UI/BottomNav.vue'
import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'
const route = useRouter()

let showNavBar = ref(true)
let path = route.currentRoute._value.name

if (path === 'dashboard-verification') showNavBar.value = false
console.log('created', route.currentRoute._value.name, showNavBar.value)

watch(route.currentRoute, (val) => {
  console.log('watcher', val.name)

  if (val.name === 'dashboard-verification') {
    showNavBar.value = false 
  } else {
    showNavBar.value = true
  }
})

</script>

<style lang="scss" scoped>

</style>
