import FBSVG from '../img/bonus.svg';
import InstSVG from '../img/bonus.svg';
import QuestSVG from '../img/bonus.svg';
import PresentSVG from '../img/bonus.svg';
import TwitSVG from '../img/bonus.svg';
import VKSVG from '../img/bonus.svg';
import TGSVG from '../img/bonus.svg';

import UserSVG from '../img/bonus.svg';
import WalletSVG from '../img/bonus.svg';
import BadgeSVG from '../img/bonus.svg';
import TimeSVG from '../img/bonus.svg';
import ProcessSVG from '../img/bonus.svg';

export const topLinks = [
  {
    type: 'link',
    icon: PresentSVG,
    link: '/bonuses',
    id: 'present',
  },
  {
    type: 'link',
    icon: QuestSVG,
    link: '/about-us',
    id: 'quest',
  },
  // {
  //   type: 'href',
  //   icon: InstSVG,
  //   link: 'https://www.instagram.com/bksevenbet/?hl=ru',
  //   id: 'inst',
  // },
  // {
  //   type: 'href',
  //   icon: TGSVG,
  //   link: 'https://t.me/SevenBetPublic',
  //   id: 'tg',
  // },
  // {
  //   type: 'href',
  //   icon: TwitSVG,
  //   link: 'https://twitter.com/SevenBet1',
  //   id: 'tw',
  // },
  // {
  //   type: 'href',
  //   icon: FBSVG,
  //   link: 'https://www.facebook.com/seven.bet.526',
  //   id: 'fb',
  // },
];

export const userBlockItems = [
  {
    textIdent: 'userInfo',
    icon: UserSVG,
    route: '/profile/user-info',
  },
  {
    textIdent: 'topUp',
    icon: WalletSVG,
    route: '/profile/top-up',
  },
  {
    textIdent: 'withdrawal',
    icon: BadgeSVG,
    route: '/profile/withdrawal',
  },
  {
    textIdent: 'betHistory',
    icon: TimeSVG,
    route: '/profile/bet-history',
  },
  {
    textIdent: 'payHistory',
    icon: ProcessSVG,
    route: '/profile/pay-history',
  },
  {
    textIdent: 'promotionalCodes',
    icon: PresentSVG,
    route: '/profile/activate-promocode',
  },
];
