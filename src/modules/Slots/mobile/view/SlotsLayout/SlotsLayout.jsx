import React from 'react';
import block from 'bem-cn';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import NotAuthorized from 'components/NotAuthorized/mobile';
import SlotsLayoutContent from 'features/slots/mobile';
import BackBlock from 'components/BackBlock/mobile';

import './SlotsLayout.scss';

const SlotsLayout = ({ match, locale, isAuth }) => {
  const b = block('slots-layout');

  return (
    <div className={b()}>
      {!isAuth ? <NotAuthorized locale={locale.auth} /> :
      <SlotsLayoutContent match={match} isAuth={isAuth} />
      }
    </div>
  );
};

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
  locale: state.locale,
});

SlotsLayout.propTypes = {
  locale: PropTypes.object.isRequired,
  isAuth: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(SlotsLayout);
