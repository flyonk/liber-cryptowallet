import { Route } from '@/router/types';
import { useAccountStore } from '@/applications/liber/stores/account';
import { useUIStore } from '@/stores/ui';
import router from '@/router';

export enum EAreaMenuItemVisible {
  all = 'all',
  crypto = 'crypto',
  fiat = 'fiat',
  coupons = 'coupons',
}

interface IBottomSwipeMenuItem {
  text: string;
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
    text: 'transactions.carousel.sendFunds',
    icon: 'icon-send',
    onClick: () => {
      closeMenu();
      router.push({
        name: Route.PayRecepientsLiber,
      });
    },
    area: [EAreaMenuItemVisible.all],
  },
  {
    text: 'transactions.convert.title',
    icon: 'icon-convert',
    onClick: async () => {
      const accountStore = useAccountStore();

      await Promise.all([
        accountStore.getAccountList(),
        accountStore.getAccountBalance(),
      ]);

      const [{ code: firstAccountCode }] = accountStore.getAccounts;

      closeMenu();
      router.push({
        name: Route.ConvertFunds,
        query: {
          code: firstAccountCode ? firstAccountCode : 'tbtc',
        },
      });
    },
    area: [EAreaMenuItemVisible.all],
  },
  {
    text: 'Borrow stablecoin',
    icon: 'icon-borrow',
    onClick: () => {
      closeMenu();
    },
    area: [EAreaMenuItemVisible.all],
  },
  {
    text: 'Ask a user for funds',
    icon: 'icon-ask-for-funds',
    onClick: () => {
      closeMenu();
    },
    area: [EAreaMenuItemVisible.all],
  },
  {
    text: 'Withdraw',
    icon: 'icon-withdraw',
    onClick: () => {
      closeMenu();
      router.push({ name: Route.Withdraw });
    },
    area: [EAreaMenuItemVisible.all],
  },
  {
    text: 'Download Statement',
    icon: 'icon-send',
    onClick: () => {
      closeMenu();
    },
    area: [EAreaMenuItemVisible.all],
  },
  {
    text: 'Add account',
    icon: 'icon-convert',
    onClick: () => {
      closeMenu();
      router.push({ name: Route.AccountAdd });
    },
    area: [EAreaMenuItemVisible.all],
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
