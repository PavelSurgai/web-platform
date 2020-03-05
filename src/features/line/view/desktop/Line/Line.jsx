import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions as basketActions } from 'features/basket';
import { actions as lineActions } from '../../../redux';

import Tourney from '../Tourney/Tourney';
import './Line.scss';

class Line extends React.Component {
  static propTypes = {
    sportID: PropTypes.number.isRequired,
    countryID: PropTypes.number.isRequired,
    loadLineTourneys: PropTypes.func.isRequired,
    loadEventsByTourney: PropTypes.func.isRequired,
    changeOpenedTourney: PropTypes.func.isRequired,
    addToBasket: PropTypes.func.isRequired,
    addFavoritEvent: PropTypes.func.isRequired,
    locale: PropTypes.object,
    tourneys: PropTypes.arrayOf(PropTypes.shape({
      isOpen: PropTypes.bool,
      ID: PropTypes.number,
      events: PropTypes.array,
      tourneyName: PropTypes.string,
    })).isRequired,
    sports: PropTypes.arrayOf(PropTypes.shape({
      ID: PropTypes.number,
      Name: PropTypes.string,
    })).isRequired,
    favoritesList: PropTypes.arrayOf(PropTypes.shape({
      data: PropTypes.object,
      ID: PropTypes.number,
      isActive: PropTypes.bool,
      user: PropTypes.number,
    })).isRequired,
    bets: PropTypes.array.isRequired,

    oddType: PropTypes.string.isRequired,
    lang: PropTypes.string.isRequired,
  }

  componentWillMount() {
    const { sportID, countryID, loadLineTourneys, lang } = this.props;
    loadLineTourneys(sportID, countryID, lang);
  }

  componentWillUpdate(nextProps) {
    const { sportID, countryID, lang } = nextProps;
    const { loadLineTourneys } = this.props;
    if (sportID !== this.props.sportID || countryID !== this.props.countryID || lang !== this.props.lang) {
      loadLineTourneys(sportID, countryID, lang);
    }
  }

  render() {
    const b = block('line');
    const { sportID, countryID, tourneys, locale, addToBasket, bets, sports, addFavoritEvent, favoritesList, oddType } = this.props;
    const selectedRates = bets.map(tempBet => tempBet.ID);
    const tourneysList = tourneys.map(temp => {
      const sportName = sports.find(tempSport => tempSport.ID === temp.sportID) !== undefined ?
        sports.find(tempSport => tempSport.ID === temp.sportID).Name : '';
      return (
        <Tourney
          key={temp.ID}
          tourney={temp}
          oddType={oddType}
          countryID={countryID}
          sportID={sportID}
          sportName={sportName}
          locale={locale}
          changeVisibilityEvents={this.changeVisibilityEvents}
          addToBasket={addToBasket}
          selectedRates={selectedRates}
          addFavoritEvent={addFavoritEvent}
          favoritesList={favoritesList} />
      );
    });
    return (
      <React.Fragment>
        <div className={b()}>
          {tourneysList}
        </div>
      </React.Fragment>
    );
  }

  changeVisibilityEvents = tourneyID => {
    const { sportID, countryID, loadEventsByTourney, tourneys, lang, changeOpenedTourney } = this.props;
    const tourney = tourneys.find(temp => temp.ID === tourneyID);
    if (tourney.events.length === 0) {
      loadEventsByTourney(sportID, countryID, tourneyID, lang);
    } else changeOpenedTourney(tourneyID);
  }
}

const mapStateToProps = state => ({
  lang: state.userSettings.lang,
  oddType: state.userSettings.oddType,
  locale: state.locale.line,
  tourneys: state.line.lineTourneys,
  bets: state.basket.bets,
  sports: state.sportMenu.sports,
  favoritesList: state.line.favoritesList,
});

const mapDispatchToProps = dispatch => {
  const actions = {
    ...lineActions,
    addToBasket: basketActions.addToBasket,
  };
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Line);