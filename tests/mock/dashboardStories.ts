import { Route } from '@/router/types';
import { STATIC_BASE_URL } from '@/constants';

export type TDashboardStory = {
  status: string;
  description: string;
  imgSrc: string;
  text: string;
  route: Route;
  color?: string;
};

export const stories: TDashboardStory[] = [
  {
    status: 'In Progress',
    description: 'We’re verifying your ID',
    imgSrc: `${STATIC_BASE_URL}/todo/empty-profile.svg`,
    text: 'blue',
    route: Route.DashboardVerifyingStory,
    color: 'blue',
  },
  {
    status: 'Required',
    description: 'Verify your email address',
    imgSrc: `${STATIC_BASE_URL}/todo/mail.svg`,
    text: 'blue',
    route: Route.DashboardStory,
    color: 'blue',
  },
  {
    status: 'Recommend',
    description: 'Get your first crypto property',
    imgSrc: `${STATIC_BASE_URL}/todo/wallet.svg`,
    text: 'green',
    route: Route.DashboardHome,
    color: 'green',
  },
  {
    status: '_',
    description: 'How can we reach you?',
    imgSrc: `${STATIC_BASE_URL}/todo/mail.svg`,
    text: 'black',
    route: Route.DashboardTransferFundsToTreasuryStory,
    color: 'yellow',
  },
];
