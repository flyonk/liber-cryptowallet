<template>
  <div>
    <top-navigation>
      Country of residence
    </top-navigation>
    <p class="description">
      The terms and services which apply to you, will depend on your country of residence
    </p>
    <base-country-select />

    <div class="footer">
      <p class="heading-dark-gray-md font-weight--semibold text">
        By pressing Sign up securely, you agree to our 
        <a
          class="link"
          href="http://"
        >
          Terms &amp; Conditions
        </a> and
        <a
          class="link"
          href="http://"
        >
          Privacy Policy
        </a>. Your data will be securely encrypted with TLS
      </p>
      <base-button block>
        Sign up securely
      </base-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TopNavigation, BaseCountrySelect, BaseButton } from '@/components/UI';

</script>