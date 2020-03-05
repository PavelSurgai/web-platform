import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import asyncPoll from 'react-async-poll';
import Spinner from 'components/Spinner/mobile';

import { actions as basketActions } from 'features/basket';
import { actions as liveActions } from 'features/live';

import { FullEventForMulti } from 'features/fullEvent/mobile';
import LiveSportMenu from '../LiveSportMenu';
import MultiLiveTourneysMenu from './MultiLiveTourneysMenu';


import './MultiLive.scss';

let elementsLength = 0;

const initListener = (container, wrapper) => {
  let touchStart = 0;
  let touchEnd = 0;
  let lastTouch = 0;
  let currentItem = 0;
  let touchStartY = 0;
  let touchEndY = 0;
  const frames = 20;
  const width = container.clientWidth;
  const scrollingFunc = x => {
    const count = Math.round(width * elementsLength / frames);
    const scrollBy = (width * (x / Math.abs(x))) - lastTouch;
    const direction = scrollBy > 0 ? 1 : -1;
    let currentScroll = 0;
    currentItem += direction;
    currentItem = currentItem > elementsLength - 1 ? elementsLength - 1 : currentItem;
    currentItem = currentItem < 1 ? 0 : currentItem;
    const iterator = () => {
      currentScroll += count;
      if (currentScroll <= Math.abs(scrollBy) - frames) {
        container.scrollBy(count * direction, 0);
        setTimeout(iterator, 20);
      } else {
        container.scrollTo(currentItem * width, 0);
      }
    };
    iterator();
  };
  container.addEventListener('touchstart', e => {
    touchStart = e.changedTouches[0].clientX;
    touchStartY = e.changedTouches[0].clientY;
  });
  container.addEventListener('touchmove', e => {
    // let changedTouch = touchStart - e.changedTouches[0].clientX;
    // if (Math.abs(changedTouch) > 50) {
    //   // container.scrollBy(changedTouch - lastTouch, 0);
    //   // lastTouch = changedTouch;
    // } else {
    //   container.scrollTo(currentItem * width, 0);
    // }
  });
  container.addEventListener('touchend', e => {
    touchEnd = e.changedTouches[0].clientX;
    touchEndY = e.changedTouches[0].clientY;
    const touch = touchStart - touchEnd;
    const touchY = touchStartY - touchEndY;
    if (Math.abs(touch) > 5 && Math.abs(touchY) < 60) {
      scrollingFunc(touch);
      lastTouch = 0;
    } else {
      container.scrollTo(currentItem * width, 0);
      lastTouch = 0;
    }
  });
};

class MultiLive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSportID: 0,
      isScrolling: false,
    };

    this.containerRef = React.createRef();
    this.wrapperRef = React.createRef();
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
    oddType: PropTypes.string.isRequired,
  }

  componentDidMount() {
    initListener(this.containerRef.current);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.multiLiveEvents.length !== this.props.multiLiveEvents.length) elementsLength = this.props.multiLiveEvents.length;
  }

  componentWillMount() {
    const { loadLive, lang } = this.props;
    loadLive(lang);
  }
  
  componentWillUpdate(nextProps) {
    const { lang, multiLiveEvents } = nextProps;
    const { loadLive } = this.props;
    if (lang !== this.props.lang) {
      loadLive(lang);
    }
  }

  render() {
    const b = block('multi-live');
    const { sports, locale, addToBasket, bets, addToMultiLive, multiLiveEvents, changeVisibleAllGroups,
      changeVisibleGroup, removeEvent, oddType, actionProcessing } = this.props;
    const { activeSportID, isScrolling } = this.state;
    const sportMenuList = [{ ID: 0, name: locale.allSports }, ...sports.map(temp => ({ ID: temp.ID, name: temp.name }))];
    const tourneysList = activeSportID === 0 ? sports.map(tempSport => tempSport.tourneys[0]) : sports.find(tempSport => tempSport.ID === activeSportID).tourneys;
    const activeEventsID = multiLiveEvents.map(t => t.ID);
    const events = multiLiveEvents.map(temp => <div className={b('event')}>
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
    return (
      <article className={b()}>
        <div className={b('menu-container')}>
          <LiveSportMenu sportList={sportMenuList} activeID={activeSportID} callBack={this.changeActiveSport} />
          <MultiLiveTourneysMenu tourneysList={tourneysList} callBack={addToMultiLive} activeSportID={activeSportID} ref={this.wrapperRef} activeEventsID={activeEventsID} />
        </div>
        <div className={b('content')} ref={this.containerRef}>
          <Spinner isLoading={actionProcessing} />
          <div className={b('wrapper')} ref={this.wrapperRef}>{events}</div>
        </div>
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
  actionProcessing: state.live.actionProcessing,
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