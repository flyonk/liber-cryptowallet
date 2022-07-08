// keys are the same as for liber app routes
// values are also the same, but with prefix "coupons-"

export enum CouponRoutes {
  DashboardHome = 'coupons-home',

  Account = 'coupons-account',
  AccountMain = 'coupons-account-main',

  Recipients = 'coupons-recipients',
  RecipientsPhone = 'coupons-recipients-phone',
  RecipientsLiber = 'coupons-recipients-liber',

  Invite = 'coupons-invite',

  Transactions = 'coupons-transactions',
  TransactionsMain = 'coupons-transactions-main',
  TransactionsDetails = 'coupons-transactions-details',
  TransactionsAll = 'coupons-transactions-all',
}
