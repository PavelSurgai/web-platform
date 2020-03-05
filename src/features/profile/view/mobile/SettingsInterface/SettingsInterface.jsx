import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions } from 'features/userSettings';

import Button from 'components/Button/mobile';
import BackBlock from 'components/BackBlock/mobile';
import background from './img/background.png';

import './SettingsInterface.scss';

const SettingsInterface = ({ locale, isActiveUseName, changeIsActiveUseName }) => {
  const b = block('settings-interface');
  return <React.Fragment>
    <BackBlock>
      <span>{locale.settings}</span>
    </BackBlock>
    <section className={b()}>
      <img src={background} alt="" className={b('image')} />
      <div className={b('text')}>{locale.settingsText}</div>
      <div className={b('activation-button')}>
        <Button
          text={isActiveUseName ? locale.remove : locale.add}
          size="default"
          color="dark"
          type="button"
          callBack={() => changeIsActiveUseName(!isActiveUseName)}
        />
      </div>
    </section>
  </React.Fragment>;
};

SettingsInterface.propTypes = {
  locale: PropTypes.object.isRequired,
  isActiveUseName: PropTypes.bool.isRequired,
  changeIsActiveUseName: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  locale: state.locale.profile,
  isActiveUseName: state.userSettings.isActiveUseName,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  changeIsActiveUseName: actions.changeIsActiveUseName,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SettingsInterface);