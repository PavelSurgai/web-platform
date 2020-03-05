import React from 'react';
import block from 'bem-cn';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SlotsLayoutContent from 'features/slots/desktop';
import SlotsHeader from '../SlotsHeader';

import './SlotsLayout.scss';

const SlotsLayout = ({ match, locale }) => {
  const b = block('slots-layout');
  return (
    <div className={b()}>
      <SlotsHeader locale={locale.slots} />
      <SlotsLayoutContent match={match} />
    </div>
  );
};

const mapStateToProps = state => ({
  locale: state.locale,
});

SlotsLayout.propTypes = {
  locale: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(SlotsLayout);
