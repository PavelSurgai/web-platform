import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions as resultsActions } from 'features/results';
import Spinner from 'components/Spinner';
import { ResultsFilter } from './ResultsFilter';
import { ResultsTourney } from './ResultsTourney/ResultsTourney';
import './Results.scss';

export const Results = props => {
  const b = block('results');
  const { locale, sports, tournaments, getSports, getTournaments,
    getResults, results, actionProcessing } = props;

  const [state, changeState] = useState({
    sportID: 1,
    tournament: 'tournament-1',
    country: 'country-1',
    beginDate: dayjs().add(-1, 'month').format('YYYY-MM-DD'),
    endDate: dayjs().format('YYYY-MM-DD'),
    tournamentType: 'none',
  });

  useEffect(() => {
    async function fetchData() {
      await getSports(state);
      await getTournaments(state);
    }
    fetchData();
  }, []);

  const tourneys = Object.values(results).map(tourney => <ResultsTourney
    key={tourney.ID}
    tourney={tourney}
    locale={locale}
  />);

  return (
    <section className={b()}>
      <Spinner isLoading={actionProcessing} />
      <div className={b('header')}>
        <h3 className={b('header-text')}>{locale.results}</h3>
      </div>
      <ResultsFilter
        locale={locale}
        state={state}
        changeState={async value => changeState({ ...state, ...value })}
        sports={sports}
        tournaments={tournaments}
        getTournaments={getTournaments}
        getResults={() => getResults(state)}
      />
      {tourneys.length > 0 && <div className={b('main')}>
        {tourneys}
      </div>}
    </section>
  );
};

Results.propTypes = {
  locale: PropTypes.object.isRequired,
  sports: PropTypes.array.isRequired,
  tournaments: PropTypes.array.isRequired,
  results: PropTypes.object.isRequired,
  actionProcessing: PropTypes.bool.isRequired,

  getSports: PropTypes.func.isRequired,
  getTournaments: PropTypes.func.isRequired,
  getResults: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    locale: state.locale.results,
    sports: state.results.sports,
    tournaments: state.results.tournaments,
    results: state.results.results,
    actionProcessing: state.results.actionProcessing,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    getSports: resultsActions.getSports,
    getTournaments: resultsActions.getTournaments,
    getResults: resultsActions.getResults,
  };
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Results);
