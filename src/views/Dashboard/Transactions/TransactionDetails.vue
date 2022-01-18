<template name="TransactionDetails">
  <div class="transaction-details">
    <div class="header">
      <img
        class="back"
        src="@/assets/icon/arrow-left.svg"
        alt="arrow-left"
        @click="$router.push('/home/transactions')"
      >
      <div class="sum">
        <div class="title">
          - 2.12345678<span>USDT</span>
        </div>
        <div class="arrow-wrap">
          <img
            src="@/assets/icon/short_right.svg"
            alt="right"
          >
        </div>
      </div>
      <h2 class="sendto">
        To Abraham Watson
      </h2>
      <p class="date">
        2 days ago
      </p>
      <button class="pdf-btn">
        <img
          class="pdf-icon"
          src="@/assets/icon/file_pdf.svg"
        >
        <p>Download Statement</p>
      </button>
    </div>
    <ul class="main">
      <li class="item">
        <p class="name">
          Sent without reference
        </p>
      </li>
      <li class="item">
        <p class="name">
          Status
        </p>
        <div
          v-if="transactionStatus === 'pending'"
          class="status"
        >
          Pending
        </div>
        <div
          v-if="transactionStatus === 'complete'"
          class="status status--complete"
        >
          Complete
        </div>
        <div
          v-if="transactionStatus === 'reverted'"
          class="status status--reverted"
        >
          Reverted
        </div>
      </li>
      <li class="item">
        <p class="name">
          Payment to
        </p>
        <div class="right">
          <img src="@/assets/icon/green_ok.svg">
          <p>Abraham Watson ∙ USDT</p>
        </div>
      </li>
      <li class="item">
        <p class="name">
          Transfer Fee
        </p>
        <p class="description">
          0,12345678 USDT
        </p>
      </li>
      <li class="item">
        <div class="inner">
          <p class="name">
            Transaction ID
          </p>
          <p class="transaction-id">
            3M8w2knJKsr3jqMatYiyuraxVvZA
          </p>
        </div>
        <div class="inner">
          <img
            src="@/assets/icon/folders.svg"
            alt="folders"
          >
        </div>
      </li>
    </ul>
    <h2 class="open-title">
      Open in Explorer
    </h2>
  </div>
  <!-- <bottom-nav v-if="activeTab === 1" /> -->
</template>

<script setup lang="ts">
const transactionStatus = 'complete'

</script>

<style lang="scss" scoped>
.transaction-details {
  padding: 32px 16px 0 16px;
  height: 100%;

  >.header {
    height: 29%;
    >.sum {
      display: flex;
      justify-content: space-between;
      margin-bottom: 4px;
      
      >.title {
        display: flex;
        align-items: center;
        font-weight: 600;
        font-size: 28px;
        line-height: 34px;
        letter-spacing: 0.0038em;

        span {
          font-size: 22px;
          line-height: 34px;
          letter-spacing: -0.0026em;
          padding-left: 8px;
        }
      }

      >.arrow-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        width: 48px;
        height: 48px;
        background: #DEE0EB;
      }
    }

    >.sendto {
      font-weight: 500;
      font-size: 13px;
      line-height: 18px;
      letter-spacing: -0.0008em;
      color: #0D1F3C;
      margin-bottom: 4px;
    }

    >.date {
      font-weight: 500;
      font-size: 13px;
      line-height: 18px;
      letter-spacing: -0.0008em;
      color: #78809B;
      margin-bottom: 16px;
    }

    >.pdf-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      width: 192px;
      height: 40px;
      left: 16px;
      top: 194px;
      background: #2862FF;
      border-radius: 8px;
      font-size: 13px;
      line-height: 18px;
      letter-spacing: -0.0008em;
      color: #FFFFFF;
      margin-bottom: 40px;

      >.pdf-icon {
        margin-right: 12px;
      }
    }
  }

  >.main {
    margin-bottom: 28px;
    >.item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 53px;
      border-bottom: 1px solid rgba(175,179,195, 0.3);

      &:first-child {
        border-top: 1px solid rgba(175,179,195, 0.3);
      }

      >.name {
        font-weight: 500;
        font-size: 16px;
        line-height: 21px;
        display: flex;
        align-items: center;
        letter-spacing: -0.0031em;
        color: #78809B;
      }

      >.status {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 87px;
        height: 31px;
        background: #FFEBB0;
        border-radius: 100px;
        color: #8C6900;

        &--complete {
          background: #C5EBCA;
          color: #256A2F;
        }

        &--reverted {
          background: #FCC5C1;
          color: #AD3026;
        }
      }

      >.right {
        display: flex;

        p {
          font-weight: 500;
          font-size: 16px;
          line-height: 21px;
          display: flex;
          align-items: center;
          text-align: right;
          letter-spacing: -0.0031em;
          color: #0D1F3C;
        }

        img {
          margin-right: 9px;
        }
      }

      >.description {
        font-weight: 500;
        font-size: 16px;
        line-height: 21px;
        text-align: right;
        letter-spacing: -0.0031em;
      }

      >.inner {
        >.name {
          font-weight: 500;
          font-size: 16px;
          line-height: 21px;
          display: flex;
          align-items: center;
          letter-spacing: -0.0031em;
          color: #78809B;
        }

        >.transaction-id {
          font-weight: 500;
          font-size: 16px;
          line-height: 21px;
          letter-spacing: -0.0031em;
        }
      }
    }
  }

  >.open-title {
    font-weight: 600;
    font-size: 17px;
    line-height: 22px;
    letter-spacing: -0.0043em;
    color: #2862FF;
    text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.04);
  }
}
</style>