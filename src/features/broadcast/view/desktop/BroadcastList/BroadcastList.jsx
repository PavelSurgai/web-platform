import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';

import { BroadcastEvent } from './BroadcastEvent/BroadcastEvent';
import './BroadcastList.scss';

export const BroadcastList = ({ events, changeActivePlayer }) => {
  const b = block('broadcast-list');

  const renderEvent = useCallback(event => (
    <BroadcastEvent
      key={event.count}
      event={event}
      changeActivePlayer={changeActivePlayer}
    />
  ), []);

  return (
    <div className={b()}>
      {events.map(renderEvent)}
    </div>
  );
};

BroadcastList.propTypes = {
  events: PropTypes.array.isRequired,

  changeActivePlayer: PropTypes.func.isRequired,
};