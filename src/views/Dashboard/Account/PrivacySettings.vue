<template name="PrivacySettings">
</template>

<script setup lang="ts">
import { BaseSwitch } from '@/components/UI';
import { ref } from 'vue';

let isEmailsAgreement = ref(true);
let isPushesAgreement = ref(true);
let isSocialMediaAgreement = ref(true);
</script>

<style lang="scss">
</style>