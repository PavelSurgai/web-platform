import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import BackBlock from 'components/BackBlock/mobile';
import bonusRUImg from '../img/bonuses-ru.png';
import bonusENImg from '../img/bonuses-en.png';

import './Bonuses.scss';

const Bonuses = ({ locale, isAuth, lang }) => {
  const b = block('bonuses');
  return (
    <div className={b()}>
      <BackBlock>
        <span>{locale.bonuses}</span>
      </BackBlock>
      <Link to="/profile/top-up">
        <img className={b('image')} src={lang === 'ru-ru' ? bonusRUImg : bonusENImg} alt="bonuses" />
      </Link>
      <div className={b('more')}>
        <Link className={b('more-link')} to={isAuth ? '/profile/top-up' : '/auth/sign-in'}>
          {isAuth ? locale.topUpBalance : locale.register}
        </Link>
      </div>
    </div>
  );
};

Bonuses.propTypes = {
  locale: PropTypes.object.isRequired,
  isAuth: PropTypes.bool.isRequired,
  lang: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  locale: state.locale.bonuses,
  isAuth: state.auth.isAuth,
  lang: state.userSettings.lang,
});

export default connect(mapStateToProps)(Bonuses);
