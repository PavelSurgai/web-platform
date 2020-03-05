import React, { useEffect } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions as paymentActions, TopUpMethods, MethodTypes,
  TopUpMethodsForVerifiedUsers } from 'features/payment/redux';
import Spinner from 'components/Spinner';
import TopUpMethodBlock from './TopUpMethodBlock';
import './TopUp.scss';

const TopUp = ({ locale, initLoading, initInterkassa, initFreeKassa, getAccessToInterkassaTopUp,
  accessToInterkassaVisaTopUp }) => {
  useEffect(() => {
    getAccessToInterkassaTopUp();
  }, []);

  const onMethodTopUpClick = paymentInfo => {
    const initFuncByPaymentInfo = {
      [MethodTypes.INTERKASSA]: () => initInterkassa(paymentInfo),
      [MethodTypes.FREEKASSA]: () => initFreeKassa(paymentInfo),
    };
    initFuncByPaymentInfo[paymentInfo.methodID]();
  };

  const b = block('top-up');
  const methodBlocksList = Object.keys(TopUpMethods).map(
    key =>
      <TopUpMethodBlock
        locale={locale}
        key={key.title}
        onTopUpClick={onMethodTopUpClick}
        method={TopUpMethods[key]}
      />,
  );

  const methodBlocksListAccess = Object.keys(TopUpMethodsForVerifiedUsers).map(
    key =>
      <TopUpMethodBlock
        locale={locale}
        key={key.title}
        onTopUpClick={onMethodTopUpClick}
        method={TopUpMethodsForVerifiedUsers[key]}
      />,
  );

  return (
    <section className={b()}>
      <Spinner isLoading={initLoading} />
      <h4 className={b('title')}>{locale.topUp}</h4>
      <h5 className={b('additional-title')}>{locale.topUpRules}</h5>
      <p className={b('paragraph')}>{locale.topUpParagraph1}</p>
      <p className={b('paragraph')}>{locale.topUpParagraph2}</p>
      <p className={b('paragraph')}>{locale.topUpParagraph3}</p>
      <div className={b('container')}>
        {accessToInterkassaVisaTopUp && methodBlocksListAccess}
        {methodBlocksList}
      </div>

    </section>
  );
};

TopUp.propTypes = {
  locale: PropTypes.object.isRequired,
  initLoading: PropTypes.bool.isRequired,
  accessToInterkassaVisaTopUp: PropTypes.bool.isRequired,

  initInterkassa: PropTypes.func.isRequired,
  initFreeKassa: PropTypes.func.isRequired,
  getAccessToInterkassaTopUp: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    locale: state.locale.payment,
    initLoading: state.payment.initLoading,
    accessToInterkassaVisaTopUp: state.payment.accessToInterkassaVisaTopUp,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    initFreeKassa: paymentActions.initFreeKassa,
    initInterkassa: paymentActions.initInterkassa,
    getAccessToInterkassaTopUp: paymentActions.getAccessToInterkassaTopUp,
  };
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TopUp);