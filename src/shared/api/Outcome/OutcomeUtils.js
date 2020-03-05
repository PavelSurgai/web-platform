function getSections(gameList) {
  const sections = gameList.reduce((types, item) => types.indexOf(item.sectionId) !== -1 ?
    types : [...types, item.sectionId], []);
  sections.unshift('all');
  return sections;
}

export {
  getSections,
};
