import React, { useEffect, useMemo } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { actions as sportMenuActions } from 'features/sportMenu';

import Spinner from 'components/Spinner';
import BackBlock from 'components/BackBlock/mobile';
import { getSportImgByID } from 'shared/utils/sports';
import { CountryItem } from './CountryItem';
import TimeFilter from './TimeFilter';
import './CountryMenu.scss';

const CountryMenu = ({ match, isLoading, sports, getCountries, countries,
  locale, changeFilterValue, lang, filterValue, getSports }) => {
  const b = block('country-menu');
  const { sportID } = match.params;
  const items = countries.map(country => <CountryItem
    key={country.ID}
    sportID={sportID}
    text={country.Name}
    count={country.Count}
    id={country.ID}
    filterValue={filterValue}
  />);

  useEffect(() => {
    getCountries(sportID, filterValue);
    if (sports.length === 0) getSports();
  }, [sportID, filterValue, lang]);

  const sportImg = useMemo(() => getSportImgByID(sportID), [sportID]);

  return <div className={b()}>
    <Spinner isLoading={isLoading} />
    <BackBlock>
      <div className={b('back-content')}>
        <img src={sportImg} className={b('back-image')} alt="" />
        {sports.find(t => t.ID === +sportID) ? sports.find(t => t.ID === +sportID).Name : ''}
      </div>
    </BackBlock>
    <TimeFilter
      locale={locale}
      filterValue={filterValue}
      changeFilterValue={changeFilterValue} />
    <ul className={b('list')}>
      {items}
    </ul>
  </div>;
};

CountryMenu.propTypes = {
  match: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  countries: PropTypes.array.isRequired,
  sports: PropTypes.array.isRequired,
  locale: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired,
  filterValue: PropTypes.number.isRequired,

  getCountries: PropTypes.func.isRequired,
  changeFilterValue: PropTypes.func.isRequired,
  getSports: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    countries: state.sportMenu.countries,
    sports: state.sportMenu.sports,
    isLoading: state.sportMenu.countriesLoading,
    locale: state.locale.lineTimeFilter,
    filterValue: state.sportMenu.filterValue,
    lang: state.userSettings.lang,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    getCountries: sportMenuActions.getCountries,
    changeFilterValue: sportMenuActions.changeFilterValue,
    getSports: sportMenuActions.getSports,
  };
  return bindActionCreators(actions, dispatch);
}

const MemoCountryMenu = React.memo(CountryMenu);

export default connect(mapStateToProps, mapDispatchToProps)(MemoCountryMenu);
