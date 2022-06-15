import { RouteRecordRaw } from 'vue-router';

// Pages
import CodeEnter from '@/views/Auth/CodeEnter.vue';
import SignUp from '@/views/Auth/SignUp/SignUp.vue';
import Login from '@/views/Auth/Login/MainLogin.vue';
import Restore from '@/views/Auth/Restore/MainRestore.vue';
import { Route } from '@/router/types';

import WelcomeLogoScreen from '@/views/Welcome/WelcomeLogoScreen.vue';
import WelcomeAuthScreen from '@/views/Welcome/WelcomeAuthScreen.vue';

import PasscodeEnter from '@/views/ConfigureApp/PasscodeEnter.vue';
import ChangePasscode from '@/views/ConfigureApp/ChangePasscode.vue';
import ChangePasscodeEnter from '@/views/ConfigureApp/ChangePasscodeEnter.vue';
import ChangeAuthApp from '@/views/ConfigureApp/ChangeAuthApp.vue';

import FaceId from '@/views/ConfigureApp/Options/FaceId.vue';
import TouchId from '@/views/ConfigureApp/Options/TouchId.vue';
import PushNotifications from '@/views/ConfigureApp/Options/PushNotifications.vue';

import TwoFA from '@/views/ConfigureApp/TwoFA.vue';
import InstallApp from '@/views/ConfigureApp/InstallApp.vue';
import ConfigureApp from '@/views/ConfigureApp/ConfigureApp.vue';
import ConfigureAppVerify from '@/views/ConfigureApp/ConfigureAppVerify.vue';

import Profile from '@/views/Profile/index.vue';
import ProfileSettings from '@/views/Profile/ProfileSettings.vue';
import ProfileMyQrCode from '@/views/Profile/ProfileMyQrCode.vue';
import ProfileDevices from '@/views/Profile/ProfileDevices.vue';
import ProfileHelpPage from '@/views/Profile/ProfileHelpPage.vue';
import ProfileDetails from '@/views/Profile/ProfileDetails.vue';
import PrivacySettings from '@/views/Profile/PrivacySettings.vue';
import ProfileAcceptedPhonesAndEmails from '@/views/Profile/ProfileAcceptedPhonesAndEmails.vue';
import ProfileAddNewContactData from '@/views/Profile/ProfileAddNewContactData.vue';

import KYCMain from '@/views/KYC/KYCMain.vue';

import SurveyScreen from '@/views/Survey/SurveyScreen.vue';

import PEmailSent from '@/components/ui/pages/PEmailSent.vue';
import PPhoneVerified from '@/components/ui/pages/PPhoneVerified.vue';

// Routes
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: Route.WelcomeLogoScreen,
    component: WelcomeLogoScreen,
  },
  {
    path: '/welcome-auth',
    name: Route.WelcomeAuthScreen,
    component: WelcomeAuthScreen,
  },
  {
    path: '/code',
    name: Route.AuthCode,
    component: CodeEnter,
    meta: { layout: 'default' },
  },

  {
    path: '/passcode',
    name: Route.AuthPasscode,
    component: PasscodeEnter,
  },

  {
    path: '/change-passcode',
    name: Route.ChangePasscode,
    component: ChangePasscode,
    meta: { layout: 'default' },
  },

  {
    path: '/change-passcode-enter',
    name: Route.ChangePasscodeEnter,
    component: ChangePasscodeEnter,
    meta: { layout: 'default' },
  },

  {
    path: '/change-authapp',
    name: Route.ChangeAuthapp,
    component: ChangeAuthApp,
    meta: {
      classLayout: '-full-height',
    },
  },

  {
    path: '/sign-up',
    name: Route.SignUp,
    component: SignUp,
    meta: { layout: 'default' },
  },

  {
    path: '/login',
    name: Route.Login,
    component: Login,
    meta: {
      classLayout: '-full-height',
    },
  },

  {
    path: '/restore',
    name: Route.Restore,
    component: Restore,
    meta: {
      layout: 'default',
    },
  },

  // === Configure app options ===

  {
    path: '/faceid',
    name: Route.FaceId,
    meta: {
      classLayout: '-full-height',
      authRequired: true,
    },
    component: FaceId,
  },
  {
    path: '/touchid',
    name: Route.TouchId,
    meta: {
      classLayout: '-full-height',
      authRequired: true,
    },
    component: TouchId,
  },
  {
    path: '/push-notifications',
    name: Route.PushNotifications,
    meta: {
      classLayout: '-full-height',
      authRequired: true,
    },
    component: PushNotifications,
  },
  // === KYC ===

  {
    path: '/kyc',
    name: Route.KYCMain,
    meta: { authRequired: true },
    component: KYCMain,
  },

  // === Profile (Left Navigation Menu) ===

  {
    path: '/profile',
    name: Route.ProfileMainView,
    meta: { authRequired: true },
    component: Profile,
    children: [
      {
        path: '',
        name: Route.ProfileSettings,
        component: ProfileSettings,
      },
      {
        path: 'my-qr-code',
        name: Route.ProfileMyQrCode,
        component: ProfileMyQrCode,
      },
      {
        path: 'devices',
        name: Route.ProfileDevices,
        component: ProfileDevices,
      },
      {
        path: 'profile-phones-and-emails',
        name: Route.ProfilePhonesAndEmails,
        component: ProfileAcceptedPhonesAndEmails,
      },
      {
        path: 'profile-add-new-contact-data',
        name: Route.ProfileAddNewContactData,
        component: ProfileAddNewContactData,
      },
      {
        path: 'confirm-email',
        name: Route.ConfirmEmail,
        component: PEmailSent,
      },
      {
        path: 'phone-verified',
        name: Route.PhoneVerified,
        component: PPhoneVerified,
      },
      {
        path: 'help',
        name: Route.ProfileHelp,
        component: ProfileHelpPage,
      },
      {
        path: 'details/:id',
        name: Route.ProfileEdit,
        component: ProfileDetails,
      },
      {
        path: 'privacy',
        name: Route.ProfilePrivacy,
        component: PrivacySettings,
      },
    ],
  },

  // === Survey ===

  {
    path: '/survey',
    name: Route.Survey,
    component: SurveyScreen,
  },

  // === Configure 2fa ===
  {
    path: '/2fa',
    name: Route.TwoFAApp,
    component: TwoFA,
    meta: {
      classLayout: '-full-height',
    },
  },
  {
    path: '/install',
    name: Route.InstallApp,
    component: InstallApp,
    meta: {
      classLayout: '-full-height',
    },
  },
  {
    path: '/config',
    name: Route.ConfigureApp,
    component: ConfigureApp,
    meta: {
      classLayout: '-full-height',
    },
  },
  {
    path: '/config-verify',
    name: Route.ConfigureAppVerify,
    component: ConfigureAppVerify,
    meta: {
      classLayout: '-full-height',
    },
  },
];

export default routes;
