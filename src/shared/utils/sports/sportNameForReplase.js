const sportNameForReplase = {
  'Регби союз': 'Регби',
  'Tennis 3 set.': 'Tennis',
  'Rugby Union': 'Rugby',
};

export const replaseSportName = sportName => sportNameForReplase[sportName] || sportName;