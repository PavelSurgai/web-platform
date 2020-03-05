import dayjs from 'dayjs';
import { shortLanguages } from 'services/locale';

// импорт локализации dayjs для языков
import 'dayjs/locale/en';
import 'dayjs/locale/fr';

const actionTypes = {
  CHANGE_LANG: 'locale/CHANGE_LANG',
};

function changeLang(lang) {
  return async dispatch => {
    const { locale } = await import(`services/locale/${lang}/index`); // code-spliting для словарей
    document.querySelector('html').lang = shortLanguages[lang];
    dayjs.locale(shortLanguages[lang]);
    dispatch({ type: actionTypes.CHANGE_LANG, payload: { locale, lang } });
  };
}

export {
  actionTypes,
  changeLang,
};