import React, { useState } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import SVGInline from 'react-svg-inline';
import { Link } from 'react-router-dom';

import ProfileTab from '../ProfileTab';

import arrowSVG from '../img/arrow.svg';
import dollarSVG from '../img/dollar.svg';
import presentSVG from '../img/present.svg';

import './BalanceBlock.scss';

const BalanceBlock = ({ isAuth, locale, balance, currency, bonusBalance, profileTabs, userId }) => {
  const b = block('menu-balance-block');
  const [isOpen, changeOpened] = useState(true);
  return (
    <div className={b()}>
      {isAuth ?
        <React.Fragment>
          <div className={b('header')} onClick={() => changeOpened(!isOpen)}>
            <span>{locale.balance}</span>
            <SVGInline svg={arrowSVG} className={b('arrow', { opened: isOpen }).toString()} />
          </div>
          {isOpen ? <>
            <div className={b('info')}>
              <div className={b('id-square')}>
                <div className={b('title')}>
                  {locale.accountNum}
                </div>
                <div className={b('content')}>{userId}</div>
              </div>
            </div>
            <div className={b('info')}>
              <div className={b('balance-square')}>
                <div className={b('title')}>
                  <SVGInline svg={dollarSVG} className={b('icon').toString()} />
                  {locale.balance}
                </div>
                <div className={b('content')}>{`${balance} ${currency}`}</div>
              </div>
              <div className={b('bonus-square')}>
                <div className={b('title')}>
                  <SVGInline svg={presentSVG} className={b('icon').toString()} />
                  {locale.bonuses}
                </div>
                <div className={b('content')}>{`${bonusBalance} B`}</div>
              </div>
            </div>
            <div className={b('payment-buttons')}>
              <Link className={b('top-up-button')} to="/profile/top-up">{locale.topUp}</Link>
              <Link className={b('withdrawal-button')} to="/profile/withdrawal">{locale.withdrawalMoney}</Link>
            </div>
            <div className={b('links')}>
              <ProfileTab
                locale={locale}
                item={profileTabs[0]}
              />
              <ProfileTab
                locale={locale}
                item={profileTabs[1]}
              />
              <ProfileTab
                locale={locale}
                item={profileTabs[2]}
              />
            </div>
          </> : null}
        </React.Fragment> :
        <div className={b('action-buttons')}>
          <Link className={b('sign-in')} to="/auth/sign-in">{locale.signIn}</Link>
          <Link className={b('sign-up')} to="/auth/sign-up">{locale.signUp}</Link>
        </div>}
    </div>
  );
};

BalanceBlock.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  locale: PropTypes.object.isRequired,
  balance: PropTypes.number,
  currency: PropTypes.string,
  bonusBalance: PropTypes.number,
  profileTabs: PropTypes.array.isRequired,
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default BalanceBlock;