import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions as paymentActions } from 'features/payment';
import { withdrawalMethods } from 'features/payment/data';
import Spinner from 'components/Spinner';
import { MethodBlock } from './MethodBlock';
import './Withdrawal.scss';

const Withdrawal = ({ locale, withdrawal, withdrawalLoading }) => {
  const b = block('withdrawal');
  const methods = withdrawalMethods.map(method => <MethodBlock
    key={method.type}
    name={method.name}
    type={method.type}
    locale={locale}
    withdrawal={withdrawal}
  />);
  return (
    <section className={b()}>
      <Spinner isLoading={withdrawalLoading} />
      <h4 className={b('title')}>{locale.withdrawalMoney}</h4>
      <h5 className={b('additional-title')}>{locale.withdrawalRules}</h5>
      <p className={b('paragraph')}>{locale.withdrawalParagraph1}</p>
      <ol className={b('text-list')}>
        <li className={b('text-list-item')}>{locale.withdrawalItem1}</li>
        <li className={b('text-list-item')}>{locale.withdrawalItem2}</li>
        <li className={b('text-list-item')}>{locale.withdrawalItem3}</li>
      </ol>
      <p className={b('paragraph', { color: 'red' })}>{locale.withdrawalParagraph2}</p>
      <ul className={b('methods')}>
        {methods}
      </ul>
    </section>
  );
};

Withdrawal.propTypes = {
  locale: PropTypes.object.isRequired,
  withdrawalLoading: PropTypes.bool.isRequired,

  withdrawal: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    locale: state.locale.payment,
    withdrawalLoading: state.payment.withdrawalLoading,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    withdrawal: paymentActions.withdrawal,
  };
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Withdrawal);
