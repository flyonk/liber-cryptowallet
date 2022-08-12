export enum Route {
  AuthPhone = 'auth-phone',
  WelcomeLogoScreen = 'welcome-logo-screen',
  WelcomeAuthScreen = 'welcome-auth-screen',
  AuthCode = 'auth-code',
  AuthPasscode = 'auth-passcode',
  ChangePasscode = 'change-passcode',
  RestorePasscode = 'restore-passcode',
  RestorePasscodeSuccess = 'restore-passcode-success',
  ChangePasscodeEnter = 'change-passcode-enter',
  ChangeAuthapp = 'change-authapp',
  SignUp = 'sign-up',
  Login = 'login',
  Restore = 'restore',

  DashboardParent = 'dashboard-parent',
  DashboardHome = 'home',
  DashboardVerification = 'dashboard-verification',
  DashboardStory = 'dashboard-story',
  DashboardVerifyingStory = 'dashboard-verifying-story',
  DashboardTransferFundsToTreasuryStory = 'dashboard-transfer-funds-to-treasury-story',

  Account = 'account',
  AccountMain = 'account-main',
  AccountDetail = 'account-detail',
  AccountAdd = 'account-add',
  AccountAddSelectNetwork = 'account-add-select-network',
  AccountAddShowWallet = 'account-add-show-wallet',
  AccountAddSelectCoin = 'account-add-select-coin',

  Transactions = 'transactions',
  TransactionsMain = 'transactions-main',
  TransactionsDetails = 'transactions-details',
  TransactionsAll = 'transactions-all',

  ConvertFunds = 'convert',
  ContactsWhoToPay = 'contacts.who-to-pay',

  ProfileMainView = 'profile-main-view',
  ProfileSettings = 'profile-settings',
  ProfileMyQrCode = 'profile-my-qr-code',
  ProfileDevices = 'profile-devices',
  ProfilePhonesAndEmails = 'profile-phones-and-emails',
  ProfileAddNewContactData = 'profile-add-new-contact-data',
  ProfileHelp = 'profile-help',
  ProfileEdit = 'profile-edit',
  ProfileChangeAddress = 'profile-change-address',
  ProfilePrivacy = 'profile-privacy',

  ConfirmEmail = 'confirm-email',
  PhoneVerified = 'phone-verified',

  KYCMain = 'kyc-main',
  KYCPersonal = 'kyc-personal',
  KYCDocuments = 'kyc-documents',

  Survey = 'survey',

  TwoFAApp = '2fa-app',
  InstallApp = 'install-app',
  ConfigureApp = 'configure-app',
  ConfigureAppVerify = 'configure-app-verify',

  FaceId = 'face-id',
  TouchId = 'touch-id',
  PushNotifications = 'push-notifications',

  Deposit = 'deposit',

  Contacts = 'contacts',
  ContactsInviteFriends = 'contacts.invite.friends',
  ContactsFindYourFriends = 'contacts.find.your.friends',
  ContactsAddNewContact = 'contacts.add.new.contact',
  ContactsPay = 'contacts.who-to-pay',
  ContactsSend = 'contacts-send',
  ContactsSendFirstTime = 'contacts.send.first.time',
  ContactsSendInvite = 'contacts.send.invite',
  ContactsSendLink = 'contacts.send.link',

  ChooseCoin = 'choose_coin',

  Recipients = 'recipients',
  RecipientsPhone = 'recipients-phone',
  RecipientsLiber = 'recipients-liber',
  PayRecipientsPhone = 'pay-recipients-phone',
  PayRecipientsLiber = 'pay-recipients-liber',

  LoadContacts = 'request-phone-contacts',

  DepositAdd = 'deposit-add',
  DepositNetwork = 'deposit-network',
  DepositCoin = 'deposit-coin',

  PhoneEnter = 'phone-enter',
  CodeEnter = 'code-enter',

  Invite = 'invite',
  Withdraw = 'withdraw',

  DashboardLiber = 'dashboard-liber',
}
