import React from 'react';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { actions as userSettingsActions } from 'features/userSettings';
import { actions as authActions } from 'features/auth';
import { actions as downloadAppActions } from 'features/downloadApp';

import SetLanguage from 'components/SetLanguage/desktop';
import Button from 'components/Button/desktop';
import LinkMenu from './LinkMenu';
import MainMenu from './MainMenu';
import { SubHeader } from './SubHeader';
import { UserBlock } from './UserBlock';
import logoIMG from '../img/logo.png';
import Time from './Time';

import { userBlockItems } from '../data';
import './Header.scss';

const Header = ({ locale, changeLang, lang, changeOpenAuthModal, flatPagesList, isAuth,
  balance, user, logOut, oddType, setOddType, bonusBalance, getDownloadUrl, downloadUrl }) => {
  const { currency } = user;
  const b = block('header');
  return (
    <header className={b()}>
      <div className={b('main')}>
        <div className={b('left')}>
          <div className={b('logo-bg')}>
            <img src={logoIMG} className={b('logo')} alt="" />
          </div>
        </div>
        <div className={b('right')}>
          <div className={b('top')}>
            {/* <LinkMenu
              locale={locale}
              getDownloadUrl={getDownloadUrl}
              downloadUrl={downloadUrl}
            /> */}
            {isAuth ? <section className={b('auth-block')}>
              <div className={b('button')}>
                <Button
                  text={locale.topUp}
                  size="low"
                  color="green"
                  link="/profile/top-up"
                />
              </div>
              <div className={b('separator')} />
              <span className={b('balance')}>
                {`${balance} ${currency} + ${bonusBalance} BON`}
              </span>
              <div className={b('separator')} />
              <UserBlock
                items={userBlockItems}
                locale={locale}
                logOut={logOut}
              />
            </section> :
            <section className={b('buttons')}>
              <div className={b('button')}>
                <Button
                  callBack={() => changeOpenAuthModal(true, false)}
                  text={locale.registration}
                  size="low"
                  color="green"
                />
              </div>
              <div className={b('button')}>
                <Button
                  callBack={() => changeOpenAuthModal(true, true)}
                  text={locale.login}
                  size="low"
                  color="blue"
                />
              </div>
            </section>}
          </div>
          <div className={b('bottom')}>
            <div className={b('bottom-left')}>
              <MainMenu locale={locale} />
            </div>
            <div className={b('bottom-right')}>
              <Time />
              <div className={b('separator')} />
              <div className={b('language')}>
                <span className={b('language-text')}>{`${locale.language}:`}</span>
                <SetLanguage changeLang={changeLang} lang={lang} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <SubHeader locale={locale} flatPagesList={flatPagesList} setOddType={setOddType} oddType={oddType} />
    </header>
  );
};

Header.propTypes = {
  locale: PropTypes.object,
  lang: PropTypes.string.isRequired,
  oddType: PropTypes.string.isRequired,
  flatPagesList: PropTypes.array.isRequired,
  isAuth: PropTypes.bool.isRequired,
  balance: PropTypes.number.isRequired,
  bonusBalance: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
  downloadUrl: PropTypes.string.isRequired,
  
  setOddType: PropTypes.func.isRequired,
  changeLang: PropTypes.func.isRequired,
  changeOpenAuthModal: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
  getDownloadUrl: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    locale: state.locale.common,
    lang: state.userSettings.lang,
    oddType: state.userSettings.oddType,
    flatPagesList: state.flatPages.flatPagesList,
    isAuth: state.auth.isAuth,
    balance: state.auth.balance,
    bonusBalance: state.auth.bonusBalance,
    user: state.auth.user,
    downloadUrl: state.downloadApp.downloadUrl,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    changeLang: userSettingsActions.changeLang,
    setOddType: userSettingsActions.setOddType,
    logOut: authActions.logOut,
    getDownloadUrl: downloadAppActions.getDownloadUrl,
  };
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Header));
