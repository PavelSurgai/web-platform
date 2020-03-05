import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions as basketActions } from 'features/basket';
import { actions as lineActions } from 'features/line';

import Tourney from '../Tourney/Tourney';
import './TopEvents.scss';

class TopEvents extends React.Component {
  static propTypes = {
    loadTopEvents: PropTypes.func.isRequired,
    changeOpenedTopTourney: PropTypes.func.isRequired,
    addToBasket: PropTypes.func.isRequired,
    addFavoritEvent: PropTypes.func.isRequired,
    locale: PropTypes.object,
    topTourneys: PropTypes.array.isRequired,
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
    const { topTourneys, locale, addToBasket, bets, favoritesList, addFavoritEvent, oddType } = this.props;
    const selectedRates = bets.map(tempBet => tempBet.ID);
    const tourneysList = topTourneys[0] ? topTourneys[0].tourneys.length && topTourneys[0].tourneys.map(temp => {
      return (
        <Tourney
          key={temp.ID}
          oddType={oddType}
          tourney={temp}
          events={temp.events}
          sportName={topTourneys[0].name}
          countryID={temp.events[0].countryID}
          sportID={temp.sportID}
          locale={locale}
          changeVisibilityEvents={this.changeVisibilityEvents}
          addToBasket={addToBasket}
          selectedRates={selectedRates}
          favoritesList={favoritesList}
          addFavoritEvent={addFavoritEvent} />
      );
    }) : [];
    return (
      <React.Fragment>
        <div className={b()}>
          {tourneysList.length > 0 && tourneysList}
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
    topTourneys: state.line.topTourneys,
    bets: state.basket.bets,
    sports: state.sportMenu.sports,
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