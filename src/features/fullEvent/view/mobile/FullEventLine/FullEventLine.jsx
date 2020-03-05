import React, { Component } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Spinner from 'components/Spinner';

import { actions as basketActions } from 'features/basket';
import { actions as fullEventActions } from '../../../redux';

import FullEventBackBlock from '../FullEventBackBlock';
import FullEventSubHeaderLine from '../FullEventSubHeaderLine/FullEventSubHeaderLine';
import FullEventSettings from '../FullEventSettings/FullEventSettings';
import FullEventTable from '../FullEventTable/FullEventTable';
import './FullEventLine.scss';

class FullEventLine extends Component {
  state = {
    tempEventID: `${this.props.eventID}`,
    groupsIsCollapsed: false,
  }

  static propTypes = {
    loadFullEventLine: PropTypes.func.isRequired,
    changeVisibleAllGroups: PropTypes.func.isRequired,
    changeVisibleGroup: PropTypes.func.isRequired,
    addToBasket: PropTypes.func.isRequired,
    clearAllFullEvents: PropTypes.func.isRequired,
    bets: PropTypes.array.isRequired,

    events: PropTypes.object.isRequired,

    eventID: PropTypes.number.isRequired,

    oddType: PropTypes.string.isRequired,
    lang: PropTypes.string.isRequired,

    locale: PropTypes.object.isRequired,

    fullEventProcessing: PropTypes.bool.isRequired,
  }

  componentDidMount() {
    const { eventID, loadFullEventLine, lang } = this.props;
    loadFullEventLine(eventID, lang, eventID);
  }

  componentWillUnmount = () => {
    this.props.clearAllFullEvents();
  }

  componentWillUpdate(nextProps) {
    const { lang } = nextProps;
    const { loadFullEventLine, eventID } = this.props;
    if (lang !== this.props.lang) {
      loadFullEventLine(eventID, lang, eventID);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { eventID, events } = this.props;
    const nextPropsEvent = nextProps.events[eventID] ? nextProps.events[eventID] : {};
    const event = events[eventID] ? events[eventID] : {};
    if ((nextPropsEvent.coefGroups) || (event.ID !== nextPropsEvent.ID) || (event.teams !== nextPropsEvent.teams)) {
      this.setState({ tempEventID: nextPropsEvent.coefGroups[0].value });
    }
  }

  onChangeTempEventID = ID => this.setState({ tempEventID: ID });

  onChangeGroupVisibility = (groupID, visible, tempGroup) => {
    const { eventID, changeVisibleGroup } = this.props;
    changeVisibleGroup(groupID, visible, tempGroup, eventID);
  }

  render() {
    const b = block('full-event-line');
    const { events, fullEventProcessing, addToBasket, bets, oddType, changeVisibleAllGroups, fullLocale,
      locale, eventID } = this.props;
    const { groupsIsCollapsed } = this.state;
    const event = events[eventID] ? events[eventID] : {};
    const selectedRates = bets.map(tempBet => tempBet.ID);
    const statisticList = event.coefGroups ?
      event.coefGroups.map(temp => ({ text: temp.text, value: temp.value })) : [];
    const coefGroup = (event.coefGroups && event.coefGroups.find(temp => temp.value === this.state.tempEventID)) ?
      event.coefGroups.find(temp => temp.value === this.state.tempEventID).betGroups : [];
    const mainCoefGroup = event.coefGroups && event.coefGroups[0] ? event.coefGroups[0].betGroups.find(temp => temp.ID === '30_20') : [];
    const { tempEventID } = this.state;
    return (
      <article className={b()}>
        {event.sportID ?
          (<React.Fragment>
            <FullEventBackBlock
              tourneyName={event.tourneyName}
              locale={locale}
              isCollapsed={groupsIsCollapsed}
              changeVisibleAllGroups={this.openAllGroups} />
            <FullEventSubHeaderLine
              teams={event.teams}
              date={event.date}
              countryID={event.countryID}
              sportID={event.sportID}
              tourneyName={event.tourneyName}
              sportName={event.sportName}
              teamIdFirst={event.teamIdFirst}
              teamIdSecond={event.teamIdSecond}
              teamNameFirst={event.firstTeamName}
              teamNameSecond={event.secondTeamName}
              mainCoefs={mainCoefGroup ? mainCoefGroup.coefs : []}
              selectedRates={selectedRates}
              addToBasket={addToBasket}
              oddType={oddType}
              locale={fullLocale}
            />
            <FullEventSettings
              tempEventID={tempEventID}
              statisticList={statisticList}
              changeTempEventID={this.onChangeTempEventID} />
            <FullEventTable
              amountColumns={1}
              oddType={oddType}
              coefGroups={coefGroup || []}
              changeVisibleGroup={(eventID, visible) => this.onChangeGroupVisibility(eventID, visible, this.state.tempEventID)}
              addToBasket={addToBasket}
              selectedRates={selectedRates} />
          </React.Fragment>) :
          <Spinner isLoading={fullEventProcessing} />}
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
  locale: state.locale.common,
  fullLocale: state.locale.fullEvent,
  fullEventProcessing: state.fullEvent.actionProcessing,
  lang: state.userSettings.lang,
  oddType: state.userSettings.oddType,
  bets: state.basket.bets,
});

const mapDispatchToProps = dispatch => {
  const actions = {
    ...fullEventActions,
    addToBasket: basketActions.addToBasket,
  };
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FullEventLine);
