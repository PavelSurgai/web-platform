import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import SVGInline from 'react-svg-inline';

import backArrow from './img/back-arrow.svg';
import './BackButton.scss';

const BackButton = ({ history, route }) => {
  const b = block('back-block');
  const pushRoute = () => route ?
    history.push(route) :
    history.goBack();
  return (
    <button
      className={b('button')}
      onClick={() => pushRoute()}>
      <SVGInline className={b('arrow').toString()} svg={backArrow} />
    </button>
  );
};

BackButton.propTypes = {
  route: PropTypes.string,
  history: PropTypes.object.isRequired,
};

export default withRouter(BackButton);
