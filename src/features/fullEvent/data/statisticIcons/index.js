import { getSportImgByID } from 'shared/utils/sports';
import gate from './gate.png';
import corners from './corners.png';
import score from './score.png';
import yellowCards from './yellow-cards.png';
import redCards from './red-cards.png';
import tempScore from './S.png';

const icons = {
  score,
  corners,
  yellowCards,
  redCards,
  curGame: tempScore,
};

export const getStatisticIcon = (name, sportID) => {
  if (name === 'score') return getSportImgByID(sportID);
  return icons[name] !== undefined ? icons[name] : name[0];
};