import BallSVG from './img/ball.svg';
import CartSVG from './img/cart.svg';
import GameSVG from './img/game.svg';
import HomeSVG from './img/home.svg';
import QuestSVG from './img/quest.svg';
import PlaySVG from './img/play.svg';
import DiceSVG from './img/dice.svg';
import CardsSVG from './img/cards.svg';
import PhoneSVG from './img/phone.svg';
import PrizeSVG from './img/prize.svg';
import QualitySVG from './img/quality.svg';
import StarSVG from './img/star.svg';

export const sideMenuItems = [
  // {
  //   textIdent: 'main',
  //   link: '#',
  //   icon: HomeSVG,
  //   childs: [
  //     { textIdent: 'topLeagues', link: '/line/top-events' },
  //     { textIdent: 'upcomingEvents', link: '#' },
  //   ],
  // },
  // {
  //   textIdent: 'favorite',
  //   link: '/line/favorites-events',
  //   icon: StarSVG,
  // },
  {
    textIdent: 'profile',
    link: '/profile',
    icon: HomeSVG,
  },
  {
    textIdent: 'line',
    link: '/line',
    icon: BallSVG,
  },
  {
    textIdent: 'live',
    link: '/live',
    icon: PlaySVG,
  },
  // {
  //   textIdent: 'esport',
  //   link: '/cybersport',
  //   icon: GameSVG,
  // },
  // {
  //   textIdent: 'totalizator',
  //   link: '/toto',
  //   icon: CardsSVG,
  // },
  {
    textIdent: 'casino',
    link: '/slots',
    icon: DiceSVG,
  },
  {
    textIdent: 'liveCasino',
    link: '/live-casino/all',
    icon: CardsSVG,
  },
  {
    textIdent: 'basket',
    link: '/basket',
    icon: CartSVG,
  },
  {
    textIdent: 'results',
    link: '/results',
    icon: QualitySVG,
  },
  // {
  //   textIdent: 'bonuses',
  //   link: '/bonuses',
  //   icon: PrizeSVG,
  // },
  {
    textIdent: 'settings',
    link: '/profile/settings',
    icon: QuestSVG,
  },
  // {
  //   textIdent: 'downloadApp',
  //   link: '/download-app-s',
  //   icon: PhoneSVG,
  // },
];
