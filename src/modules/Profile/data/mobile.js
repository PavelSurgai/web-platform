import AdditionalInfo from 'features/profile/view/mobile/AdditionalInfo';
import ChangePassword from 'features/profile/view/mobile/ChangePassword';
import BetHistory from 'features/betHistory/view/mobile/BetHistory';
import Basket from 'features/basket/mobile';
import { TopUp, Withdrawal } from 'features/payment/mobile';
import { PayHistory } from 'features/payHistory/mobile';
import { PromotionalCodes } from 'features/promocodes/view/mobile';
import AboutUsLayout from 'modules/Contacts/mobile/view/ContactsLayout/ContactsLayout';
import SettingsInterface from 'features/profile/view/mobile/SettingsInterface';

import { actions as authActions } from 'features/auth';
import { actions as userSettingsActions } from 'features/userSettings';

import HandSVG from '../img/hand.svg';
import InfoSVG from '../img/info.svg';
import BasketSVG from '../img/basket.svg';
import KeySVG from '../img/key.svg';
import TimeSVG from '../img/time.svg';
import WalletSVG from '../img/wallet.svg';
import ProcessSVG from '../img/process.svg';
import present from '../img/present.svg';
import resultsSVG from '../img/results.svg';
import bonusesSVG from '../img/bonuses.svg';
import cybersportSVG from '../img/cybersport.svg';
import downloadSVG from '../img/download.svg';
import aboutSVG from '../img/about.svg';
import chatSVG from '../img/chat.svg';
import personal from '../img/personal.svg';
import settingsInterface from '../img/settingInterface.svg';
import languagies from '../img/languagies.svg';
import logOut from '../img/log-out.svg';
import coefs from '../img/coefs.svg';

export const profileTabs = [
  {
    link: '/profile/pay-history',
    textIdent: 'payHistory',
    icon: ProcessSVG,
    component: PayHistory,
    additionalText: 'payAdd',
  },
  {
    link: '/profile/promotional-codes',
    textIdent: 'promotionalCodes',
    icon: present,
    component: PromotionalCodes,
    additionalText: 'promotionalAdd',
  },
  {
    link: '/profile/personaldate',
    textIdent: 'personalDate',
    icon: personal,
    component: AdditionalInfo,
    additionalText: 'personalDateAdd',
  },
  {
    link: '/profile/bet-history',
    textIdent: 'betHistory',
    icon: TimeSVG,
    hideNonAuth: true,
    component: BetHistory,
    additionalText: 'betHistoryAdd',
  },
  {
    link: '/profile/top-up',
    component: TopUp,
    textIdent: 'topUp',
    hideNonAuth: true,
    additionalText: 'topUpAdd',
  },
  {
    link: '/profile/withdrawal',
    component: Withdrawal,
    textIdent: 'withdrawal',
    hideNonAuth: true,
    additionalText: 'withdrawalAdd',
  },
  {
    link: '/profile/change-password',
    textIdent: 'changePassword',
    hideNonAuth: true,
    additionalText: 'сhangePasswordAdd',
    component: ChangePassword,
  },
  // {
  //   link: '/profile/settings-interface',
  //   textIdent: 'settingsInterface',
  //   hideNonAuth: true,
  //   additionalText: 'settingsInterface',
  //   component: SettingsInterface,
  // },
];

export const mainTabs = [
  {
    headerText: 'bets',
    links: [
      {
        link: '/basket',
        textIdent: 'betslip',
        additionalText: 'betslipAdd',
        icon: BasketSVG,
        component: Basket,
      },
      {
        link: '/profile/bet-history',
        textIdent: 'betHistory',
        icon: TimeSVG,
        hideNonAuth: true,
        component: BetHistory,
        additionalText: 'betHistoryAdd',
      },
      {
        link: 'results',
        textIdent: 'results',
        icon: resultsSVG,
        additionalText: 'resultsAdd',
      },
    ],
  },
  {
    headerText: 'help',
    links: [
      {
        link: '/about-us',
        textIdent: 'aboutUs',
        additionalText: 'aboutUsAdd',
        icon: aboutSVG,
        component: AboutUsLayout,
      },
      {
        callBack: () => window.jivo_api.open(),
        textIdent: 'chat',
        additionalText: 'chatAdd',
        icon: chatSVG,
      },
    ],
  },
  // {
  //   headerText: 'actual',
  //   links: [
  //     {
  //       link: '/bonuses',
  //       textIdent: 'bonuses',
  //       icon: bonusesSVG,
  //       additionalText: 'bonusesAdd',
  //     },
  //     {
  //       link: '/cybersport',
  //       textIdent: 'cybersport',
  //       icon: cybersportSVG,
  //       additionalText: 'cybersportAdd',
  //     },
  //     {
  //       link: '/download-app-s',
  //       textIdent: 'downloadApp',
  //       icon: downloadSVG,
  //       additionalText: 'downloadAppAdd',
  //     },
  //   ],
  // },
  {
    headerText: 'settings',
    links: [
      {
        link: '/profile/settings-interface',
        textIdent: 'settingsInterface',
        additionalText: 'settingsInterfaceAdd',
        icon: settingsInterface,
      },
      {
        link: '/profile/change-password',
        textIdent: 'changePassword',
        additionalText: 'сhangePasswordAdd',
        icon: KeySVG,
      },
      {
        callBack: userSettingsActions.changeSetLangVisibility,
        textIdent: 'language',
        additionalText: 'languageAdd',
        icon: languagies,
      },
      {
        callBack: userSettingsActions.changeSetOddTypeVisibility,
        textIdent: 'odd',
        additionalText: 'oddAdd',
        icon: coefs,
      },
      {
        callBack: authActions.logOut,
        hideNonAuth: true,
        textIdent: 'logout',
        icon: logOut,
      },
    ],
  },
];