import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import { connect } from 'react-redux';

import techWorkSrc from './img/tech-work.png';
import iosIconSrc from './img/ios.png';
import androidIconSrc from './img/android.png';

import './Plug.scss';

const Plug = ({ locale }) => {
  const b = block('plug');
  return (
    <div className={b()}>
      <img className={b('icon')} src={techWorkSrc} alt="tech-work" />
      <span className={b('oops')}>{`${locale.oops}...`}</span>
      <span className={b('title')}>{locale.siteWillBeAvailable}</span>
      <div className={b('title-time-wrapper')}>
        <span className={b('title-time')}>04.01.2020</span>
        <span className={b('title-time')}>{locale.siteWillBeAvailableTime}</span>
      </div>
      <span className={b('buttons-title')}>{`${locale.ourApps}:`}</span>
      <div className={b('buttons')}>
        <a className={b('button')} href="https://seven-bet.ru/app/versions/seven-bet-app-v1.0.0.apk" download>
          <img className={b('button-icon')} src={androidIconSrc} alt="android-app" />
          <span className={b('button-text')}>{locale.downloadAndroidApp}</span>
        </a>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className={b('button')}>
          <img className={b('button-icon')} src={iosIconSrc} alt="ios-app" />
          <span className={b('button-text', { disabled: true })}>{locale.downloadIOSApp}</span>
        </a>
      </div>
    </div>
  );
};

Plug.propTypes = {
  locale: PropTypes.object,
};

const mapStateToProps = state => ({
  locale: state.locale.common,
});

export default connect(mapStateToProps)(React.memo(Plug));
