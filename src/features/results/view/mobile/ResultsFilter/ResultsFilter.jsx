import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import DatePicker from 'react-date-picker';

import Button from 'components/Button/mobile';
import Input from 'components/Input/mobile';
import Select from 'components/Select/mobile';
import './ResultsFilter.scss';

export const ResultsFilter = ({ state, changeState, locale, sports, tournaments, getTournaments, getResults }) => {
  const b = block('results-filter');
  const { sportID, tournament, beginDate, endDate, country, tournamentType } = state;

  const initialValue = { name: '', value: 'tournament-1' };

  const currentSport = sports.reduce((current, item) => item.value === sportID ? item : current, initialValue);
  const currentTournament = tournaments.reduce((current, item) => {
    switch (tournamentType) {
      case 'tournament':
        return item.value === tournament ? item : current;

      case 'country':
        return item.value === country ? item : current;

      default:
        return item.value === tournament || item.value === country ? item : current;
    }
  }, initialValue);

  const onChangeSport = async value => {
    await changeState({ tournament: 'tournament-1' });
    changeState({ sportID: value, tournamentType: 'none' }).then(() => getTournaments({ ...state, sportID: value }));
  };

  const onChangeTournament = value => {
    if (value.includes('country')) {
      changeState({ country: value, tournamentType: 'country', tournament: 'tournament-1' });
    } else {
      changeState({ tournament: value, tournamentType: 'tournament' });
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    getResults();
  };

  return (
    <form className={b()} name="results-filter" onSubmit={onSubmit}>
      <div className={b('item')}>
        <span className={b('item-text')}>{`${locale.kindOfSport}:`}</span>
        <Select
          items={sports}
          activeItem={currentSport}
          onChange={onChangeSport}
        />
      </div>

      <div className={b('item')}>
        <span className={b('item-text')}>{`${locale.tournament}:`}</span>
        <Select
          items={tournaments}
          activeItem={currentTournament}
          onChange={onChangeTournament}
        />
      </div>

      <div className={b('item-date')}>
        <span className={b('item-center-text')}>{locale.from}</span>
        <div className={b('date-filter-input')}>
          <DatePicker
            value={beginDate}
            onChange={newBeginDate => changeState({ beginDate: newBeginDate })}
          />
        </div>
        <span className={b('item-center-text')}>{locale.to}</span>
        <div className={b('date-filter-input')}>
          <DatePicker
            value={endDate}
            callBack={newEndDate => changeState({ endDate: newEndDate })}
          />
        </div>
      </div>
      <div className={b('button')}>
        <Button
          text={locale.show}
          type="submit"
          color="green"
        />
      </div>

    </form>
  );
};

ResultsFilter.propTypes = {
  state: PropTypes.object.isRequired,
  locale: PropTypes.object.isRequired,
  sports: PropTypes.array.isRequired,
  tournaments: PropTypes.array.isRequired,

  getResults: PropTypes.func.isRequired,
  getTournaments: PropTypes.func.isRequired,
  changeState: PropTypes.func.isRequired,
};