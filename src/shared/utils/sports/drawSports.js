const sportsWithoutDraws = {
  3: 'tennis-3-set',
  4: 'tennis-5-set',
  8: 'volleyball',
  2: 'baseball',
};

export function isSportWithoutDraw(sportID) {
  if (typeof sportID === 'number') {
    sportID = sportID.toString();
  }
  const result = Object.keys(sportsWithoutDraws).find(key => key === sportID);
  return (result !== undefined);
}