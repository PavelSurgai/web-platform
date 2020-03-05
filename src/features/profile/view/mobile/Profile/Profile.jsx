import React, { useEffect, useMemo } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import SVGInline from 'react-svg-inline';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions as profileActions } from 'features/profile';
import { actions as authActions } from 'features/auth';

import { profileTabs, mainTabs } from 'modules/Profile/data/mobile';
import { menuItems } from 'shared/utils/menuItems';
import Spinner from 'components/Spinner';
import Settings from 'features/userSettings/mobile';
import ProfileTab from './ProfileTab';
import { ProfileLinks } from './ProfileLinks/ProfileLinks';
import ProfileBlock from './ProfileBlock';
import BalanceBlock from './BalanceBlock';
import arrowSVG from './img/arrow.svg';
import './Profile.scss';

const Profile = ({ user, balance, getUserInfo, isLoading, locale, logout, bonusBalance,
  isAuth, history, flatPagesList, localeCommon }) => {
  const b = block('profile');
  const { id, currency } = user;
  useEffect(() => {
    async function fetchData() {
      getUserInfo();
    }
    if (isAuth) fetchData();
  }, [isAuth, getUserInfo]);

  const tabs = useMemo(() => mainTabs.map((item, index) =>
    <ProfileBlock
      key={index}
      locale={locale}
      isAuth={isAuth}
      item={item}
      header={locale[item.headerText]}
    />), [locale, isAuth]);

  return (
    <React.Fragment>
      <section className={b()}>
        <Settings />
        <BalanceBlock
          userId={user.id}
          isAuth={isAuth}
          locale={locale}
          profileTabs={profileTabs}
          balance={balance}
          currency={currency}
          bonusBalance={bonusBalance}
        />
        <Spinner isLoading={isLoading} />
        {tabs}
        {/* <ProfileLinks
          flatPagesList={flatPagesList}
          links={menuItems}
          locale={localeCommon}
        /> */}
      </section>
    </React.Fragment>
  );
};

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  balance: PropTypes.number.isRequired,
  bonusBalance: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isAuth: PropTypes.bool.isRequired,
  locale: PropTypes.object.isRequired,
  localeCommon: PropTypes.object.isRequired,
  flatPagesList: PropTypes.array.isRequired,

  getUserInfo: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.profile.user,
    isAuth: state.auth.isAuth,
    balance: state.auth.balance,
    bonusBalance: state.auth.bonusBalance,
    isLoading: state.profile.userInfoLoading,
    locale: state.locale.profile,
    flatPagesList: state.flatPages.flatPagesList,
    localeCommon: state.locale.common,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    getUserInfo: profileActions.getUserInfo,
    logout: authActions.logOut,
  };
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
