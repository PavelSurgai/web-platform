function getSlotImage(slotId, sectionId) {
  const slotIdStr = slotId.toLowerCase();
  const sectionIdLower = sectionId.toLowerCase();
  return `https://pitch90bet.com/images/outcome/img/${sectionIdLower}/${slotIdStr}.jpg`;
}

const sectionNames = {
  greentube: 'GT',
  gaminator: 'Gaminator',
  netent: 'NetEnt',
  igrosoft: 'Igrosoft',
  playtech: 'PlayTech',
  igt: 'IGT',
  quickspin: 'QuickSpin',
  apollo: 'Apollo',
  aristocrat: 'Aristocrat',
  amatic: 'Amatic',
  wazdan: 'Wazdan',
  microgaming: 'Microgaming',
  egt: 'EGT',
  all: 'All',
};

export {
  getSlotImage,
  sectionNames,
};
