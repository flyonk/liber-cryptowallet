import { DefineComponent } from 'vue';

export enum EUiKit {
  uiKit = 'uiKit',
}

type Component = DefineComponent<
  Record<string, unknown>,
  Record<string, unknown>,
  any
>;

export interface UiKitInterface {
  ACoinSwitcher: Component;
  AСoinItem: Component;
  AAccountBalance: Component;
  ABackHistoryBtn: Component;
  ABaseProgressBar: Component;
  ABaseProgressCircular: Component;
  ABaseRadioSelect: Component;
  ABaseSearchInput: Component;
  ABottomSwipeMenuItem: Component;
  ACircleOpenButton: Component;
  ACircleSpinner: Component;
  ACoinIcon: Component;
  AContactInitials: Component;
  AFilterItems: Component;
  AKycStatusBadge: Component;
  ALiberIcon: Component;
  AMainPageLoader: Component;
  ANavBarItem: Component;
  AOfflineBundler: Component;
  APhoneContactsAlphabet: Component;
  ATransactionIcon: Component;
  ATransactionStatus: Component;
  ATrippleDotsSpinner: Component;
  MConvertTransactionItem: Component;
  MExternalTransactionItem: Component;
  MTransferTransactionItem: Component;
  MAllAccountsFiatSum: Component;
  MBaseAccount: Component;
  MBaseBottomSheetV: Component;
  MBaseButton: Component;
  MBaseCountdown: Component;
  MBaseInput: Component;
  MBaseSwitch: Component;
  MBaseToast: Component;
  MBaseVerificationCodeInput: Component;
  MBottomNav: Component;
  MDashboardCoinInfo: Component;
  MKycStatusCard: Component;
  MQuestionWithAnswers: Component;
  MSelectCoin: Component;
  MTopNavigation: Component;
  MTransactionFilters: Component;
}
