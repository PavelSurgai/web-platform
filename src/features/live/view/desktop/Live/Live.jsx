import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import asyncPoll from 'react-async-poll';

import { actions as basketActions } from 'features/basket';
import { actions as lineActions } from '../../../redux';

import LiveSportMenu from '../LiveSportMenu';
import LiveSport from '../LiveSport';

import './Live.scss';

class Live extends React.Component {
  static propTypes = {
    loadLive: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
    sports: PropTypes.arrayOf(PropTypes.shape({
      isOpen: PropTypes.bool,
      ID: PropTypes.number,
      tourneys: PropTypes.array,
      name: PropTypes.string,
    })).isRequired,
    changeOpenedSport: PropTypes.func.isRequired,
    changeOpenedTourney: PropTypes.func.isRequired,
    addToBasket: PropTypes.func.isRequired,
    locale: PropTypes.object,
    bets: PropTypes.array.isRequired,
    activeSport: PropTypes.number.isRequired,

    changeActiveLiveSport: PropTypes.func.isRequired,
  }

  componentWillMount() {
    const { loadLive, lang } = this.props;
    loadLive(lang);
  }
  
  componentWillUpdate(nextProps) {
    const { lang } = nextProps;
    const { loadLive } = this.props;
    if (lang !== this.props.lang) {
      loadLive(lang);
    }
  }

  render() {
    const b = block('live');
    const { sports, locale, changeOpenedSport, changeOpenedTourney, addToBasket, bets, oddType,
      activeSport, changeActiveLiveSport } = this.props;
    const selectedRates = bets.map(tempBet => tempBet.ID);
    const sportMenuList = [{ ID: 0, name: locale.allSports }, ...sports.map(temp => ({ ID: temp.ID, name: temp.name }))];
    const sportList = activeSport === 0 ? sports.map(tempSport => (<LiveSport
      key={tempSport.ID}
      locale={locale}
      sport={tempSport}
      oddType={oddType}
      changeOpenedSport={changeOpenedSport}
      changeOpenedTourney={changeOpenedTourney}
      addToBasket={addToBasket}
      selectedRates={selectedRates} />)) :
      (<LiveSport
        key={sports.find(tempSport => tempSport.ID === activeSport).ID}
        locale={locale}
        sport={sports.find(tempSport => tempSport.ID === activeSport)}
        changeOpenedSport={changeOpenedSport}
        oddType={oddType}
        changeOpenedTourney={changeOpenedTourney}
        addToBasket={addToBasket}
        selectedRates={selectedRates} />);
    return (
      <article className={b()}>
        <div className={b('menu-container')}>
          <LiveSportMenu sportList={sportMenuList} activeID={activeSport} callBack={changeActiveLiveSport} />
        </div>
        <section className={b('content')}>
          {sportList}
        </section>
      </article>
    );
  }
}


const mapStateToProps = state => ({
  lang: state.userSettings.lang,
  oddType: state.userSettings.oddType,
  locale: state.locale.live,
  sports: state.live.sports,
  bets: state.basket.bets,
  activeSport: state.live.activeSport,
});

const mapDispatchToProps = dispatch => {
  const actions = {
    ...lineActions,
    addToBasket: basketActions.addToBasket,
  };
  return bindActionCreators(actions, dispatch);
};

function onCHPOCKInterval(props) {
  props.updateLive();
}

export default connect(mapStateToProps, mapDispatchToProps)(asyncPoll(3 * 1000, onCHPOCKInterval)(Live));