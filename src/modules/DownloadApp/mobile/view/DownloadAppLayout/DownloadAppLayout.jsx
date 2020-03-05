import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DownloadApp from 'features/downloadApp/view/mobile';
import BackBlock from 'components/BackBlock/mobile';

import './DownloadAppLayout.scss';

const DownloadAppLayout = ({ locale }) => {
  const b = block('downloadApp-layout');
  return (
    <React.Fragment>
      <BackBlock>
        <span>{locale.phone}</span>
      </BackBlock>
      <div className={b()}>
        <DownloadApp />
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  locale: state.locale.common,
});

DownloadAppLayout.propTypes = {
  locale: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(DownloadAppLayout);
