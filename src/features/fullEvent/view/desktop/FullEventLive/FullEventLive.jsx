import React, { Component } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import asyncPoll from 'react-async-poll';

import Spinner from 'components/Spinner';

import { actions as basketActions } from 'features/basket';
import { actions as liveActions } from 'features/live';
import { actions as lineActions } from '../../../redux';

import FullEventHeader from '../FullEventHeader/FullEventHeader';
import FullEventSubHeaderLive from '../FullEventSubHeaderLive/FullEventSubHeaderLive';
import FullEventSettings from '../FullEventSettings/FullEventSettings';
import FullEventTable from '../FullEventTable/FullEventTable';
import './FullEventLive.scss';

class FullEventLive extends Component {
  state = {
    tempEventID: `${this.props.eventID}`,
    amountColumns: 2,
  }

  static propTypes = {
    loadFullEventLive: PropTypes.func.isRequired,
    changeVisibleAllGroups: PropTypes.func.isRequired,
    changeVisibleGroup: PropTypes.func.isRequired,
    addToBasket: PropTypes.func.isRequired,
    clearFullEvent: PropTypes.func.isRequired,
    loadLive: PropTypes.func.isRequired,
    bets: PropTypes.array.isRequired,
    locale: PropTypes.object.isRequired,

    events: PropTypes.object.isRequired,
    inLine: PropTypes.bool,

    eventID: PropTypes.number.isRequired,
    
    oddType: PropTypes.string.isRequired,
    lang: PropTypes.string.isRequired,

    fullEventProcessing: PropTypes.bool.isRequired,
  }

  componentDidMount() {
    const { eventID, loadFullEventLive, lang, inLine, loadLive } = this.props;
    loadFullEventLive(eventID, lang, eventID);
    loadLive();
    if (!inLine) this.onButtonUpClick();
  }

  componentWillUnmount = () => this.props.clearFullEvent(this.props.eventID);

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
      this.setState({ tempEventID: nextPropsEvent.coefGroups[0] !== undefined ? nextPropsEvent.coefGroups[0].value : -1 });
    }
  }

  onButtonUpClick = () => {
    const app = document.getElementsByClassName('app')[0];
    if (app.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      app.scrollBy(0, -30);
      setTimeout(this.onButtonUpClick, 5);
    }
  };

  onChangeAmountColumns = value => this.setState({ amountColumns: value });

  onChangeTempEventID = ID => this.setState({ tempEventID: ID });

  onChangeGroupVisibility = (groupID, visible, tempGroup) => {
    const { eventID, changeVisibleGroup } = this.props;
    changeVisibleGroup(groupID, visible, tempGroup, eventID);
  }

  render() {
    const b = block('full-event-live');
    const { events, fullEventProcessing, changeVisibleGroup, addToBasket, bets, oddType, locale, eventID } = this.props;
    const event = events[eventID] ? events[eventID] : {};
    const selectedRates = bets.map(tempBet => tempBet.ID);
    const statisticList = event.coefGroups ?
      event.coefGroups.map(temp => ({ text: temp.text, value: temp.value })) : [];
    const coefGroup = (event.coefGroups && event.coefGroups.find(temp => temp.value === this.state.tempEventID)) ?
      event.coefGroups.find(temp => temp.value === this.state.tempEventID).betGroups : [];
    const { tempEventID, amountColumns } = this.state;
    const allCoefsGroupIsOpen = Object.values(events)
      .every(ev => ev.coefGroups.every(group => group.betGroups.every(coef => coef.isOpen)));
    return (
      <article className={b()}>
        {event.sportID ?
          (<React.Fragment>
            <FullEventHeader
              countryID={event.countryID}
              sportID={event.sportID}
              tourneyName={event.tourneyName}
              sportName={event.sportName} />
            <FullEventSubHeaderLive
              teams={event.teams}
              date={event.date}
              comment={event.comment}
              sportID={event.sportID}
              countryID={event.countryID}
              score={event.score}
              timesScore={event.timesScore}
              time={event.time}
              locale={locale.serve}
              serve={event.serve}
              teamIdFirst={event.teamIdFirst}
              teamIdSecond={event.teamIdSecond}
              />
            <FullEventSettings
              amountColumns={amountColumns}
              tempEventID={tempEventID}
              statisticList={statisticList}
              changeAmountColumns={this.onChangeAmountColumns}
              changeTempEventID={this.onChangeTempEventID}
              openAllGroups={this.openAllGroups}
              allCoefsGroupIsOpen={allCoefsGroupIsOpen} />
            {coefGroup.length !== 0 && <FullEventTable
              amountColumns={amountColumns}
              oddType={oddType}
              coefGroups={coefGroup || []}
              changeVisibleGroup={(eventID, visible) => this.onChangeGroupVisibility(eventID, visible, this.state.tempEventID)}
              addToBasket={addToBasket}
              selectedRates={selectedRates} />}
            {tempEventID === -1 && <div className={b('empty')}>
              {locale.emptyFullEvent}
            </div>}
          </React.Fragment>) :
          <div className={b('loading')}>
            <Spinner isLoading={fullEventProcessing} />
          </div>}
      </article>
    );
  }

  openAllGroups = () => {
    const { changeVisibleAllGroups, events, eventID } = this.props;
    const { tempEventID } = this.state;
    const event = events[eventID] ? events[eventID] : {};
    const { coefGroups } = event;
    const activeGroup = coefGroups.find(temp => temp.value === tempEventID);
    changeVisibleAllGroups(activeGroup.betGroups.find(temp => temp.isOpen === false) !== undefined, eventID);
  }
}

const mapStateToProps = state => {
  return {
    events: state.fullEvent.events,
    fullEventProcessing: state.fullEvent.actionProcessing,
    statisticList: state.fullEvent.statisticList,
    lang: state.userSettings.lang,
    oddType: state.userSettings.oddType,
    bets: state.basket.bets,
    serve: state.fullEvent.serve,
    locale: state.locale.common,
  };
};

const mapDispatchToProps = dispatch => {
  const actions = {
    ...lineActions,
    loadLive: liveActions.loadLive,
    addToBasket: basketActions.addToBasket,
  };
  return bindActionCreators(actions, dispatch);
};

function pollingFullEvent(props) {
  const { eventID, events, lang, fullEventProcessing } = props;
  if (eventID && events[eventID] && fullEventProcessing && props.lang) props.updateLiveEvent(props.eventID, props.lang);
}

export default connect(mapStateToProps, mapDispatchToProps)(asyncPoll(5000, pollingFullEvent)(FullEventLive));
