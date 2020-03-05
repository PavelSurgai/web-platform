import React, { useEffect, useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions as broadcastActions } from 'features/broadcast';
import { BroadcastList } from './BroadcastList/BroadcastList';
import { BroadcastSportMenu } from './BroadcastSportMenu/BroadcastSportMenu';
import { BroadcastPlayer } from './BroadcastPlayer/BroadcastPlayer';
import './Broadcast.scss';

const Broadcast = ({ getMatchList, sportList }) => {
  const b = block('broadcast');

  const [activePlayer, changeActivePlayer] = useState(null);
  const [activeSport, changeActiveSport] = useState('Football');

  useEffect(() => {
    getMatchList();
  }, []);

  const onSportClick = useCallback(e => {
    const { name } = e.currentTarget.dataset;
    changeActiveSport(name);
  }, []);

  const onClosePlayer = useCallback(() => changeActivePlayer(null), []);

  const currentEvents = useMemo(
    () => {
      const currentSport = sportList.find(sport => sport.name === activeSport);
      return currentSport ? currentSport.events : [];
    },
    [sportList, activeSport],
  );

  return (
    <section className={b()}>
      {!activePlayer ? <React.Fragment>
        <BroadcastSportMenu sports={sportList} onSportClick={onSportClick} activeSport={activeSport} />
        {currentEvents.length > 0 && <BroadcastList events={currentEvents} changeActivePlayer={changeActivePlayer} />}
      </React.Fragment> : (
        <BroadcastPlayer
          player={activePlayer}
          onClosePlayer={onClosePlayer}
        />
      )}
    </section>
  );
};

Broadcast.propTypes = {
  sportList: PropTypes.array.isRequired,

  getMatchList: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    sportList: state.broadcast.sportList,
  };
};

const mapDispatchToProps = dispatch => {
  const actions = {
    getMatchList: broadcastActions.getMatchList,
  };

  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Broadcast);
