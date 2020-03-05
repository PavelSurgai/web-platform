import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SVGInline from 'react-svg-inline';

import { actions as basketActions } from 'features/basket';
import { actions as lineActions } from 'features/line';
import { actions as sportMenuActions } from 'features/sportMenu';

import BackBlock from 'components/BackBlock/mobile';
import { getCountryById } from 'shared/utils/countries';
import Tourney from '../Tourney/Tourney';
import collapseSVG from '../../img/collapse.svg';
import './Line.scss';

class Line extends React.Component {
  state = {
    isOpenTourneys: false,
  }

  static propTypes = {
    sportID: PropTypes.number.isRequired,
    countryID: PropTypes.number.isRequired,
    filterTime: PropTypes.number.isRequired,
    loadLineTourneys: PropTypes.func.isRequired,
    loadEventsByTourney: PropTypes.func.isRequired,
    changeOpenedTourney: PropTypes.func.isRequired,
    clearData: PropTypes.func.isRequired,
    addToBasket: PropTypes.func.isRequired,
    changeOpenedAllLineTourneys: PropTypes.func.isRequired,
    addFavoritEvent: PropTypes.func.isRequired,
    getCountries: PropTypes.func.isRequired,
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
    countries: PropTypes.arrayOf(PropTypes.shape({
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
    const { sportID, countryID, loadLineTourneys, lang, filterTime, getCountries } = this.props;
    loadLineTourneys(sportID, countryID, lang, filterTime, true);
    getCountries(sportID, 0);
  }

  componentWillUnmount() {
    this.props.clearData();
  }

  componentWillUpdate(nextProps) {
    const { sportID, countryID, lang, filterTime } = nextProps;
    const { loadLineTourneys } = this.props;
    if (sportID !== this.props.sportID || countryID !== this.props.countryID || lang !== this.props.lang ||
      filterTime !== this.props.filterTime) {
      loadLineTourneys(sportID, countryID, lang, filterTime, true);
    }
  }

  render() {
    const b = block('line');
    const { sportID, countryID, tourneys, locale, addToBasket, bets, sports,
      countries, addFavoritEvent, favoritesList, oddType, changeOpenedAllLineTourneys } = this.props;
    const { isOpenTourneys } = this.state;
    const selectedRates = bets.map(tempBet => tempBet.ID);
    let sportName = '';
    const tourneysList = tourneys.map(temp => {
      sportName = sports.find(tempSport => tempSport.ID === temp.sportID) !== undefined ?
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
        <BackBlock>
          <div className={b('back-content')}>
            <div className={b('left-block')}>
              <SVGInline className={b('back-image').toString()} svg={getCountryById(countryID)} />
              {countries.find(t => t.ID === +countryID) ? countries.find(t => t.ID === +countryID).Name : ''}
            </div>
            <div className={b('collapse-block')} onClick={this.changeOpenedAllTourneys}>
              <SVGInline svg={collapseSVG} className={b('collapse', { active: !isOpenTourneys })} />
            </div>
          </div>
        </BackBlock>
        <div className={b()}>
          {tourneysList}
        </div>
      </React.Fragment>
    );
  }

  changeOpenedAllTourneys = () => {
    const { isOpenTourneys } = this.state;
    this.props.changeOpenedAllLineTourneys(isOpenTourneys);
    this.setState({ isOpenTourneys: !isOpenTourneys });
  }

  changeVisibilityEvents = tourneyID => {
    const { sportID, countryID, loadEventsByTourney, tourneys, lang, changeOpenedTourney, filterTime } = this.props;
    const tourney = tourneys.find(temp => temp.ID === tourneyID);
    if (tourney.events.length === 0) {
      loadEventsByTourney(sportID, countryID, tourneyID, lang, filterTime, true);
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
  countries: state.sportMenu.countries,
});

const mapDispatchToProps = dispatch => {
  const actions = {
    ...lineActions,
    addToBasket: basketActions.addToBasket,
    getCountries: sportMenuActions.getCountries,
  };
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Line);
