import { Route } from '@/router/types';
import { useAccountStore } from '@/applications/liber/stores/account';
import { useUIStore } from '@/stores/ui';
import router from '@/router';
import { CRYPTO_TRANSACTIONS, COUPONS_TRANSACTIONS } from '@/constants';
import {
  ECryptoTransactionsEnvVars,
  ECouponsTransactionsEnvVars,
} from '@/types/base-component';

export enum EAreaMenuItemVisible {
  all = 'all',
  crypto = 'crypto',
  fiat = 'fiat',
  coupons = 'coupons',
  disabled = 'disabled', // disabled by env var
}

export interface IBottomSwipeMenuItem {
  textcrypto?: string; // the same as `text${EAreaMenuItemVisible.crypto}`
  textcoupons?: string; // the same as `text${EAreaMenuItemVisible.coupons}`
  textfiat?: string; // the same as `text${EAreaMenuItemVisible.fiat}`
  icon: string;
  onClick: () => void;
  area?: EAreaMenuItemVisible[];
}

function closeMenu() {
  const uiStore = useUIStore();
  uiStore.setStateModal('sendMenu', false);
}

const itemsList: IBottomSwipeMenuItem[] = [
  {
    [`text${EAreaMenuItemVisible.coupons}`]:
      'transactions.operations.coupons.buy',
    icon: 'icon-send',
    onClick: () => {
      closeMenu();
    },
    area: [
      COUPONS_TRANSACTIONS.includes(ECouponsTransactionsEnvVars.purchase)
        ? EAreaMenuItemVisible.coupons
        : EAreaMenuItemVisible.disabled,
    ],
  },
  {
    [`text${EAreaMenuItemVisible.crypto}`]: 'transactions.carousel.sendFunds',
    [`text${EAreaMenuItemVisible.coupons}`]:
      'transactions.operations.coupons.send',
    icon: 'icon-send',
    onClick: () => {
      closeMenu();
      router.push({
        name: Route.PayRecipientsLiber,
      });
    },
    area: [
      CRYPTO_TRANSACTIONS.includes(ECryptoTransactionsEnvVars.send)
        ? EAreaMenuItemVisible.crypto
        : EAreaMenuItemVisible.disabled,
      COUPONS_TRANSACTIONS.includes(ECouponsTransactionsEnvVars.send)
        ? EAreaMenuItemVisible.coupons
        : EAreaMenuItemVisible.disabled,
    ],
  },
  {
    [`text${EAreaMenuItemVisible.crypto}`]: 'transactions.convert.title',
    [`text${EAreaMenuItemVisible.coupons}`]:
      'transactions.operations.coupons.convert',
    icon: 'icon-convert',
    onClick: async () => {
      const accountStore = useAccountStore();

      await Promise.all([
        accountStore.getAccountList(),
        accountStore.getAccountBalance(),
      ]);

      const activeAccount = accountStore.getActiveAccount;

      closeMenu();
      if (activeAccount) {
        router.push({
          name: Route.ConvertFunds,
          query: {
            code: activeAccount.code,
          },
        });
      } else {
        const [{ code: firstAccountCode }] = accountStore.getAccounts;
        router.push({
          name: Route.ConvertFunds,
          query: {
            code: firstAccountCode ? firstAccountCode : 'tbtc',
          },
        });
      }
    },
    area: [
      CRYPTO_TRANSACTIONS.includes(ECryptoTransactionsEnvVars.convert)
        ? EAreaMenuItemVisible.crypto
        : EAreaMenuItemVisible.disabled,
      COUPONS_TRANSACTIONS.includes(ECouponsTransactionsEnvVars.convert)
        ? EAreaMenuItemVisible.coupons
        : EAreaMenuItemVisible.disabled,
    ],
  },
  {
    [`text${EAreaMenuItemVisible.crypto}`]: 'Borrow stablecoin',
    icon: 'icon-borrow',
    onClick: () => {
      closeMenu();
    },
    area: [EAreaMenuItemVisible.crypto],
  },
  {
    [`text${EAreaMenuItemVisible.crypto}`]: 'Ask a user for funds',
    icon: 'icon-ask-for-funds',
    onClick: () => {
      closeMenu();
    },
    area: [EAreaMenuItemVisible.crypto],
  },
  {
    [`text${EAreaMenuItemVisible.crypto}`]:
      'transactions.operations.crypto.withdraw',
    [`text${EAreaMenuItemVisible.coupons}`]:
      'transactions.operations.coupons.withdraw',
    icon: 'icon-withdraw',
    onClick: async () => {
      const accountStore = useAccountStore();

      await Promise.all([
        accountStore.getAccountList(),
        accountStore.getAccountBalance(),
      ]);

      const activeAccount = accountStore.getActiveAccount;

      closeMenu();
      if (activeAccount) {
        router.push({
          name: Route.Withdraw,
          params: { code: activeAccount.code },
        });
      } else {
        router.push({ name: Route.Withdraw });
      }
    },
    area: [
      CRYPTO_TRANSACTIONS.includes(ECryptoTransactionsEnvVars.withdraw)
        ? EAreaMenuItemVisible.crypto
        : EAreaMenuItemVisible.disabled,
      COUPONS_TRANSACTIONS.includes(ECouponsTransactionsEnvVars.withdraw)
        ? EAreaMenuItemVisible.coupons
        : EAreaMenuItemVisible.disabled,
    ],
  },
  {
    [`text${EAreaMenuItemVisible.crypto}`]: 'Download Statement',
    icon: 'icon-send',
    onClick: () => {
      closeMenu();
    },
    area: [EAreaMenuItemVisible.crypto],
  },
  {
    [`text${EAreaMenuItemVisible.crypto}`]: 'Add account',
    icon: 'icon-convert',
    onClick: () => {
      closeMenu();
      router.push({ name: Route.AccountAdd });
    },
    area: [EAreaMenuItemVisible.crypto],
  },
];

export default itemsList;

export const getFilteredItemsList = (
  list: IBottomSwipeMenuItem[],
  filter: EAreaMenuItemVisible
) => {
  return list.filter((item: IBottomSwipeMenuItem) => {
    return (
      item.area?.includes(EAreaMenuItemVisible.all) ||
      item.area?.includes(filter)
    );
  });
};
