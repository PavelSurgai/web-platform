import { domain } from '../../../settings';

const getSlotImage = section => {
  return `${domain}/inbet/media/${section}`;
};

const sectionNames = {
  slot: 'Slot',
  betting: 'Betting',
  egame: 'Egame',
};

export {
  getSlotImage,
  sectionNames,
};