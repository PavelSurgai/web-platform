import React, { useState, useCallback, useMemo } from 'react';
import block from 'bem-cn';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import SVGInline from 'react-svg-inline';

import { actions } from '../../redux';

import "react-datepicker/dist/react-datepicker.css";

import DatePicker from "react-datepicker";

import Input from 'components/Input';
import searchSvg from '../img/search.svg';
import calendarSvg from '../img/calendar.svg';

import TransactionItem from './TransactionItem';

import './TransactionHistory.scss';

const TransactionHistory = () => {
  const b = block('transaction-history');
  const dispatch = useDispatch();
  const [filterValue, onChangeFilterValue] = useState('');
  const locale = useSelector(state => state.locale.locale, shallowEqual);
  const transactions = useSelector(state => state.transaction.transactions, shallowEqual);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const changeFilterValue = useCallback(e => {
    onChangeFilterValue(e.currentTarget.value);
  }, []);
  

  const onClick = useCallback(() => {
    dispatch(actions.getTransactions({ startDate, endDate }))
  }, [dispatch, endDate, startDate]);
  
  const list = useMemo(() => transactions.filter(t =>
    ~t.email?.toUpperCase().indexOf(filterValue.toUpperCase()) || false).map((item, index) => (
      <TransactionItem key={`${item.email}_${index}`} item={item} />
    )) || [], [filterValue, transactions])

  return (
    <div className={b()}>
      <div className={b('filter-block')}>
        <div className={b('filter-item')}>
          <div className={b('filter-title')}>{locale.startDate}</div>
          <div className={b('input')}>
            <DatePicker
              selected={startDate}
              onChange={date => setStartDate(date)}
              selectsStart
              className={b('date')}
              startDate={startDate}
              dateFormat="dd.MM.yyyy"
              endDate={endDate}
            />
            <SVGInline svg={calendarSvg} className={b('calendar').toString()} />
          </div>
        </div>
        <div className={b('filter-item')}>
          <div className={b('filter-title')}>{locale.endingDate}</div>
          <div className={b('input')}>
            <DatePicker
              selected={endDate}
              onChange={date => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              className={b('date')}
              endDate={endDate}
              dateFormat="dd.MM.yyyy"
              minDate={startDate}
            />
            <SVGInline svg={calendarSvg} className={b('calendar').toString()} />
          </div>
        </div>
      </div>
      <div className={b('search-button')} onClick={onClick}>
        <span>{locale.display}</span>
        <SVGInline svg={searchSvg} className={b('search-button-icon').toString()} />
      </div>
      <div className={b('search-block')}>
        <SVGInline svg={searchSvg} className={b('search-icon').toString()} />
        <Input
          value={filterValue}
          callBack={changeFilterValue}
          style={{ paddingLeft: '2rem' }}
        />
      </div>
      <div className={b('result-wrapper')}>
        <div className={b('users-header')}>
          <span className={b('user-header-item', { type: 'left' })}>{locale.email}</span>
          <span className={b('user-header-item', { type: 'center' })}>{locale.date}</span>
          <span className={b('user-header-item', { type: 'right' })}>{locale.amount}</span>
          <span className={b('user-header-item', { type: 'right' })}>{locale.balance}</span>
        </div>
        <div className={b('items')}>{list}</div>
      </div>
    </div>
  );
};

export default TransactionHistory;