const tennisSets = ['1', '2', '3', '4', '5'];

export const modifyScore = statistic => {
  const curGameScoreIndex = statistic.findIndex(t => t.name === 'curGame');
  const curGameScore = curGameScoreIndex !== -1 ?
    `${statistic[curGameScoreIndex].value[0]}:${statistic[curGameScoreIndex].value[1]}` : '0:0';
  return curGameScore;
};

export const modifyTime = (statistic, score) => {
  let sets = '(';
  statistic.forEach(t => {
    if (tennisSets.findIndex(temp => temp === t.name) !== -1) {
      sets += `${t.value[0]}-${t.value[1]};`;
    }
  });
  if (sets.length > 1) {
    sets = sets.slice(0, -1);
    sets += ')';
  } else {
    sets = '';
  }
  return `${score} ${sets}`;
};