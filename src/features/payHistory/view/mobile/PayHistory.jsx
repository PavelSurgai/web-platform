import React, { useEffect, useMemo } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BackBlock from 'components/BackBlock/mobile';
import Spinner from 'components/Spinner';
import { PayHistoryItem } from './PayHistoryItem/PayHistoryItem';
import { actions as payHistoryActions } from '../../redux';
import './PayHistory.scss';

export const PayHistory = ({ locale, localeCommon, history, actionProcessing, getPayHistory }) => {
  const b = block('pay-history');

  useEffect(() => {
    getPayHistory();
  }, [getPayHistory]);

  const items = useMemo(() => history.map(item =>
    <PayHistoryItem key={item.id} item={item} locale={locale} />), [history, locale]);
  return (
    <React.Fragment>
      <BackBlock>
        <span>{localeCommon.payHistory}</span>
      </BackBlock>
      <section className={b()}>
        <Spinner isLoading={actionProcessing} />
        {items}
      </section>
    </React.Fragment>
  );
};

PayHistory.propTypes = {
  locale: PropTypes.object.isRequired,
  localeCommon: PropTypes.object.isRequired,
  history: PropTypes.array.isRequired,
  actionProcessing: PropTypes.bool.isRequired,

  getPayHistory: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    locale: state.locale.payment,
    localeCommon: state.locale.common,
    history: state.payHistory.history,
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
