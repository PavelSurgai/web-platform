import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import asyncPoll from 'react-async-poll';

import { actions as basketActions } from 'features/basket';
import { actions as liveActions } from 'features/live';

import { FullEventForMulti } from 'features/fullEvent/desktop';
import LiveSportMenu from '../LiveSportMenu';
import MultiLiveTourneysMenu from './MultiLiveTourneysMenu';


import './MultiLive.scss';

class MultiLive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSportID: 0,
    };
  }

  static propTypes = {
    loadLive: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
    sports: PropTypes.arrayOf(PropTypes.shape({
      isOpen: PropTypes.bool,
      ID: PropTypes.number,
      tourneys: PropTypes.array,
      name: PropTypes.string,
    })).isRequired,
    multiLiveEvents: PropTypes.array.isRequired,
    changeVisibleAllGroups: PropTypes.func.isRequired,
    changeVisibleGroup: PropTypes.func.isRequired,
    addToBasket: PropTypes.func.isRequired,
    addToMultiLive: PropTypes.func.isRequired,
    removeEvent: PropTypes.func.isRequired,
    locale: PropTypes.object,
    bets: PropTypes.array.isRequired,
    oddType: PropTypes.object.isRequired,
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
    const b = block('multi-live');
    const { sports, locale, addToBasket, bets, addToMultiLive, multiLiveEvents, changeVisibleAllGroups,
      changeVisibleGroup, removeEvent, oddType } = this.props;
    const { activeSportID } = this.state;
    const sportMenuList = [{ ID: 0, name: locale.allSports }, ...sports.map(temp => ({ ID: temp.ID, name: temp.name }))];
    const tourneysList = activeSportID === 0 ? sports.map(tempSport => tempSport.tourneys[0]) : sports.find(tempSport => tempSport.ID === activeSportID).tourneys;
    const eventFirstColumn = multiLiveEvents.filter((temp, index) => index % 2 === 0).map(temp => <div className={b('event')}>
      <FullEventForMulti
        key={temp.ID}
        oddType={oddType}
        changeVisibleAllGroups={params => changeVisibleAllGroups(params, temp.ID)}
        event={temp}
        changeVisibleGroup={(groupID, visible, tempGroup) => changeVisibleGroup(groupID, visible, tempGroup, temp.ID)}
        addToBasket={addToBasket}
        bets={bets}
        removeEvent={() => removeEvent(temp.ID)} />
    </div>);
    const eventSecondColumn = multiLiveEvents.filter((temp, index) => index % 2 === 1).map(temp => <div className={b('event')}>
      <FullEventForMulti
        key={temp.ID}
        oddType={oddType}
        changeVisibleAllGroups={params => changeVisibleAllGroups(params, temp.ID)}
        event={temp}
        changeVisibleGroup={(groupID, visible, tempGroup) => changeVisibleGroup(groupID, visible, tempGroup, temp.ID)}
        addToBasket={addToBasket}
        bets={bets}
        removeEvent={() => removeEvent(temp.ID)}
        />
        
    </div>);
    return (
      <article className={b()}>
        <div className={b('menu-container')}>
          <LiveSportMenu sportList={sportMenuList} activeID={activeSportID} callBack={this.changeActiveSport} />
          <MultiLiveTourneysMenu tourneysList={tourneysList} callBack={addToMultiLive} activeSportID={activeSportID} />
        </div>
        <section className={b('content')}>
          <div className={b('column')}>{eventFirstColumn}</div>
          <div className={b('column')}>{eventSecondColumn}</div>
        </section>
      </article>
    );
  }

  changeActiveSport = ID => this.setState({ activeSportID: ID });
}


const mapStateToProps = state => ({
  oddType: state.userSettings.oddType,
  lang: state.userSettings.lang,
  locale: state.locale.live,
  sports: state.live.sports,
  bets: state.basket.bets,
  multiLiveEvents: state.live.multiLiveEvents,
});

const mapDispatchToProps = dispatch => {
  const actions = {
    ...liveActions,
    addToBasket: basketActions.addToBasket,
  };
  return bindActionCreators(actions, dispatch);
};

function onCHPOCKInterval(props) {
  props.updateMultiLive();
}

export default connect(mapStateToProps, mapDispatchToProps)(asyncPoll(3 * 1000, onCHPOCKInterval)(MultiLive));