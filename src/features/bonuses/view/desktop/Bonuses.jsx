import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import bonusImg from '../img/bonuses.png';

import './Bonuses.scss';

const Bonuses = ({ locale }) => {
  const b = block('bonuses');
  return (
    <div className={b()}>
      <div className={b('header')}>
        <h3 className={b('header-text')}>{locale.bonuses}</h3>
      </div>
      <Link to="/profile/top-up">
        <img className={b('image')} src={bonusImg} alt="bonuses" />
      </Link>
      <div className={b('more')}>
        <Link className={b('more-link')} to="/flatpages/bonuses-info">{locale.moreAboutStock}</Link>
      </div>
    </div>
  );
};

Bonuses.propTypes = {
  locale: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  locale: state.locale.bonuses,
});

export default connect(mapStateToProps)(Bonuses);
