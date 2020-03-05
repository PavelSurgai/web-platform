import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import SetLanguage from 'components/SetLanguage/mobile';
import SetOddType from 'components/SetOddType/mobile';

import { actions as userSettingsActions } from 'features/userSettings';

const Settings = props => {
  const { locale, lang, changeLang, setOddType, oddType, isSetLangOpen, isSetOddTypeOpen,
    changeSetLangVisibility, changeSetOddTypeVisibility } = props;

  return (
    <>
      {isSetLangOpen ?
        <SetLanguage
          locale={locale}
          lang={lang}
          changeLang={changeLang}
          closeFunction={changeSetLangVisibility}
        /> : null }
      {isSetOddTypeOpen ?
        <SetOddType
          oddType={oddType}
          setOddType={setOddType}
          locale={locale}
          closeFunction={changeSetOddTypeVisibility}
        /> : null }
    </>
  );
};

Settings.propTypes = {
  locale: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired,
  oddType: PropTypes.string.isRequired,
  isSetLangOpen: PropTypes.bool.isRequired,
  isSetOddTypeOpen: PropTypes.bool.isRequired,
  
  changeSetLangVisibility: PropTypes.func.isRequired,
  changeSetOddTypeVisibility: PropTypes.func.isRequired,
  setOddType: PropTypes.func.isRequired,
  changeLang: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  lang: state.userSettings.lang,
  locale: state.locale.common,
  oddType: state.userSettings.oddType,
  isSetLangOpen: state.userSettings.isSetLangOpen,
  isSetOddTypeOpen: state.userSettings.isSetOddTypeOpen,
});

const mapDispatchToProps = dispatch => {
  const actions = {
    changeLang: userSettingsActions.changeLang,
    setOddType: userSettingsActions.setOddType,
    changeSetLangVisibility: userSettingsActions.changeSetLangVisibility,
    changeSetOddTypeVisibility: userSettingsActions.changeSetOddTypeVisibility,
  };
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
