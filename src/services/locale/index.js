import EnPNG from './img/en.png';
import FrPNG from './img/fr.png';

export const languages = {
  FR: 'fr-fr',
  EN: 'en-US',
};

export const languagesWithIcons = {
  'fr-fr': { lang: languages.FR, icon: FrPNG, text: 'Le français' },
  'en-US': { lang: languages.EN, icon: EnPNG, text: 'English' },
};

export const shortLanguages = {
  'fr-fr': 'fr',
  'en-US': 'en',
};