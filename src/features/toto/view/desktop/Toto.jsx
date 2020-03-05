import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions as totoActions } from 'features/toto';

import Button from 'components/Button/desktop';
import Input from 'components/Input/desktop';
import TotoItem from './TotoItem';
import TotoTicket from './TotoTicket';

import './Toto.scss';

class Toto extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIDs: {},
      amount: 50,
      isOpenTickets: false,
    };
  }

  static propTypes = {
    totoList: PropTypes.object.isRequired,
    locale: PropTypes.object.isRequired,
    currency: PropTypes.string.isRequired,

    userTickets: PropTypes.array.isRequired,

    loadToto: PropTypes.func.isRequired,
    makeTotoBet: PropTypes.func.isRequired,
    loadTickets: PropTypes.func.isRequired,
    hideTotoTicket: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.loadToto();
    this.props.loadTickets();
  }

  onMakeBetClick = () => {
    const { selectedIDs, amount } = this.state;
    if (Object.keys(selectedIDs).length === 15 && amount > 0) this.props.makeTotoBet(selectedIDs, amount);
  }

  onChangeTab = bool => {
    this.setState({ isOpenTickets: bool });
  }

  render() {
    const { totoList, locale, currency, userTickets, hideTotoTicket } = this.props;
    const { isOpenTickets, selectedIDs } = this.state;

    const b = block('totalizator');
    const totoItems = totoList.eventList.map(
      (totoItem, index) =>
        <TotoItem
          key={index}
          item={totoItem}
          selectedRates={selectedIDs}
          callBack={this.setTotoChecked}
      />,
    );
    const ticketsItems = userTickets.map(
      (ticketItem, index) =>
        <TotoTicket
          key={ticketItem.ticketID}
          number={index}
          locale={locale}
          ticketItem={ticketItem}
          hideTotoTicket={hideTotoTicket}
        />,
    );
    return (
      <div className={b().toString()}>
        <div className={b('header').toString()}>
          <div className={b('left-block').toString()}>
            <div className={b('tab', { active: !isOpenTickets })} onClick={() => this.onChangeTab(false)}>{totoList.name}</div>
            <div className={b('tab', { active: isOpenTickets })} onClick={() => this.onChangeTab(true)}>{locale.tickets}</div>
          </div>
          <div className={b('right-block').toString()}>
            <div className={b('outcome').toString()}>1</div>
            <div className={b('outcome').toString()}>X</div>
            <div className={b('outcome').toString()}>2</div>
          </div>
        </div>
        <div className={b('container')}>
          {isOpenTickets ? ticketsItems : totoItems}
        </div>
        <div className={b('info-block')}>
          <div className={b('sum')}>
            {`${locale.sum}:`}
            <div className={b('input')}>
              <Input
                value={this.state.amount}
                name="amount"
                callBack={e => this.setState({ amount: e.currentTarget.value })} />
              <div className={b('currency')}>{currency}</div>
            </div>
          </div>
          <div className={b('button')}>
            <Button
              text={locale.makeBet}
              color="green"
              callBack={this.onMakeBetClick} />
          </div>
        </div>
      </div>
    );
  }

  setTotoChecked = (ID, value) => {
    this.setState(prevState => ({ selectedIDs: { ...prevState.selectedIDs, [ID]: value } }));
  };
}

function mapStateToProps(state) {
  return {
    locale: state.locale.toto,
    totoList: state.toto.totoList,
    userTickets: state.toto.userTickets,
    currency: state.auth.user.currency,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    loadToto: totoActions.loadToto,
    makeTotoBet: totoActions.makeTotoBet,
    loadTickets: totoActions.loadTickets,
    hideTotoTicket: totoActions.hideTotoTicket,
  };
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Toto);