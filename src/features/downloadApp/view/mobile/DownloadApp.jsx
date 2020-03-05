import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import { connect } from 'react-redux';
import SVGInline from 'react-svg-inline';

import bgIMG from '../img/bg.png';
import androidSVG from '../img/android.svg';
import iosSVG from '../img/ios.svg';

import './DownloadApp.scss';

const DownloadApp = ({ locale }) => {
  const b = block('download-application');
  return (
    <div className={b()}>
      <img src={bgIMG} alt="" className={b('image')} />
      <div className={b('text')}>{locale.applicationText}</div>
      <a
        className={b('button-wrapper')}
        href="https://app.yadelauprilozhenievtomske.com/app_updater/versions/sevenbet/common/sevenbet_common_v0.9.6.apk"
        download>
        <SVGInline svg={androidSVG} className={b('icon')} />
        {locale.download}
      </a>
      <div className={b('button-wrapper', { disabled: true })}>
        <SVGInline svg={iosSVG} className={b('icon')} />
        {locale.laterText}
      </div>
    </div>
  );
};

DownloadApp.propTypes = {
  locale: PropTypes.object,
};

const mapStateToProps = state => ({
  locale: state.locale.common,
});

export default connect(mapStateToProps)(DownloadApp);
