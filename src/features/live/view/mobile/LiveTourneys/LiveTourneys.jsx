import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions as basketActions } from 'features/basket';
import { actions as lineActions } from '../../../redux';

import { getSportImgByID } from 'shared/utils/sports';
import BackBlock from 'components/BackBlock/mobile';
import LiveTourney from '../LiveSport/LiveTourney';
import './LiveTourneys.scss';

const LiveTourneys = ({ match, sports, oddType, locale, bets, changeOpenedTourney, addToBasket, coefType }) => {
  const b = block('live-tourneys');
  const sportID = +match.params.sportID;
  const needSport = sports.find(t => t.ID === sportID);
  const selectedRates = bets.map(tempBet => tempBet.ID);
  const tourneyList = needSport !== undefined ? needSport.tourneys.map(tempTourney => (
    <LiveTourney
      key={tempTourney.ID}
      tourney={tempTourney}
      countryID={tempTourney.countryID}
      sportID={tempTourney.sportID}
      locale={locale}
      oddType={oddType}
      coefType={coefType}
      changeOpenedTourney={changeOpenedTourney}
      addToBasket={addToBasket}
      selectedRates={selectedRates} />
  )) : [];
  return (
    <React.Fragment>
      <BackBlock>
        <img src={getSportImgByID(sportID)} className={b('flag')} alt="" />
        <span className={b('tourney-name')}>{needSport !== undefined ? needSport.name : ''}</span>
      </BackBlock>
      <article className={b()}>
        {tourneyList}
      </article>
    </React.Fragment>
  );
};

LiveTourneys.propTypes = {
  sports: PropTypes.arrayOf(PropTypes.shape({
    isOpen: PropTypes.bool,
    ID: PropTypes.number,
    tourneys: PropTypes.array,
    name: PropTypes.string,
  })).isRequired,
  oddType: PropTypes.string.isRequired,
  coefType: PropTypes.string.isRequired,
  changeOpenedTourney: PropTypes.func.isRequired,
  addToBasket: PropTypes.func.isRequired,
  locale: PropTypes.object,
  bets: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  sports: state.live.sports,
  locale: state.locale.live,
  bets: state.basket.bets,
  oddType: state.userSettings.oddType,
  coefType: state.userSettings.coefType,
});

const mapDispatchToProps = dispatch => {
  const actions = {
    ...lineActions,
    addToBasket: basketActions.addToBasket,
  };
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(LiveTourneys);