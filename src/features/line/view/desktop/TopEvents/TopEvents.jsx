import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions as basketActions } from 'features/basket';
import { actions as lineActions } from '../../../redux';

import TourneySport from './TourneySport';
import './TopEvents.scss';

class TopEvents extends React.Component {
  static propTypes = {
    loadTopEvents: PropTypes.func.isRequired,
    changeOpenedTopTourney: PropTypes.func.isRequired,
    addToBasket: PropTypes.func.isRequired,
    addFavoritEvent: PropTypes.func.isRequired,
    changeOpenedSport: PropTypes.func.isRequired,
    locale: PropTypes.object,
    topTourneys: PropTypes.arrayOf(PropTypes.shape({
      isOpen: PropTypes.bool,
      ID: PropTypes.number,
      tourneys: PropTypes.array,
      name: PropTypes.string,
    })).isRequired,
    favoritesList: PropTypes.arrayOf(PropTypes.shape({
      data: PropTypes.object,
      ID: PropTypes.number,
      isActive: PropTypes.bool,
      user: PropTypes.number,
    })).isRequired,
    bets: PropTypes.array.isRequired,
    lang: PropTypes.string.isRequired,
    oddType: PropTypes.string.isRequired,
  }

  componentWillMount() {
    const { loadTopEvents } = this.props;
    loadTopEvents();
  }

  componentWillUpdate(nextProps) {
    const { lang } = nextProps;
    const { loadTopEvents } = this.props;
    if (lang !== this.props.lang) {
      loadTopEvents(lang);
    }
  }

  render() {
    const b = block('top-events');
    const { topTourneys, locale, changeOpenedSport, addToBasket, bets, favoritesList, addFavoritEvent, oddType } = this.props;
    const selectedRates = bets.map(tempBet => tempBet.ID);
    const sportList = topTourneys.map((tempSport, index) => (
      <TourneySport
        key={tempSport.ID + index}
        locale={locale}
        sport={tempSport}
        oddType={oddType}
        favoritesList={favoritesList}
        selectedRates={selectedRates}
        addFavoritEvent={addFavoritEvent}
        changeOpenedSport={changeOpenedSport}
        addToBasket={addToBasket}
        changeVisibilityEvents={this.changeVisibilityEvents}
      />
    ));
    return (
      <React.Fragment>
        <div className={b()}>
          {sportList}
        </div>
      </React.Fragment>
    );
  }

  changeVisibilityEvents = tourneyID => {
    const { changeOpenedTopTourney } = this.props;
    changeOpenedTopTourney(tourneyID);
  }
}

const mapStateToProps = state => {
  return {
    locale: state.locale.line,
    bets: state.basket.bets,
    sports: state.sportMenu.sports,
    topTourneys: state.line.topTourneys,
    lang: state.userSettings.lang,
    oddType: state.userSettings.oddType,
    favoritesList: state.line.favoritesList,
  };
};

const mapDispatchToProps = dispatch => {
  const actions = {
    ...lineActions,
    addToBasket: basketActions.addToBasket,
  };
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TopEvents);