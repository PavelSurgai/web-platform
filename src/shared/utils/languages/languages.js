export const remouteLanguages = {
  // 'ru-ru': 'ru',
  'en-US': 'en',
  'fr-fr': 'fr',
};

export const lang = {
  'en-US': 1,
  // 'ru-ru': 0,
  'kk-KZ': 0,
  'fr-fr': 3,
};

export const getLangIdByName = name => {
  const langId = lang[name];
  return langId;
};