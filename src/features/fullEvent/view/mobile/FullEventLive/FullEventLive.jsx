import React, { Component } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import asyncPoll from 'react-async-poll';

import Spinner from 'components/Spinner';

import { actions as basketActions } from 'features/basket';
import { actions as lineActions } from '../../../redux';

import FullEventBackBlock from '../FullEventBackBlock';
import FullEventEmpty from '../FullEventEmpty';
import FullEventSubHeaderLive from '../FullEventSubHeaderLive/FullEventSubHeaderLive';
import FullEventSettings from '../FullEventSettings/FullEventSettings';
import FullEventTable from '../FullEventTable/FullEventTable';
import MapAttack from './MapAttack';

import './FullEventLive.scss';

class FullEventLive extends Component {
  state = {
    tempEventID: `${this.props.eventID}`,
    isStatisticOpen: false,
    groupsIsCollapsed: false,
    isOpenMapAttack: false,
  }

  static propTypes = {
    loadFullEventLive: PropTypes.func.isRequired,
    changeVisibleAllGroups: PropTypes.func.isRequired,
    changeVisibleGroup: PropTypes.func.isRequired,
    addToBasket: PropTypes.func.isRequired,
    clearAllFullEvents: PropTypes.func.isRequired,
    bets: PropTypes.array.isRequired,
    locale: PropTypes.object.isRequired,
    localeFullEvent: PropTypes.object.isRequired,

    events: PropTypes.object.isRequired,

    eventID: PropTypes.number.isRequired,

    oddType: PropTypes.string.isRequired,
    lang: PropTypes.string.isRequired,

    fullEventProcessing: PropTypes.bool.isRequired,
  }

  componentDidMount() {
    const { eventID, loadFullEventLive, lang } = this.props;
    loadFullEventLive(eventID, lang, eventID);
  }

  componentWillUnmount = () => this.props.clearAllFullEvents();

  componentWillUpdate(nextProps) {
    const { lang } = nextProps;
    const { loadFullEventLive, eventID } = this.props;
    if (lang !== this.props.lang) {
      loadFullEventLive(eventID, lang, eventID);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { eventID, events } = this.props;
    const nextPropsEvent = nextProps.events[eventID] ? nextProps.events[eventID] : {};
    const event = events[eventID] ? events[eventID] : {};
    if ((nextPropsEvent.coefGroups && !event.coefGroups) || (event.ID !== nextPropsEvent.ID) || (event.teams !== nextPropsEvent.teams)) {
      this.setState({ tempEventID: nextPropsEvent.coefGroups[0] ? nextPropsEvent.coefGroups[0].value : -1 });
    }
  }

  onChangeGroupVisibility = (groupID, visible, tempGroup) => {
    const { eventID, changeVisibleGroup } = this.props;
    changeVisibleGroup(groupID, visible, tempGroup, eventID);
  }

  onChangeVisibleMapAttack = () => {
    const { events, eventID } = this.props;
    const { isOpenMapAttack } = this.state;
    const event = events[eventID] ? events[eventID] : {};
    if (event.mapId) this.setState({ isOpenMapAttack: !isOpenMapAttack });
  }


  onSwitchStatisticVisibility = () => {
    const { isStatisticOpen } = this.state;
    this.setState({ isStatisticOpen: !isStatisticOpen });
  }

  onChangeTempEventID = ID => this.setState({ tempEventID: ID });

  render() {
    const b = block('full-event-live');
    const { events, eventID, fullEventProcessing, changeVisibleGroup, addToBasket,
      bets, oddType, changeVisibleAllGroups, locale, localeFullEvent } = this.props;
    const { groupsIsCollapsed, isOpenMapAttack } = this.state;
    const event = events[eventID] ? events[eventID] : {};
    const selectedRates = bets.map(tempBet => tempBet.ID);
    const statisticList = event.coefGroups ?
      event.coefGroups.map(temp => ({ text: temp.text, value: temp.value })) : [];
    const coefGroup = (event.coefGroups && event.coefGroups.find(temp => temp.value === this.state.tempEventID)) ?
      event.coefGroups.find(temp => temp.value === this.state.tempEventID).betGroups : [];
    const { tempEventID, isStatisticOpen } = this.state;
    const mainCoefGroup = event.coefGroups && event.coefGroups[0] ? event.coefGroups[0].betGroups.find(temp => temp.ID === '30_20') : [];
    return (
      <article className={b()}>
        {!fullEventProcessing && statisticList.length === 0 && <FullEventEmpty locale={locale} />}
        {event.sportID && tempEventID !== -1 ?
          (<React.Fragment>
            <FullEventBackBlock
              tourneyName={event.tourneyName}
              changeVisibleAllGroups={this.openAllGroups}
              isLive
              isStatisticOpen={isStatisticOpen}
              isCollapsed={groupsIsCollapsed}
              changeVisibleMapAttack={this.onChangeVisibleMapAttack}
              isOpenMapAttack={isOpenMapAttack}
              mapId={event.mapId}
              mapSportId={event.mapSportId}
              onSwitchStatisticVisibility={this.onSwitchStatisticVisibility}
              locale={locale} />
            {isOpenMapAttack && <MapAttack mapId={event.mapId} isOpenMapAttack={isOpenMapAttack} mapSportId={event.mapSportId} />}
            <FullEventSubHeaderLive
              teams={event.teams}
              date={event.date}
              sportID={event.sportID}
              tourneyName={event.tourneyName}
              sportName={event.sportName}
              score={event.score}
              timesScore={event.timesScore}
              time={event.time}
              serve={event.serve}
              locale={locale}
              comment={event.comment}
              countryID={event.countryID}
              teamIdFirst={event.teamIdFirst}
              teamIdSecond={event.teamIdSecond}
              teamNameFirst={event.firstTeamName}
              teamNameSecond={event.secondTeamName}
              mainCoefs={mainCoefGroup ? mainCoefGroup.coefs : []}
              selectedRates={selectedRates}
              addToBasket={addToBasket}
              oddType={oddType}
              statistic={event.statistic}
              isStatisticOpen={isStatisticOpen}
            />
            <FullEventSettings
              tempEventID={tempEventID}
              statisticList={statisticList}
              changeTempEventID={this.onChangeTempEventID} />
            {coefGroup.length !== 0 && <FullEventTable
              amountColumns={1}
              oddType={oddType}
              coefGroups={coefGroup || []}
              changeVisibleGroup={(eventID, visible) => this.onChangeGroupVisibility(eventID, visible, this.state.tempEventID)}
              addToBasket={addToBasket}
              selectedRates={selectedRates} />}
          </React.Fragment>) :
          statisticList.length !== 0 && <Spinner isLoading={fullEventProcessing} />}
      </article>
    );
  }

  openAllGroups = () => {
    const { changeVisibleAllGroups, events, eventID } = this.props;
    const { tempEventID } = this.state;
    const event = events[eventID] ? events[eventID] : {};
    const { coefGroups } = event;
    const activeGroup = coefGroups.find(temp => temp.value === tempEventID);
    const isOpen = activeGroup.betGroups.find(temp => temp.isOpen === false) !== undefined;
    changeVisibleAllGroups(isOpen, eventID);
    this.setState({ groupsIsCollapsed: !isOpen });
  }
}

const mapStateToProps = state => ({
  events: state.fullEvent.events,
  fullEventProcessing: state.fullEvent.actionProcessing,
  statisticList: state.fullEvent.statisticList,
  lang: state.userSettings.lang,
  oddType: state.userSettings.oddType,
  bets: state.basket.bets,
  locale: state.locale.common,
  localeFullEvent: state.locale.fullEvent,
});

const mapDispatchToProps = dispatch => {
  const actions = {
    ...lineActions,
    addToBasket: basketActions.addToBasket,
  };
  return bindActionCreators(actions, dispatch);
};

function pollingFullEvent(props) {
  const { eventID, events, lang, fullEventProcessing } = props;
  if (eventID && events[eventID] && !fullEventProcessing && props.lang) props.updateLiveEvent(props.eventID, props.lang);
}

export default connect(mapStateToProps, mapDispatchToProps)(asyncPoll(5000, pollingFullEvent)(FullEventLive));
