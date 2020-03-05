import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import DatePicker from 'react-date-picker';

import CheckBox from 'components/CheckBox/mobile';
import Button from 'components/Button/mobile';
import './BetsFilter.scss';

const BetsFilter = props => {
  const b = block('bets-filter');
  const { locale, showLossBets, showWinBets, showWorkBets,
    beginDate, endDate, onSubmit, methodsToChangeValues } = props;
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
            callBack={methodsToChangeValues.showWinBets}
          />
          <span className={b('checkbox-item-text')}>{locale.winned}</span>
        </label>

        <label className={b('checkbox-item')}>
          <CheckBox
            name="showLossBets"
            checked={showLossBets}
            callBack={methodsToChangeValues.showLoseBets}
          />
          <span className={b('checkbox-item-text')}>{locale.lossed}</span>
        </label>

        <label className={b('checkbox-item')}>
          <CheckBox
            name="showWorkBets"
            checked={showWorkBets}
            callBack={methodsToChangeValues.showWorkBets}
          />
          <span className={b('checkbox-item-text')}>{locale.notCalculated}</span>
        </label>

      </div>
      <section className={b('date')}>
        <h6 className={b('title')}>{locale.dateFilter}</h6>
        <div className={b('date-filter')}>
          <span className={b('date-filter-text')}>{locale.from}</span>
          <div className={b('date-filter-input')}>
            <DatePicker
              onChange={methodsToChangeValues.beginDate}
              value={beginDate}
            />
          </div>
          <span className={b('date-filter-text')}>{locale.to}</span>
          <div className={b('date-filter-input')}>
            <DatePicker
              onChange={methodsToChangeValues.endDate}
              value={endDate}
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
  methodsToChangeValues: PropTypes.object.isRequired,

  onSubmit: PropTypes.func.isRequired,
};

export default BetsFilter;
