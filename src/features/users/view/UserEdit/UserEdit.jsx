import React, { useEffect, useMemo, useCallback, useState } from 'react';
import block from 'bem-cn';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import addNotify from 'features/notify';

import { actions } from 'features/users/redux';

import Input from 'components/Input';

import PopUp from './PopUp';

import './UserEdit.scss';

const UserEdit = ({ match }) => {
  const b = block('user-edit');
  const dispatch = useDispatch();

  const [topUpMoney, changeTopUpMoney] = useState('');
  const [withDrawalMoney, changeWithdrawalMoney] = useState('');
  const [popUpIsOpen, setPopUpOpened] = useState(false);

  const id = match.params.id;
  const locale = useSelector(state => state.locale.locale, shallowEqual);
  const actionProcessing = useSelector(state => state.users.actionProcessing, shallowEqual);
  const usersList = useSelector(state => state.users.usersList.users, shallowEqual);
  const newPassword = useSelector(state => state.users.newPassword, shallowEqual);

  const user = useMemo(() => usersList?.find(t => +t.id === +id) || {}, [id, usersList]);

  useEffect(() => {
    if (!usersList) {
      dispatch(actions.getUsersList());
    }
  }, [dispatch, usersList]);

  const onChangeValue = useCallback(e => {
    const isTopUp = +e.target.getAttribute('data-key') ? true : false;
    if (isTopUp) {
      if (!withDrawalMoney) changeTopUpMoney(e.currentTarget.value);
    } else {
      if (!topUpMoney) changeWithdrawalMoney(e.currentTarget.value);
    }
  }, [topUpMoney, withDrawalMoney]);

  const paymentButtonText = useMemo(() => {
    if (!topUpMoney && !withDrawalMoney) return locale.topUpWithdrawal;
    if (!topUpMoney && withDrawalMoney) return locale.withdrawal;
    if (topUpMoney && !withDrawalMoney) return locale.topUp;
  }, [locale.topUp, locale.topUpWithdrawal, locale.withdrawal, topUpMoney, withDrawalMoney]);

  const onPaymentClick = useCallback(() => {
    dispatch(actions.changeUserBalance(
      id,
      topUpMoney || withDrawalMoney,
      topUpMoney ? false : true,
      topUpMoney ? changeTopUpMoney : changeWithdrawalMoney,
    ));
  }, [dispatch, id, topUpMoney, withDrawalMoney]);

  const onBanClick = useCallback(e => {
    const value = +e.target.getAttribute('data-key') ? true : false;
    if (!actionProcessing) dispatch(actions.changeBanState(id, value));
  }, [actionProcessing, dispatch, id]);

  const onResetClick = useCallback(() => {
    if (!actionProcessing) dispatch(actions.resetPassword(id, setPopUpOpened));
  }, [actionProcessing, dispatch, id]);

  return (
    <React.Fragment>
      {popUpIsOpen && <PopUp password={newPassword} id={id} locale={locale} onClose={setPopUpOpened} />}
      <div className={b()}>
        <div className={b('info')}>
          <div className={b('info-item')}>
            <div className={b('info-title')}>{locale.id}</div>
            <div className={b('value')}>{user.id}</div>
          </div>
          <div className={b('info-item')}>
            <div className={b('info-title')}>{locale.nickname}</div>
            <div className={b('value')}>{user.nickname}</div>
          </div>
          <div className={b('info-item')}>
            <div className={b('info-title')}>{locale.balance}</div>
            <div className={b('value')}>{user.balance}</div>
          </div>
        </div>
        <div className={b('payment-block')}>
          <div className={b('payment-item')}>
            <div className={b('payment-title')}>{locale.topUp}</div>
            <Input
              type="number"
              value={topUpMoney}
              callBack={onChangeValue}
              data-key={1}
            />
          </div>
          <div className={b('payment-item')}>
            <div className={b('payment-title')}>{locale.withdrawal}</div>
            <Input
              type="number"
              value={withDrawalMoney}
              callBack={onChangeValue}
              data-key={0}
            />
          </div>
          <div className={b('payment-button')} onClick={onPaymentClick}>{paymentButtonText}</div>
        </div>
        <div className={b('buttons')}>
          <div className={b('reset-button')} onClick={onResetClick}>{locale.resetPassword}</div>
          <div className={b('buttons-bottom')}>
            <div className={b('ban-button')} data-key={1} onClick={onBanClick}>{locale.ban}</div>
            <div className={b('unban-button')} data-key={0} onClick={onBanClick}>{locale.unban}</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserEdit;