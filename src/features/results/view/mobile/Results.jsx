import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BackBlock from 'components/BackBlock/mobile';
import Spinner from 'components/Spinner';
import { actions as resultsActions } from 'features/results';
import { ResultsFilter } from './ResultsFilter';
import { ResultsTourney } from './ResultsTourney/ResultsTourney';
import './Results.scss';

const Results = props => {
  const b = block('results');
  const { locale, sports, tournaments, getSports, getTournaments,
    getResults, results, localeCommon, actionProcessing } = props;

  const [state, changeState] = useState({
    sportID: 1,
    tournament: 'tournament-1',
    country: 'country-1',
    beginDate: new Date(dayjs().add(-1, 'month')),
    endDate: new Date(dayjs()),
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
      <BackBlock>
        <span>{localeCommon.results}</span>
      </BackBlock>
      <Spinner isLoading={actionProcessing} />
      <ResultsFilter
        locale={locale}
        state={state}
        changeState={async value => changeState({ ...state, ...value })}
        sports={sports}
        tournaments={tournaments}
        getTournaments={getTournaments}
        getResults={() => getResults(state)}
      />
      <div className={b('main')}>
        {tourneys}
      </div>
    </section>
  );
};

Results.propTypes = {
  locale: PropTypes.object.isRequired,
  localeCommon: PropTypes.object.isRequired,
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
    localeCommon: state.locale.common,
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
