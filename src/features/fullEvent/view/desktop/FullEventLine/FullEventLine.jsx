import React, { Component } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions as basketActions } from 'features/basket';
import { actions as fullEventActions } from '../../../redux';

import Spinner from 'components/Spinner';
import FullEventHeader from '../FullEventHeader/FullEventHeader';
import FullEventSubHeaderLine from '../FullEventSubHeaderLine/FullEventSubHeaderLine';
import FullEventSettings from '../FullEventSettings/FullEventSettings';
import FullEventTable from '../FullEventTable/FullEventTable';
import './FullEventLine.scss';

class FullEventLine extends Component {
  state = {
    tempEventID: '',
    amountColumns: 2,
  }

  static propTypes = {
    loadFullEventLine: PropTypes.func.isRequired,
    changeVisibleAllGroups: PropTypes.func.isRequired,
    changeVisibleGroup: PropTypes.func.isRequired,
    addToBasket: PropTypes.func.isRequired,
    clearFullEvent: PropTypes.func.isRequired,
    bets: PropTypes.array.isRequired,

    fullEventProcessing: PropTypes.bool.isRequired,
    inLine: PropTypes.bool,
    
    events: PropTypes.object.isRequired,

    eventID: PropTypes.number.isRequired,

    oddType: PropTypes.string.isRequired,
    lang: PropTypes.string.isRequired,
  }

  componentDidMount() {
    const { eventID, loadFullEventLine, lang, inLine } = this.props;
    loadFullEventLine(eventID, lang, eventID);
    if (!inLine) this.onButtonUpClick();
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
    const tempProptsEvent = this.props.events[eventID] ? this.props.events[eventID] : {};
    const event = events[eventID] ? events[eventID] : {};
    if ((nextPropsEvent.coefGroups && !tempProptsEvent.coefGroups) || (event.ID !== nextPropsEvent.ID) || (event.teams !== nextPropsEvent.teams)) {
      this.setState({ tempEventID: nextPropsEvent.coefGroups[0].value });
    }
    if (!this.state.tempEventID && nextPropsEvent.coefGroups && nextPropsEvent.coefGroups[0].value) {
      this.setState({ tempEventID: nextPropsEvent.coefGroups[0].value });
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
    const b = block('full-event-line');
    const { events, fullEventProcessing, changeVisibleGroup, addToBasket, bets, oddType, eventID } = this.props;
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
            <FullEventSubHeaderLine
              teams={event.teams}
              date={event.date}
              countryID={event.countryID}
              sportID={event.sportID}
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
            <FullEventTable
              amountColumns={amountColumns}
              oddType={oddType}
              coefGroups={coefGroup || []}
              changeVisibleGroup={(groupID, visible) => this.onChangeGroupVisibility(groupID, visible, this.state.tempEventID)}
              addToBasket={addToBasket}
              selectedRates={selectedRates} />
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
    lang: state.userSettings.lang,
    oddType: state.userSettings.oddType,
    bets: state.basket.bets,
  };
};

const mapDispatchToProps = dispatch => {
  const actions = {
    ...fullEventActions,
    addToBasket: basketActions.addToBasket,
  };
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FullEventLine);