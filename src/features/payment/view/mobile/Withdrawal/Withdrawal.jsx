import React, { useState, useMemo, useCallback } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions as paymentActions } from 'features/payment';
import { withdrawalMethods } from 'features/payment/data';
import Spinner from 'components/Spinner/mobile';
import BackBlock from 'components/BackBlock/mobile';
import Modal from 'components/Modal/mobile';
import closeButtonIMG from '../../icons/close-modal.png';
import { MethodBlock } from './MethodBlock';
import './Withdrawal.scss';

const Withdrawal = ({ locale, localeCommon, withdrawal, withdrawalLoading }) => {
  const [tempMethodID, changeMethodID] = useState(0);
  const [isOpenModal, changeIsOpenModal] = useState(false);
  const b = block('withdrawal');
  const needMethod = withdrawalMethods.find(t => t.type === tempMethodID);
  const methodBlock = tempMethodID === 0 ? null : <MethodBlock
    key={needMethod.type}
    name={needMethod.name}
    type={needMethod.type}
    method={needMethod}
    locale={locale}
    withdrawal={withdrawal}
    changeMethodID={changeMethodID}
  />;

  const iconsList = useMemo(() => withdrawalMethods.map(temp => (
    <div className={b('item')} key={temp.type} onClick={() => changeMethodID(temp.type)}>
      <img className={b('image')} src={temp.iconFileNames} alt="" />
    </div>
  )), [b]);

  const setOpenedModal = useCallback(() => {
    changeIsOpenModal(!isOpenModal);
  }, [isOpenModal]);

  return (
    <React.Fragment>
      <BackBlock isProfile>
        <span>{locale.backToProfile}</span>
      </BackBlock>
      {isOpenModal && <Modal closeFunction={changeIsOpenModal}>
        <div className={b('modal')}>
          <div className={b('modal-top')}>
            <div className={b('modal-title')}>{locale.rulesWithdrawal}</div>
            <img className={b('modal-close')} src={closeButtonIMG} alt="" onClick={setOpenedModal} />
          </div>
          <div className={b('modal-text')}>
            <p>{locale.withdrawalRulesText1}</p>
            <div>{locale.withdrawalRulesText2}</div>
            <div>{locale.withdrawalRulesText3}</div>
            <div className={b('last-modal-rules')}>{locale.withdrawalRulesText4}</div>
            <p><span>{locale.withdrawalRulesText5}</span></p>
          </div>
        </div>
      </Modal>}
      <section className={b()}>
        <Spinner isLoading={withdrawalLoading} />
        {tempMethodID === 0 && <div className={b('bottom-text')}>
          <h5 className={b('additional-title')}>{locale.chooseMethodWithdrawal}</h5>
          <div className={b('how-use-button')} onClick={setOpenedModal}>{locale.howUse}</div>
        </div>}
        <div className={b('container')}>
          {tempMethodID === 0 ? iconsList : methodBlock}
        </div>
      </section>
    </React.Fragment>
  );
};

Withdrawal.propTypes = {
  locale: PropTypes.object.isRequired,
  localeCommon: PropTypes.object.isRequired,
  withdrawalLoading: PropTypes.bool.isRequired,

  withdrawal: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    locale: state.locale.payment,
    localeCommon: state.locale.common,
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
