import { Route } from '@/router/types';
import { useAccountStore } from '@/applications/liber/stores/account';
import { useUIStore } from '@/stores/ui';
import router from '@/router';

interface IBottomSwipeMenuItem {
  text: string;
  icon: string;
  onClick: () => void;
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
  },
  {
    text: 'Borrow stablecoin',
    icon: 'icon-borrow',
    onClick: () => {
      closeMenu();
    },
  },
  {
    text: 'Ask a user for funds',
    icon: 'icon-ask-for-funds',
    onClick: () => {
      closeMenu();
    },
  },
  {
    text: 'Withdraw',
    icon: 'icon-withdraw',
    onClick: () => {
      closeMenu();
      router.push({ name: Route.Withdraw });
    },
  },
  {
    text: 'Download Statement',
    icon: 'icon-send',
    onClick: () => {
      closeMenu();
    },
  },
  {
    text: 'Add account',
    icon: 'icon-convert',
    onClick: () => {
      closeMenu();
      router.push({ name: Route.AccountAdd });
    },
  },
];

export default itemsList;
