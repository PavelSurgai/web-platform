import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import SVGInline from 'react-svg-inline';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from 'components/Button/mobile';
import balanceSVG from '../img/balance.svg';
import bonusSVG from '../img/bonus.svg';
import SignUpSVG from '../img/signup.svg';
import SignInSVG from '../img/signin.svg';
import LogoPNG from '../img/logo.png';
import paymentSVG from '../img/payment.svg';
import basketSVG from '../img/basket.svg';
import './Header.scss';

const Header = ({ changeMenuOpen, locale, isAuth, balance, currency, bonusBalance, count, innerRef, sub }) => {
  const b = block('header');
  return (
    <header className={b()} ref={innerRef}>
      <div className={b('header-wrapper')}>
        <div className={b('right')}>
          {isAuth ? <React.Fragment>
            <Link className={b('logo-click')} to="/main">
              <img className={b('logo').toString()} src={LogoPNG} alt="logo" />
            </Link>
            <div className={b('balance')}>
              <div className={b('balance-line')}>
                {`${balance} ${currency}`}
                <SVGInline className={b('mini-icon').toString()} svg={balanceSVG} />
              </div>
              <div className={b('balance-line')}>
                <span className={b('bonus-balance')}>{`${bonusBalance} B`}</span>
                <SVGInline className={b('mini-icon').toString()} svg={bonusSVG} />
              </div>
            </div>
            <Link className={b('user')} to="/profile/top-up">
              <SVGInline className={b('user-icon').toString()} svg={paymentSVG} />
            </Link>
          </React.Fragment> : <React.Fragment>
            <div className={b('sign-left')}>
              <Link className={b('sign-up')} to="/auth/sign-up">
                <SVGInline className={b('up').toString()} svg={SignUpSVG} />
                <div className={b('registration')}>
                  {locale.registration}
                </div>
              </Link>
            </div>
            <Link className={b('logo-click')} to="/main">
              <img className={b('logo').toString()} src={LogoPNG} alt="logo" />
            </Link>
            <div className={b('sign-right')}>
              <Link className={b('sign-in')} to="/auth/sign-in">
                <div className={b('authorization')}>
                  {locale.authorization}
                </div>
                <SVGInline className={b('in').toString()} svg={SignInSVG} />
              </Link>
            </div>
          </React.Fragment>}
        </div>
      </div>
      {sub}
    </header>
  );
};

Header.propTypes = {
  locale: PropTypes.object.isRequired,
  innerRef: PropTypes.object.isRequired,
  isAuth: PropTypes.bool.isRequired,
  balance: PropTypes.number.isRequired,
  bonusBalance: PropTypes.number.isRequired,
  currency: PropTypes.string,

  changeMenuOpen: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    locale: state.locale.common,
    isAuth: state.auth.isAuth,
    balance: state.auth.balance,
    bonusBalance: state.auth.bonusBalance,
    currency: state.auth.user.currency,
  };
}

const ConnectedHeader = connect(mapStateToProps)(Header);

export default React.memo(React.forwardRef((props, ref) => <ConnectedHeader innerRef={ref} {...props} />));
