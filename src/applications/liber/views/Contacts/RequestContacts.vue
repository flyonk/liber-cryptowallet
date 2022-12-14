<template>
  <t-top-navigation
    left-icon-name="icon-app-navigation-close"
    with-fixed-footer
    @click:left-icon="onCancel"
  >
    <template #title>{{ $t('views.requestcontacts.title') }}</template>
    <template #subtitle>{{ $t('views.requestcontacts.description') }}</template>
    <template #content
      ><div class="page-content">
        <img
          alt="Puch notifications"
          class="dragndrop mb-3"
          src="@/assets/images/dragndrop-bg.png"
        />
        <p class="text-default -annotation">
          {{ $t('views.requestcontacts.annotation') }}
        </p>
      </div></template
    >
    <template #fixed-footer>
      <m-base-button block class="mb-3" @click="onEnable">
        {{ $t('views.requestcontacts.contactsCTA') }}
      </m-base-button>
      <m-base-button block view="secondary" @click="onCancel">
        {{ $t('common.notNowCta') }}
      </m-base-button>
    </template>
  </t-top-navigation>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import { inject } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useRecipientsStore } from '@/stores/recipients';

import { TTopNavigation } from '@/components/ui';

import { Route } from '@/router/types';
import { useErrorsStore } from '@/stores/errors';
import { uiKitKey } from '@/types/symbols';

const uiKit = inject(uiKitKey);
const { MBaseButton } = uiKit!;

const router = useRouter();
const route = useRoute();
const store = useRecipientsStore();

const onEnable = (): void => {
  store
    .getPhoneContacts()
    .then(() => {
      nextRoute();
    })
    .catch((err) => {
      nextRoute();

      const errorsStore = useErrorsStore();

      errorsStore.handle({
        err,
        name: 'RequestContacts',
        ctx: 'onEnable',
        description: `Error receiving contacts`,
      });
    });
};

const onCancel = (): void => {
  nextRoute();
};

function nextRoute() {
  const routerBackName = route.params.back || Route.RecipientsPhone;
  router.push({
    name: routerBackName,
    params: {
      next: 'true',
    },
  });
}
</script>

<style lang="scss" scoped>
.text-default {
  font-style: normal;
  font-weight: 600;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: -0.0043em;
  border-radius: 13px;
  text-align: left;
  box-shadow: none;
  outline: none;
  border: none;
  height: 48px;
  width: 100%;

  &.-annotation {
    font-size: 13px;
    line-height: 18px;
    letter-spacing: -0.0008em;
    color: $color-brand-2-300;
    text-align: center;
  }
}

.page-content {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;

  > .dragndrop {
    width: 100%;

    @include iPhoneSE {
      width: 220px;
    }
  }
}
</style>
