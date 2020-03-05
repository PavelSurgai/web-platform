import EnPNG from './img/en.png';
import RuPNG from './img/ru.png';
import FrPNG from './img/fr.png';

export const languages = {
  // RU: 'ru-ru',
  FR: 'fr-fr',
  EN: 'en-US',
};

export const languagesWithIcons = {
  // 'ru-ru': { lang: languages.RU, icon: RuPNG, text: 'Русский' },
  'en-US': { lang: languages.EN, icon: EnPNG, text: 'English' },
  'fr-fr': { lang: languages.FR, icon: FrPNG, text: 'Le français' },
};

export const shortLanguages = {
  // 'ru-ru': 'ru',
  'en-US': 'en',
  'fr-fr': 'fr',
};