import main from './iconsMobileMenu/main.svg';
import line from './iconsMobileMenu/linebetting.svg';
import live from './iconsMobileMenu/livebetting.svg';
import slots from './iconsMobileMenu/slots.svg';
import burger from './iconsMobileMenu/burger.svg';
import basket from './iconsMobileMenu/basket.svg';

const MainMenuItems = [
  {
    route: '/profile',
    icon: burger,
    isBtn: true,
  },
  // {
  //   route: '/main',
  //   icon: main,
  // },
  {
    route: '/line',
    icon: line,
  },
  {
    route: '/live',
    icon: live,
  },
  {
    route: '/slots',
    icon: slots,
  },
];

function ActiveCheck(currentItem, location) {
  const result = currentItem.route === '/line' ?
    location.pathname.indexOf('/line') !== -1 :
    location.pathname === currentItem.route;
  return result;
}

export { MainMenuItems, ActiveCheck };