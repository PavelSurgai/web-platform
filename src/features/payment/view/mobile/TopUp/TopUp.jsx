import React, { useState, useMemo, useCallback } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions as paymentActions, TopUpMethods, MethodTypes } from 'features/payment/redux';
import BackBlock from 'components/BackBlock/mobile';
import Modal from 'components/Modal/mobile';
import Spinner from 'components/Spinner/mobile';
import TopUpMethodBlock from './TopUpMethodBlock';
import closeButtonIMG from '../../icons/close-modal.png';
import './TopUp.scss';

const TopUp = ({ locale, initLoading, initInterkassa, initFreeKassa }) => {
  const [tempMethodID, changeMethodID] = useState(0);
  const [isOpenModal, changeIsOpenModal] = useState(false);
  const onMethodTopUpClick = paymentInfo => {
    switch (paymentInfo.methodID) {
      case MethodTypes.INTERKASSA:
        initInterkassa(paymentInfo);
        break;
      case MethodTypes.FREEKASSA:
        initFreeKassa(paymentInfo);
        break;
      default:
        break;
    }
  };

  const b = block('top-up');
  const methodBlock = tempMethodID === 0 ? null : (
    <TopUpMethodBlock
      locale={locale}
      onTopUpClick={onMethodTopUpClick}
      method={TopUpMethods[tempMethodID]}
      changeMethodID={changeMethodID}
    />
  );

  const iconsList = useMemo(() => Object.entries(TopUpMethods).map(temp => (
    <div className={b('item')} key={temp[0]} onClick={() => changeMethodID(temp[0])}>
      <img className={b('image')} src={temp[1].iconFileNames} alt="" />
    </div>
  )), [b]);

  const setOpenedModal = useCallback(() => {
    changeIsOpenModal(!isOpenModal);
  }, [changeIsOpenModal, isOpenModal]);


  return (
    <React.Fragment>
      <BackBlock>
        <span>{locale.topUp}</span>
      </BackBlock>
      {isOpenModal && <Modal closeFunction={changeIsOpenModal}>
        <div className={b('modal')}>
          <div className={b('modal-top')}>
            <div className={b('modal-title')}>{locale.rulesPayment}</div>
            <img className={b('modal-close')} src={closeButtonIMG} alt="" onClick={setOpenedModal} />
          </div>
          <div className={b('modal-text')}>
            <p>{locale.rulesText1}</p>
            <p>
              {locale.rulesText2}
              <span>{` ${locale.rulesText3}`}</span>
            </p>
            <p>{locale.rulesText4}</p>
          </div>
        </div>
      </Modal>}
      <section className={b()}>
        <Spinner isLoading={initLoading} />
        {tempMethodID === 0 && <div className={b('bottom-text')}>
          <h5 className={b('additional-title')}>{locale.chooseMethod}</h5>
          <div className={b('how-use-button')} onClick={setOpenedModal}>{locale.howUse}</div>
        </div>}
        <div className={b('container')}>
          {tempMethodID === 0 ? iconsList : methodBlock}
        </div>
      </section>
    </React.Fragment>
  );
};

TopUp.propTypes = {
  locale: PropTypes.object.isRequired,
  initLoading: PropTypes.bool.isRequired,

  initInterkassa: PropTypes.func.isRequired,
  initFreeKassa: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    locale: state.locale.payment,
    initLoading: state.payment.initLoading,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    initFreeKassa: paymentActions.initFreeKassa,
    initInterkassa: paymentActions.initInterkassa,
  };
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TopUp);
