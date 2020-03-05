import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions as basketActions } from 'features/basket';
import { actions as lineActions } from '../../../redux';

import UpcomingMenu from './UpcomingMenu';
import upcomingMenuItems from '../../../data/upcomingMenuItems';
import Tourney from '../Tourney/Tourney';

import './UpcomingEvents.scss';

class UpcomingEvents extends React.Component {
  state = {
    activeTime: upcomingMenuItems[0],
  }

  static propTypes = {
    sportID: PropTypes.number.isRequired,
    countryID: PropTypes.number.isRequired,
    loadUpcomingTourneys: PropTypes.func.isRequired,
    loadUpcomingEventsByTourney: PropTypes.func.isRequired,
    changeOpenedUpcomingTourney: PropTypes.func.isRequired,
    clearUpcomingEvents: PropTypes.func.isRequired,
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
    oddType: PropTypes.object.isRequired,

    lang: PropTypes.string.isRequired,
  }

  componentWillMount() {
    const { sportID, countryID, loadUpcomingTourneys } = this.props;
    const { activeTime } = this.state;
    loadUpcomingTourneys(sportID, countryID, activeTime.ID);
  }

  componentWillUnmount() {
    this.props.clearUpcomingEvents();
  }

  componentWillUpdate(nextProps, nextState) {
    const { sportID, countryID, lang } = nextProps;
    const { loadUpcomingTourneys } = this.props;
    const { activeTime } = nextState;
    if (sportID !== this.props.sportID || countryID !== this.props.countryID || lang !== this.props.lang || activeTime !== this.state.activeTime) {
      loadUpcomingTourneys(sportID, countryID, activeTime.ID);
    }
  }

  onChangeActiveTime = timeID => this.setState({
    activeTime: upcomingMenuItems.find(temp => temp.ID === timeID),
  })

  render() {
    const b = block('upcoming-event');
    const { locale, sportID, countryID, tourneys, addToBasket, bets, sports, addFavoritEvent, favoritesList, oddType } = this.props;
    const { activeTime } = this.state;
    const selectedRates = bets.map(tempBet => tempBet.ID);
    const tourneysList = tourneys.map(temp => {
      const sportName = sports.find(tempSport => tempSport.ID === temp.sportID) !== undefined ?
        sports.find(tempSport => tempSport.ID === temp.sportID).Name : '';
      return (
        <Tourney
          key={temp.ID}
          tourney={temp}
          countryID={countryID}
          sportID={sportID}
          sportName={sportName}
          locale={locale}
          activeTime={activeTime}
          changeVisibilityEvents={this.changeVisibilityEvents}
          addToBasket={addToBasket}
          selectedRates={selectedRates}
          addFavoritEvent={addFavoritEvent}
          favoritesList={favoritesList}
          oddType={oddType} />
      );
    });
    return (
      <div className={b()}>
        <UpcomingMenu
          timeList={upcomingMenuItems}
          activeTime={activeTime}
          callBack={this.onChangeActiveTime}
          locale={locale} />
        {tourneysList}
      </div>
    );
  }

  changeVisibilityEvents = tourneyID => {
    const { sportID, countryID, loadUpcomingEventsByTourney, tourneys, lang, changeOpenedUpcomingTourney } = this.props;
    const { activeTime } = this.state;
    const tourney = tourneys.find(temp => temp.ID === tourneyID);
    if (tourney.events.length === 0) {
      loadUpcomingEventsByTourney(sportID, countryID, tourneyID, lang, activeTime.ID);
    } else changeOpenedUpcomingTourney(tourneyID);
  }
}

const mapStateToProps = state => {
  return {
    locale: state.locale.line,
    lang: state.userSettings.lang,
    tourneys: state.line.upcomingTourneys,
    bets: state.basket.bets,
    sports: state.sportMenu.sports,
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

export default connect(mapStateToProps, mapDispatchToProps)(UpcomingEvents);