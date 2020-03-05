import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as basketActions } from 'features/basket';
import { actions as lineActions } from '../../../redux';

import LiveSportMenu from '../LiveSportMenu';
import LiveSport from '../LiveSport';

import './Live.scss';

const Live = props => {
  const b = block('live');

  const [activeSportID, changeActiveSport] = useState(0);

  const { sports, locale, changeOpenedSport, changeOpenedTourney, changeOpenedSportTourneys,
    addToBasket, bets, oddType, coefType } = props;

  const selectedRates = useMemo(() => bets.map(tempBet => tempBet.ID), [bets]);

  const onSportClick = useCallback(ID => {
    if (ID !== activeSportID) {
      changeActiveSport(ID);
    } else {
      changeOpenedSportTourneys(ID);
    }
  }, [activeSportID, changeOpenedSportTourneys]);

  const sportMenuList = useMemo(() => [
    { ID: 0, name: locale.allSports },
    ...sports.map(temp => ({ ID: temp.ID, name: temp.name })),
  ], [locale.allSports, sports]);

  const sportList = activeSportID === 0 ? sports.map(tempSport => (
    <LiveSport
      key={tempSport.ID}
      locale={locale}
      sport={tempSport}
      oddType={oddType}
      coefType={coefType}
      changeOpenedSport={changeOpenedSport}
      changeOpenedTourney={changeOpenedTourney}
      addToBasket={addToBasket}
      selectedRates={selectedRates}
    />)) : (<LiveSport
      locale={locale}
      sport={sports.find(tempSport => tempSport.ID === activeSportID)}
      changeOpenedSport={changeOpenedSport}
      oddType={oddType}
      coefType={coefType}
      changeOpenedTourney={changeOpenedTourney}
      addToBasket={addToBasket}
      selectedRates={selectedRates}
    />);
  
  return (
    <article className={b()}>
      <div className={b('menu-container')}>
        <LiveSportMenu
          sportList={sportMenuList}
          activeID={activeSportID}
          callBack={onSportClick}
        />
      </div>
      <section className={b('content')}>
        {sportList}
      </section>
    </article>
  );
};

Live.propTypes = {
  sports: PropTypes.arrayOf(PropTypes.shape({
    isOpen: PropTypes.bool,
    ID: PropTypes.number,
    tourneys: PropTypes.array,
    name: PropTypes.string,
  })).isRequired,
  oddType: PropTypes.string.isRequired,
  coefType: PropTypes.string.isRequired,
  changeOpenedSport: PropTypes.func.isRequired,
  changeOpenedTourney: PropTypes.func.isRequired,
  addToBasket: PropTypes.func.isRequired,
  locale: PropTypes.object,
  bets: PropTypes.array.isRequired,

  changeOpenedSportTourneys: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  lang: state.userSettings.lang,
  oddType: state.userSettings.oddType,
  coefType: state.userSettings.coefType,
  locale: state.locale.live,
  sports: state.live.sports,
  bets: state.basket.bets,
});

const mapDispatchToProps = dispatch => {
  const actions = {
    ...lineActions,
    addToBasket: basketActions.addToBasket,
  };
  return bindActionCreators(actions, dispatch);
};

const MemoLive = React.memo(Live);

export default connect(mapStateToProps, mapDispatchToProps)(MemoLive);
