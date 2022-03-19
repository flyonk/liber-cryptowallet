<template name="Recepients">
  <div class="who-topay">
    <div class="header">
      <img
        src="@/assets/images/avatar.png"
        @click="$router.push({ name: Route.ProfileMainView })"
      />
      <div class="flex">
        <img
          class="add mr-3"
          src="@/assets/icon/system_qr.svg"
          alt="circle-add"
        />
        <img
          class="add"
          src="@/assets/icon/circle-add.svg"
          alt="circle-add"
          @click="
            $router.push({
              name: Route.Deposit,
            })
          "
        />
      </div>
    </div>
    <h1 class="title">
      {{ $t('views.recepients.recepients') }}
    </h1>
    <BaseInput type="text">
      <template #label> Name, @id, phone, email </template>
    </BaseInput>
    <div class="contact-tabs flex">
      <router-link
        :to="{ name: Route.RecepientsLiber }"
        class="contact-tabs-item"
      >
        Liber Friends
      </router-link>
      <router-link
        :to="{ name: Route.RecepientsPhone }"
        class="contact-tabs-item"
      >
        All Contacts
      </router-link>
    </div>
    <router-view />
    <div v-if="hasFriends" class="main-list flex">
      <ul class="contacts-list">
        <li
          v-for="(contact, index) in mockContacts"
          :key="index"
          class="contact-item"
          @click="isMenuOpen = !isMenuOpen"
        >
          <div class="initials">
            {{ getContactInitials(contact.name) }}
          </div>
          <router-link :to="`/contacts/send/${index}`" class="user-contact">
            <p class="name">
              {{ contact.name }}
            </p>
            <p class="phone">
              {{ contact.phone }}
            </p>
          </router-link>
        </li>
      </ul>
      <ul class="alphabet-list">
        <li v-for="(symbol, index) in alphabet" :key="index" class="symbol">
          {{ symbol }}
        </li>
      </ul>
    </div>
    <div v-if="!hasFriends" class="empty-list">
      <img
        class="image"
        src="@/assets/images/empty_profile.png"
        alt="empty profile"
      />
      <h1 class="title">Friends list is empty</h1>
      <p class="description">
        I this list, you can find contact with which you make transactions. Add
        contact to make the first transfer.
      </p>
      <BaseButton
        class="btn"
        size="large"
        view="simple"
        @click="isMenuOpen = !isMenuOpen"
      >
        Add new contact
      </BaseButton>
    </div>
    <bottom-swipe-menu
      :is-menu-open="isMenuOpen"
      :menu-type="getMenuType"
      @close-menu="closeMenu"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

import { BaseInput, BaseButton } from '@/components/ui';
import BottomSwipeMenu from '@/components/ui/bottom-swipe-menu/BottomSwipeMenu.vue';

import { Route } from '@/router/types';

let isMenuOpen = ref(false);
let hasFriends = ref(true);

function getContactInitials(fio: string) {
  let parts = fio.split(' ');
  return parts[0][0] + parts[1][0];
}

const getMenuType = computed(() => {
  if (hasFriends.value) {
    return 'add_contact';
  } else {
    return 'add_contact';
  }
});

function closeMenu() {
  isMenuOpen.value = false;
}

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const mockContacts = [
  {
    name: 'Abraham Watsan',
    phone: '+1 347 432 32 43',
  },
  {
    name: 'Alexander Wood',
    phone: '+1 347 432 32 43',
  },
  {
    name: 'Ashley Rogers',
    phone: '+1 347 432 32 43',
  },
  {
    name: 'Vasya Pupkin',
    phone: '+1 347 432 32 43',
  },
  {
    name: 'Petr Schepetin',
    phone: '+1 347 432 32 43',
  },
  {
    name: 'Tovarish Stalin',
    phone: '+1 347 432 32 43',
  },
  {
    name: 'Super Man',
    phone: '+1 347 432 32 43',
  },
  {
    name: 'Benjamin Lewis',
    phone: '+1 347 432 32 43',
  },
];
</script>

<style lang="scss" scoped>
.who-topay {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 60px 16px 0;
  flex-grow: 1;
  overflow: auto;
  position: relative;

  > .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  > .title {
    font-weight: 800;
    font-size: 28px;
    line-height: 34px;
    letter-spacing: 0.0038em;
    margin-bottom: 24px;
  }
}

.contact-tabs {
  margin-bottom: 24px;
}

.contact-tabs-item {
  white-space: nowrap;
  padding: 11px 16px;
  color: $color-brand-primary;
  margin-right: 8px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 114px;
  height: 40px;
  background: #edf0fb;
  font-weight: 600;
  font-size: 13px;
  line-height: 18px;
  letter-spacing: -0.0008em;
}

.main-list {
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.contacts-list {
  display: flex;
  flex-direction: column;
}

.contact-item {
  display: flex;
  margin-bottom: 24px;

  > .initials {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background: $color-yellow-100;
    width: 40px;
    height: 40px;
    color: $color-yellow-700;
    margin-right: 12px;
  }
}

.alphabet-list {
  > .symbol {
    font-style: normal;
    margin-bottom: 3px;
    font-weight: 500;
    font-size: 13px;
    line-height: 18px;
    text-align: center;
    letter-spacing: -0.0008em;
    color: $color-brand-2-300;
  }
}

.user-contact {
  > .name {
    font-weight: 500;
    font-size: 17px;
    line-height: 22px;
    letter-spacing: -0.0043em;
    color: #0d1f3c;
  }

  > .phone {
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    color: $color-brand-2-300;
  }
}

.options-button {
  width: 327px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 5%;
  background: #edf0fb;
  border-radius: 13px;
  color: $color-primary-500;
  font-weight: 600;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: -0.0043em;
}

.empty-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  padding-bottom: 10%;
  width: 100%;

  > .image {
    margin-bottom: 24px;
  }

  > .title {
    font-weight: 600;
    font-size: 20px;
    line-height: 25px;
    text-align: center;
    letter-spacing: -0.0045em;
    margin-bottom: 8px;
  }

  > .description {
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;
    text-align: center;
    letter-spacing: -0.0031em;
  }

  > .btn {
    margin-top: auto;
  }
}

.router-link-exact-active {
  background: $color-brand-secondary;
  color: $color-white;
}
</style>
