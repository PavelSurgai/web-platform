import React, { useState, useCallback, useEffect } from 'react';
import block from 'bem-cn';
import { useSelector, useDispatch } from 'react-redux'
import SVGInline from 'react-svg-inline';
import dayjs from 'dayjs';

import Input from 'components/Input';
import { actions } from '../redux';
import searchSvg from './img/search.svg';

import './Total.scss';

const Total = () => {
  const b = block('total');
  const dispatch = useDispatch();
  const locale = useSelector(state => state.locale.locale);
  const totalInfo = useSelector(state => state.total.totalInfo);
  const actionProcessing = useSelector(state => state.total.actionProcessing);
  const [fromDate, changeFromDate] = useState(dayjs(new Date()).add(-7, 'day').format('YYYY-MM-DD'));
  const [toDate, changeToDate] = useState(dayjs(new Date()).format('YYYY-MM-DD'));
  useEffect(() => {
    dispatch(actions.getTotal(fromDate, toDate));
  }, [])
  const callBack = useCallback(() => dispatch(actions.getTotal(fromDate, toDate)), [fromDate, toDate, dispatch])

  return <section className={b()}>
    <div className={b('title')}>{locale.login}</div>
    <div className={b('input-block')}>
      {`${locale.startDate}:`}
      <Input value={fromDate} onChange={e => changeFromDate(e.currentTarget.value)} type="date"/>
    </div>
    <div className={b('input-block')}>
      {`${locale.endingDate}:`}
      <Input value={toDate} onChange={e => changeToDate(e.currentTarget.value)} type="date" />
    </div>
    <div className={b('bottom')}>
      <div className={b('button', { isLoading: actionProcessing })} onClick={actionProcessing ? f => f : callBack}>
        {locale.display}
        <SVGInline svg={searchSvg} className={b('ok').toString()} />
      </div>
    </div>
    <article className={b('result')}>
      <div className={b('result-header')}>
        <span>{locale.total}</span>
        <span>{locale.term}</span>
        <span>{locale.amount}</span>
      </div>
      <div className={b('row')}>
        <span></span>
        <span>{locale.total}</span>
        <span>{totalInfo.total}</span>
      </div>
      <div className={b('row')}>
        <span></span>
        <span>{locale.cashPayment}</span>
        <span>{totalInfo.credits}</span>
      </div>
      <div className={b('row')}>
        <span></span>
        <span>{locale.cashPayout}</span>
        <span>{totalInfo.debits}</span>
      </div>
    </article>
  </section>
}

export default Total;
