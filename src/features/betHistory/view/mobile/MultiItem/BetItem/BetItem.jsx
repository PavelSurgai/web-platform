import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';

import './BetItem.scss';

const BetItem = ({ bet, locale }) => {
  const b = block('bet-item');
  const { match, name, coef, status, score, tourneyName, date } = bet;
  return (
    <div className={b({ status })}>
      <div className={b('wrapper')}>
        <div className={b('teams')}>{match}</div>
        <div className={b('coef-info')}>
          <div className={b('coef')}>
            {coef}
          </div>
          <div className={b('coef-name')}>
            {name}
          </div>
        </div>
        <div className={b('score')}>
          {`${locale.score}: ${score}`}
        </div>
        <div className={b('game-info')}>
          {tourneyName}
          <div className={b('event-date')}>{date}</div>
        </div>
        <div className={b('black-ball', { first: true })} />
        <div className={b('black-ball', { last: true })} />
      </div>
    </div>
  );
};

BetItem.propTypes = {
  bet: PropTypes.object.isRequired,
  locale: PropTypes.object.isRequired,
};

export default BetItem;
