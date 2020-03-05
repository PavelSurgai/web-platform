import topEventsImage from './img/top-events.png';
import upcomingImage from './img/upcoming.png';
import favoritesImage from './img/favorites.png';

export default [
  {
    textID: 'favorites',
    route: () => '/line/favorites-events',
    icon: favoritesImage,
  },
  {
    textID: 'upcomingEvents',
    route: pathname => {
      const sportID = pathname.substring(pathname.indexOf('sport') + 5, pathname.indexOf('country') - 1);
      const countryID = pathname.substring(pathname.indexOf('country') + 7);
      return (pathname.indexOf('sport') === -1 || pathname.indexOf('country') === -1) ?
        '/line/upcoming-events/sport5/country14' : `/line/upcoming-events/sport${sportID}/country${countryID}`;
    },
    icon: upcomingImage,
  },
  {
    textID: 'topEvents',
    route: () => '/line/top-events',
    icon: topEventsImage,
  },
];