<template>
  <ul class="add-contact">
    <router-link
      :to="'/contacts'"
      class="menu-item"
    >
      <img
        class="icon"
        src="@/assets/icon/transactions/menu/scan_qr-code.svg"
        alt="send"
      >
      <div class="inner-info">
        <p class="name">
          Scan QR Code
        </p>
        <p class="subtitle">
          Scan Liber User QR
        </p>
      </div>
    </router-link>
    <li class="menu-item">
      <img
        class="icon"
        src="@/assets/icon/transactions/menu/payment_link.svg"
        alt="send"
      >
      <div class="inner-info">
        <p class="name">
          Create payment link
        </p>
        <p class="subtitle">
          Send money to anyone with a link
        </p>
      </div>
    </li>
    <li class="menu-item">
      <img
        class="icon"
        src="@/assets/icon/transactions/menu/invite_friend.svg"
        alt="send"
      >
      <div class="inner-info">
        <p class="name">
          Invite a friend
        </p>
        <p class="subtitle">
          Share a link to join Liber
        </p>
      </div>
    </li>
    <router-link
      to="/contacts/add"
      class="menu-item"
    >
      <img
        class="icon"
        src="@/assets/icon/transactions/menu/add_contact.svg"
        alt="send"
      >
      <div class="inner-info">
        <p class="name">
          Add a new contact
        </p>
        <p class="subtitle">
          Add a contact using phone or email
        </p>
      </div>
    </router-link>
  </ul>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.add-contact {
  bottom: 0;
  display: flex;
  padding-top: 20px;
  flex-direction: column;
  width: 100%;
  padding-bottom: 50px;
}

.menu-item {
  display: flex;
  align-items: center;
  margin-bottom: 30px;

  >.icon {
    margin-right: 20px;
  }
}

.inner-info {
  >.name {
    font-weight: 500;
    font-size: 16px;
    line-height: 21px;
    letter-spacing: -0.0031em;
    color: $color-black;
  }

  >.subtitle {
    font-weight: 400;
    font-size: 13px;
    line-height: 18px;
    letter-spacing: -0.0008em;
    color: $color-brand-2-300;
  }
}

</style>