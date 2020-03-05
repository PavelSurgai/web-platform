import React, { useState } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import CheckBox from 'components/CheckBox/desktop';
import Input from 'components/Input/desktop';
import Button from 'components/Button/desktop';
import './BetsFilter.scss';

export const BetsFilter = props => {
  const b = block('bets-filter');
  const { locale, showLossBets, showWinBets, showWorkBets,
    beginDate, endDate, onChangeValue, onChangeChecked, onSubmit } = props;
  return (
    <form
      className={b()}
      onSubmit={e => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <h6 className={b('title')}>{locale.showBets}</h6>
      <div className={b('checkboxes')}>

        <label className={b('checkbox-item')}>
          <CheckBox
            name="showWinBets"
            checked={showWinBets}
            callBack={onChangeChecked}
          />
          <span className={b('checkbox-item-text')}>{locale.winned}</span>
        </label>

        <label className={b('checkbox-item')}>
          <CheckBox
            name="showLossBets"
            checked={showLossBets}
            callBack={onChangeChecked}
          />
          <span className={b('checkbox-item-text')}>{locale.lossed}</span>
        </label>

        <label className={b('checkbox-item')}>
          <CheckBox
            name="showWorkBets"
            checked={showWorkBets}
            callBack={onChangeChecked}
          />
          <span className={b('checkbox-item-text')}>{locale.notCalculated}</span>
        </label>

      </div>
      <section className={b('date')}>
        <h6 className={b('title')}>{locale.dateFilter}</h6>
        <div className={b('date-filter')}>
          <span className={b('date-filter-text')}>{locale.from}</span>
          <div className={b('date-filter-input')}>
            <Input
              name="beginDate"
              value={beginDate}
              type="date"
              callBack={onChangeValue}
            />
          </div>
          <span className={b('date-filter-text')}>{locale.to}</span>
          <div className={b('date-filter-input')}>
            <Input
              name="endDate"
              value={endDate}
              type="date"
              callBack={onChangeValue}
            />
          </div>
        </div>
      </section>
      <div className={b('button')}>
        <Button
          text={locale.show}
          size="low"
          color="green"
          type="submit"
        />
      </div>
    </form>
  );
};

BetsFilter.propTypes = {
  locale: PropTypes.object.isRequired,
  showLossBets: PropTypes.bool.isRequired,
  showWinBets: PropTypes.bool.isRequired,
  showWorkBets: PropTypes.bool.isRequired,
  beginDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,

  onSubmit: PropTypes.func.isRequired,
  onChangeValue: PropTypes.func.isRequired,
  onChangeChecked: PropTypes.func.isRequired,
};