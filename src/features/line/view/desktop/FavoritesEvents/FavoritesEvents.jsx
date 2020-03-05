import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions as basketActions } from 'features/basket';
import { actions as lineActions } from '../../../redux';

import Tourney from '../Tourney/Tourney';

import './FavoritesEvents.scss';

class FavoritesEvents extends React.Component {
  static propTypes = {
    loadFavoritesEvents: PropTypes.func.isRequired,
    favoritesList: PropTypes.arrayOf(PropTypes.shape({
      data: PropTypes.object,
      ID: PropTypes.number,
      isActive: PropTypes.bool,
      user: PropTypes.number,
    })).isRequired,
    favoritesTourneys: PropTypes.array,
    oddType: PropTypes.string.isRequired,
    bets: PropTypes.array.isRequired,
    locale: PropTypes.object.isRequired,
    addToBasket: PropTypes.func.isRequired,
    addFavoritEvent: PropTypes.func.isRequired,
    changeOpenedFavoritesTourney: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.loadFavoritesEvents();
  }

  componentDidUpdate(nextProps) {
    const { favoritesList, loadFavoritesEvents } = this.props;
    if (favoritesList.length !== nextProps.favoritesList.length) {
      loadFavoritesEvents();
    }
  }

  render() {
    const b = block('favorites-events');
    const { favoritesTourneys, favoritesList, addToBasket, bets, addFavoritEvent, locale, oddType } = this.props;
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
        changeVisibilityEvents={this.changeVisibilityEvents}
        addToBasket={addToBasket}
        selectedRates={selectedRates}
        favoritesList={favoritesList}
        addFavoritEvent={addFavoritEvent} />
    ));
    return (
      <section className={b()}>
        {favoritesTourneyList}
      </section>
    );
  }

  changeVisibilityEvents = tourneyID => {
    this.props.changeOpenedFavoritesTourney(tourneyID);
  }
}

const mapStateToProps = state => ({
  favoritesTourneys: state.line.favoritesTourneys,
  favoritesList: state.line.favoritesList,
  bets: state.basket.bets,
  oddType: state.userSettings.oddType,

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