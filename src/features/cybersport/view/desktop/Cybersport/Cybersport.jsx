import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions as basketActions } from 'features/basket';
import { actions as lineActions } from 'features/line';
import { actions as cyberActions } from '../../../redux';

import CyberMenu from '../CyberMenu';
import CybersportSport from '../CybersportSport';
import './Cybersport.scss';
import './cyberStyle.scss';

class Cybersport extends React.Component {
  static propTypes = {
    loadCybersportGames: PropTypes.func.isRequired,
    loadEventsByTourney: PropTypes.func.isRequired,
    changeOpenedTourney: PropTypes.func.isRequired,
    changeOpenedSport: PropTypes.func.isRequired,
    addToBasket: PropTypes.func.isRequired,
    addFavoritEvent: PropTypes.func.isRequired,
    changeActiveGameID: PropTypes.func.isRequired,

    locale: PropTypes.object,
    games: PropTypes.arrayOf(PropTypes.shape({
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

    activeGameID: PropTypes.number.isRequired,
    oddType: PropTypes.string.isRequired,
    lang: PropTypes.string.isRequired,
  }

  componentWillUpdate(nextProps) {
    const { lang } = nextProps;
    const { loadCybersportGames } = this.props;
    if (lang !== this.props.lang) {
      loadCybersportGames();
    }
  }

  render() {
    const b = block('cybersport');
    const { games, locale, addToBasket, bets, addFavoritEvent, favoritesList, oddType, changeOpenedSport,
      activeGameID, changeActiveGameID } = this.props;
    const selectedRates = bets.map(tempBet => tempBet.ID);
    const gamesList = [{ ID: 0, name: locale.allSports }, ...games.map(temp => ({ ID: temp.ID, name: temp.name }))];
    const itemsGames = activeGameID === 0 ? games.map(tempGame => (<CybersportSport
      key={tempGame.ID}
      locale={locale}
      sport={tempGame}
      oddType={oddType}
      changeOpenedSport={changeOpenedSport}
      changeOpenedTourney={tourneyID => this.changeVisibilityEvents(tempGame.ID, tourneyID)}
      addToBasket={addToBasket}
      selectedRates={selectedRates}
      addFavoritEvent={addFavoritEvent}
      favoritesList={favoritesList} />)) :
      (<CybersportSport
        key={games.find(tempSport => tempSport.ID === activeGameID).ID}
        locale={locale}
        sport={games.find(tempSport => tempSport.ID === activeGameID)}
        changeOpenedSport={changeOpenedSport}
        oddType={oddType}
        changeOpenedTourney={tourneyID => this.changeVisibilityEvents(activeGameID, tourneyID)}
        addToBasket={addToBasket}
        selectedRates={selectedRates}
        addFavoritEvent={addFavoritEvent}
        favoritesList={favoritesList} />);
    return (
      <React.Fragment>
        <div className={b()}>
          <div className={b('menu-container')}>
            <CyberMenu sportList={gamesList} activeID={activeGameID} callBack={changeActiveGameID} />
          </div>
          {itemsGames}
        </div>
      </React.Fragment>
    );
  }

  changeVisibilityEvents = (gameID, tourneyID) => {
    const { loadEventsByTourney, games, changeOpenedTourney } = this.props;
    const needTourneys = games.find(t => t.ID === gameID).tourneys;
    const tourney = needTourneys.find(temp => temp.ID === tourneyID);
    if (tourney.events.length === 0) {
      loadEventsByTourney(300, gameID, tourneyID);
    } else changeOpenedTourney(tourneyID);
  }
}

const mapStateToProps = state => ({
  lang: state.userSettings.lang,
  oddType: state.userSettings.oddType,
  locale: state.locale.cybersport,
  games: state.cybersport.games,
  bets: state.basket.bets,
  sports: state.sportMenu.sports,
  favoritesList: state.line.favoritesList,
  activeGameID: state.cybersport.activeGameID,
});

const mapDispatchToProps = dispatch => {
  const actions = {
    ...cyberActions,
    addToBasket: basketActions.addToBasket,
    addFavoritEvent: lineActions.addFavoritEvent,
  };
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Cybersport);