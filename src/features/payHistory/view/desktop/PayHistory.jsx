import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Spinner from 'components/Spinner';
import { actions as payHistoryActions } from '../../redux';
import './PayHistory.scss';

export class PayHistory extends React.Component {
  static propTypes = {
    locale: PropTypes.object.isRequired,
    history: PropTypes.array.isRequired,
    currency: PropTypes.string.isRequired,
    actionProcessing: PropTypes.bool.isRequired,
    
    getPayHistory: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.getPayHistory();
  }

  render() {
    const b = block('pay-history');
    const { locale, history, currency, actionProcessing } = this.props;
    const items = history.map(item => <div className={b('table-row')} key={item.id}>
      <span className={b('table-cell', { type: 'date' })}>{item.date}</span>
      <span className={b('table-cell', { type: 'type' })}>
        {item.type === 'payment' ? locale.paymentTypes[item.status] : `${item.paymentMode}: ${item.purse}`}
      </span>
      <span className={b('table-cell', { type: 'amount' })}>{`${item.amount} ${currency}`}</span>
      <span className={b('table-cell', { type: 'status' })}>
        {item.type === 'payment' ? locale.success : locale.withdrawalStatuses[item.status]}
      </span>
    </div>);
    return (
      <section className={b()}>
        <Spinner isLoading={actionProcessing} />
        <h4 className={b('title')}>{locale.payHistory}</h4>
        <div className={b('table')}>
          <header className={b('table-header')}>
            <span className={b('table-cell', { type: 'date' })}>{locale.date}</span>
            <span className={b('table-cell', { type: 'type' })}>{locale.operationType}</span>
            <span className={b('table-cell', { type: 'amount' })}>{`${locale.amount} ${currency}`}</span>
            <span className={b('table-cell', { type: 'status' })}>{locale.status}</span>
          </header>
          <main className={b('table-main')}>{items}</main>
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    locale: state.locale.payment,
    history: state.payHistory.history,
    currency: state.auth.user.currency,
    actionProcessing: state.payHistory.actionProcessing,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    getPayHistory: payHistoryActions.getPayHistory,
  };
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PayHistory);
