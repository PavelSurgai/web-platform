import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { actions as sportMenuActions } from 'features/sportMenu';
import { actions as esportsActions } from 'features/cybersport';
import { actions as liveActions } from 'features/live';
import { getSportImgByID, getSportColorByID } from 'shared/utils/sports';
import { SportItem } from './SportItem';
import { GameItem } from './GameItem/GameItem';
import { LiveSportItem } from './LiveSportItem/LiveSportItem';

import BallPNG from '../img/ball.png';
import './SportMenu.scss';

class SportMenu extends React.Component {
  static propTypes = {
    sports: PropTypes.array.isRequired,
    countries: PropTypes.array.isRequired,
    locale: PropTypes.object.isRequired,
    collapsedID: PropTypes.number,
    sportsLoading: PropTypes.bool.isRequired,
    countriesLoading: PropTypes.bool.isRequired,
    lang: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    games: PropTypes.array.isRequired,
    liveSports: PropTypes.array.isRequired,
    activeGameID: PropTypes.number.isRequired,
    activeLiveSport: PropTypes.number.isRequired,

    getSports: PropTypes.func.isRequired,
    collapseSport: PropTypes.func.isRequired,
    changeActiveGameID: PropTypes.func.isRequired,
    changeActiveLiveSport: PropTypes.func.isRequired,

    sportMenuRef: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.props.getSports();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.lang !== this.props.lang) {
      this.props.getSports();
    }
  }

  render() {
    const b = block('sport-menu');
    const { sports, locale, collapsedID, collapseSport, location, liveSports,
      sportsLoading, countriesLoading, countries, games, activeGameID, changeActiveGameID,
      activeLiveSport, changeActiveLiveSport, sportMenuRef } = this.props;
    const isEsports = location.pathname.indexOf('/cybersport') === 0;
    const isLive = location.pathname.indexOf('/live') === 0;
    const isLiveFullEvent = location.pathname.indexOf('/full-event/live') === 0;
    
    let items = [];

    if (isLive || isLiveFullEvent) {
      items = liveSports.map(sport => {
        const img = getSportImgByID(sport.ID);
        const color = getSportColorByID(sport.ID);
        const amountEvents = [].concat(...[].concat(...sport.tourneys).map(t => t.events)).length;
        return (
          <LiveSportItem
            isActive={sport.ID === activeLiveSport}
            key={sport.ID}
            id={sport.ID}
            text={`${sport.name} (${amountEvents})`}
            locale={locale}
            img={img}
            color={color}
            changeActiveSport={changeActiveLiveSport}
          />
        );
      });
    } else if (isEsports) {
      items = games.map(game => <GameItem
        isActive={activeGameID === game.ID}
        key={game.ID}
        id={game.ID}
        name={game.name}
        changeActiveGameID={changeActiveGameID}
      />);
    } else {
      items = sports.map(sport => {
        const isCollapsed = sport.ID === collapsedID;
        const img = getSportImgByID(sport.ID);
        const color = getSportColorByID(sport.ID);
        return (
          <SportItem
            key={sport.ID}
            id={sport.ID}
            text={sport.Name}
            isCollapsed={isCollapsed}
            collapseSport={collapseSport}
            countriesLoading={countriesLoading}
            countries={countries}
            locale={locale}
            img={img}
            color={color}
          />
        );
      });
    }

    return (
      <nav className={b()} ref={sportMenuRef}>
        <div className={b('caption')}>
          <img
            className={b('ball', { esport: isEsports })}
            src={isEsports ? getSportImgByID(300) : BallPNG}
            alt={locale.sport} />
          <span className={b('title')}>{isEsports ? locale.cybersport : locale.sport}</span>
        </div>
        <ul className={b('sport-list')}>
          {!sportsLoading ? items : `${locale.loading}...`}
        </ul>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    sports: state.sportMenu.sports,
    locale: state.locale.line,
    lang: state.userSettings.lang,
    collapsedID: state.sportMenu.collapsedID,
    countriesLoading: state.sportMenu.countriesLoading,
    sportsLoading: state.sportMenu.sportsLoading,
    countries: state.sportMenu.countries,
    games: state.cybersport.games,
    activeGameID: state.cybersport.activeGameID,
    liveSports: state.live.sports,
    activeLiveSport: state.live.activeSport,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    getSports: sportMenuActions.getSports,
    collapseSport: sportMenuActions.collapseSport,
    changeActiveGameID: esportsActions.changeActiveGameID,
    changeActiveLiveSport: liveActions.changeActiveLiveSport,
  };
  return bindActionCreators(actions, dispatch);
}

const ConnectedSportMenu = connect(mapStateToProps, mapDispatchToProps)(withRouter(SportMenu));

export default React.forwardRef((props, ref) => <ConnectedSportMenu sportMenuRef={ref} {...props} />);