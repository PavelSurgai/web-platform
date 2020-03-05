const sliderRoutes = [
  '/line/top-events',
  '/line/upcoming-events',
  '/main',
];

const routesWithoutBasket = [
  '/profile',
  '/auth',
  '/basket',
];

const routesForVerifying = [
  '/verify',
];

const routesForSlotsMenu = [
  'slots',
];

export const defineNeedSlider = route => sliderRoutes.findIndex(t => t === route) !== -1;

export const defineNeedBasket = route => routesWithoutBasket.findIndex(t => route.indexOf(t) !== -1) === -1;

export const defineNeedSendVerification = route => routesForVerifying.findIndex(t => route.indexOf(t) !== -1) !== -1;

export const defineNeedSlotsMenu = route => routesForSlotsMenu.findIndex(t => route.indexOf(t) !== -1) !== -1;
