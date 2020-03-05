import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Spinner from 'components/Spinner';

import { actions as basketActions } from 'features/basket';
import { actions as lineActions } from '../../../redux';

import Tourney from '../Tourney/Tourney';

import './FavoritesEvents.scss';

const FavoritesEvents = props => {
  const {
    favoritesTourneys, favoritesList, addToBasket, bets,
    addFavoritEvent, locale, oddType, loadFavoritesEvents,
    changeOpenedFavoritesTourney, actionProcessing,
  } = props;
  
  useEffect(() => {
    loadFavoritesEvents();
  }, [favoritesList]);

  const changeVisibilityEvents = tourneyID => changeOpenedFavoritesTourney(tourneyID);

  const selectedRates = bets.map(tempBet => tempBet.ID);
  const favoritesTourneyList = favoritesTourneys.map(temp => (
    <Tourney
      key={temp.ID}
      tourney={temp}
      oddType={oddType}
      sportName={temp.sportName}
      countryID={temp.countryID}
      sportID={temp.sportID}
      locale={locale}
      changeVisibilityEvents={changeVisibilityEvents}
      addToBasket={addToBasket}
      selectedRates={selectedRates}
      favoritesList={favoritesList}
      addFavoritEvent={addFavoritEvent}
      isFavorites />
  ));
  const b = block('favorites-events');
  return (
    <section className={b()}>
      { actionProcessing ? <Spinner /> : null }
      {favoritesTourneyList}
    </section>
  );
};

FavoritesEvents.propTypes = {
  loadFavoritesEvents: PropTypes.func.isRequired,
  favoritesList: PropTypes.arrayOf(PropTypes.shape({
    data: PropTypes.object,
    ID: PropTypes.number,
    isActive: PropTypes.bool,
    user: PropTypes.number,
  })).isRequired,
  actionProcessing: PropTypes.bool.isRequired,
  favoritesTourneys: PropTypes.array,
  oddType: PropTypes.string.isRequired,
  bets: PropTypes.array.isRequired,
  locale: PropTypes.object.isRequired,
  addToBasket: PropTypes.func.isRequired,
  addFavoritEvent: PropTypes.func.isRequired,
  changeOpenedFavoritesTourney: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  favoritesTourneys: state.line.favoritesTourneys,
  favoritesList: state.line.favoritesList,
  bets: state.basket.bets,
  oddType: state.userSettings.oddType,
  actionProcessing: state.line.actionProcessing,

  locale: state.locale.line,
});

const mapDispatchToProps = dispatch => {
  const actions = {
    loadFavoritesEvents: lineActions.loadFavoritesEvents,
    addFavoritEvent: lineActions.addFavoritEvent,
    changeOpenedFavoritesTourney: lineActions.changeOpenedFavoritesTourney,
    addToBasket: basketActions.addToBasket,
  };
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesEvents);
