<template>
  <div class="menu-header">
    <h4 class="title">Accounts</h4>
    <div class="add" @click="$router.push('/account/add')">+</div>
  </div>
  <ul class="menu-list">
    <li class="item" @click="$router.push('/account')">
      <div class="image-wrap">
        <img src="@/assets/icon/all-accounts.svg" alt="all" />
      </div>
      <p class="name">All Accounts</p>
      <p class="price">€2.00</p>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  > .title {
    font-weight: 600;
    font-size: 20px;
    line-height: 25px;
    letter-spacing: -0.0045em;
  }

  > .add {
    display: flex;
    justify-content: center;
    align-items: center;
    color: $color-white;
    background: $color-primary;
    border-radius: 8px;
    width: 40px;
    height: 40px;
    font-size: 25px;
    padding-bottom: 4px;
    z-index: 5;
  }
}

.menu-list {
  display: flex;
  flex-direction: column;

  > .item {
    display: flex;
    align-items: center;

    > .image-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 48px;
      height: 48px;
      background: $color-grey-100;
      margin-right: 12px;
      border-radius: 8px;
    }

    > .name {
      font-weight: 500;
      font-size: 16px;
      line-height: 21px;
      letter-spacing: -0.0031em;
    }

    > .price {
      font-weight: 500;
      font-size: 16px;
      line-height: 21px;
      text-align: right;
      letter-spacing: -0.0031em;
      margin-left: auto;
    }
  }
}
</style>
