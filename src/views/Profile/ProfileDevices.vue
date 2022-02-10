<template name="AccountDevices">
  <div class="account-devices">
    <div class="header">
      <img
        class="back"
        src="@/assets/icon/arrow-left.svg"
        alt="arrow-left"
        @click="$router.push('/profile')"
      >
      <h1 class="title">
        Devices
      </h1>
      <p class="description">
        These are the devices currently allowed to access your account.
      </p>
    </div>
    <div class="main">
      <ul class="list">
        <li class="item">
          <p class="name -firstt">
            iPhone XR
          </p>
          <img
            src="@/assets/icon/mobile.svg"
            alt="mobile"
          >
        </li>
        <li class="item">
          <p class="name">
            Date
          </p>
          <p class="description">
            2022.01.07 13:34:30
          </p>
        </li>
        <li class="item">
          <p class="name">
            Location
          </p>
          <p class="description">
            Pavshino Russian Federation
          </p>
        </li>
        <li class="item">
          <p class="name">
            IP
          </p>
          <p class="description">
            45.234.12.154
          </p>
        </li>
      </ul>
      <ul class="list">
        <li class="item">
          <p class="name name--first">
            Chrome V96.0.4664.93 (Mac OS)
          </p>
          <img
            src="@/assets/icon/monitor.svg"
            alt="monitor"
          >
        </li>
        <li class="item">
          <p class="name">
            Date
          </p>
          <p class="description">
            2022.01.07 13:34:30
          </p>
        </li>
        <li class="item">
          <p class="name">
            Location
          </p>
          <p class="description">
            Tallin Estonia
          </p>
        </li>
        <li class="item">
          <p class="name">
            IP
          </p>
          <p class="description">
            45.234.12.154
          </p>
        </li>
      </ul>
      <ul class="list">
        <li class="item">
          <p class="name name--first">
            iPhone XR
          </p>
          <img
            src="@/assets/icon/monitor.svg"
            alt="monitor"
          >
        </li>
        <li class="item">
          <p class="name">
            Date
          </p>
          <p class="description">
            2022.01.07 13:34:30
          </p>
        </li>
        <li class="item">
          <p class="name">
            Location
          </p>
          <p class="description">
            Tbilisi Georgia
          </p>
        </li>
        <li class="item">
          <p class="name">
            IP
          </p>
          <p class="description">
            45.234.12.154
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.account-devices {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 60px 16px 50px;
  flex-grow: 1;
  overflow: auto;

  > .header {
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;

    > .back {
      margin-bottom: 20px;
      width: 16px;
      height: 16px;
    }

    > .title {
      font-weight: 800;
      font-size: 28px;
      line-height: 34px;
      letter-spacing: 0.0038em;
      margin-bottom: 8px;
    }

    > .description {
      font-size: 17px;
      line-height: 22px;
      letter-spacing: -0.0043em;
    }
  }

  > .main {
    > .list {
      border-bottom: 1px solid rgb(175 179 195 / 30%);
      margin-bottom: 25px;

      > .item {
        display: flex;
        width: 100%;
        justify-content: space-between;
        margin-bottom: 12px;

        &:first-child {
          margin-bottom: 20px;
        }

        > .name {
          font-weight: 500;
          font-size: 16px;
          line-height: 21px;
          letter-spacing: -0.0031em;
          color: $color-dark-grey;

          &.-first {
            font-weight: 500;
            font-size: 17px;
            line-height: 22px;
            letter-spacing: -0.0043em;
            color: $color-brand-primary;
          }
        }

        > .description {
          font-weight: 500;
        }
      }
    }
  }
}
</style>
