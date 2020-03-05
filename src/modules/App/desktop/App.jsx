import React from 'react';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import asyncPoll from 'react-async-poll';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import { actions as userSettingsActions } from 'features/userSettings';
import { actions as flatPagesActions } from 'features/flatPages';
import { actions as basketActions } from 'features/basket';
import { actions as authActions } from 'features/auth';
import { actions as lineActions } from 'features/line';
import { actions as cyberActions } from 'features/cybersport';

import { Auth, OneClickModal } from 'features/auth/desktop';
import { addNotify } from 'features/notify';
import HandleLogin from 'components/HandleLogin/desktop';
import Slider from 'features/slider/desktop';
import Notify from 'features/notify/desktop';
import OneClick from 'components/OneClick/desktop';
import Header from 'components/Header/desktop';
import Footer from 'components/Footer/desktop';
import Modal from 'components/Modal/desktop';
import SportMenu from 'features/sportMenu/desktop';
import Basket from 'features/basket/desktop';
import Advertising from 'features/advertising/desktop';
import { defineNeedSendVerification } from '../data/forRouterFeatures';
import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.appRef = React.createRef();
    this.basketRef = React.createRef();
    this.footerRef = React.createRef();
    this.oneClickRef = React.createRef();
    this.sportMenuRef = React.createRef();
  }

  static propTypes = {
    lang: PropTypes.string.isRequired,
    locale: PropTypes.object.isRequired,
    localeAuth: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    flatPagesList: PropTypes.array.isRequired,
    authModal: PropTypes.shape({
      isOpen: PropTypes.bool,
      isSignIn: PropTypes.bool,
    }).isRequired,
    oneClickModal: PropTypes.shape({
      email: PropTypes.string,
      password: PropTypes.string,
      isOpen: PropTypes.bool,
    }),

    phoneRecovery: PropTypes.bool.isRequired,
    isAuth: PropTypes.bool.isRequired,
    handleIsOpen: PropTypes.bool.isRequired,
    amountOneClick: PropTypes.number.isRequired,
    isOneClick: PropTypes.bool.isRequired,
    actionProcessingOneClick: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired,
    closeRecovery: PropTypes.func.isRequired,
    handleLogin: PropTypes.func.isRequired,
    sendPhoneCode: PropTypes.func.isRequired,

    emailVerifycation: PropTypes.func.isRequired,
    getSettings: PropTypes.func.isRequired,
    checkAuth: PropTypes.func.isRequired,
    getFlatPages: PropTypes.func.isRequired,
    changeLang: PropTypes.func.isRequired,
    handleAuthModal: PropTypes.func.isRequired,
    handleOneclickModal: PropTypes.func.isRequired,
    loadFavoritesList: PropTypes.func.isRequired,
    clearLocalFavoritesList: PropTypes.func.isRequired,
    changeaamountOneClick: PropTypes.func.isRequired,
    clearLocalFavoritesEvents: PropTypes.func.isRequired,
    changeIsOneClick: PropTypes.func.isRequired,
    sendNewPasswordByPhone: PropTypes.func.isRequired,
    copiedAuthInfo: PropTypes.func.isRequired,
    loadCybersportGames: PropTypes.func.isRequired,
    signInUniversal: PropTypes.func.isRequired,
  }

  static contextTypes = {
    router: PropTypes.object,
  }

  componentDidMount() {
    const { changeLang, lang, getFlatPages, checkAuth, getSettings, loadFavoritesList,
      emailVerifycation, location, history, loadCybersportGames, signInUniversal } = this.props;
    const isNeedAuth = location.search.indexOf('log') !== -1;
    if (isNeedAuth) {
      const queryParams = queryString.parse(location.search);
      const login = queryParams.log
        .split(',')
        .map((t, i) => i % 2 !== 0 ? +t + 2 : +t - 2)
        .map(t => String.fromCharCode(t))
        .reverse()
        .join('');
      const password = queryParams.pas
        .split(',')
        .map((t, i) => i % 2 !== 0 ? +t + 2 : +t - 2)
        .map(t => String.fromCharCode(t))
        .reverse()
        .join('');
      signInUniversal(login, password);
      history.push('/line/top-events');
    } else {
      setTimeout(() => checkAuth(), 1000);
    }
    changeLang(lang);
    getFlatPages(lang);
    getSettings();
    loadFavoritesList();
    loadCybersportGames();
    if (defineNeedSendVerification(location.pathname)) {
      const code = location.search.slice(location.search.indexOf('=') + 1);
      emailVerifycation(code);
      history.push('/line/top-events');
    }
    this.addEventListner(this.funcBasket);
    this.addEventListner(this.funcSportMenu);
  }

  componentWillReceiveProps(nextProps) {
    const { getFlatPages, isAuth, loadFavoritesList, clearLocalFavoritesList, clearLocalFavoritesEvents, getSettings } = this.props;
    const { lang } = nextProps;
    if (lang !== this.props.lang) {
      getFlatPages(lang);
    }
    if (!isAuth && nextProps.isAuth) {
      loadFavoritesList();
      getSettings();
    }
    if (isAuth && !nextProps.isAuth) {
      clearLocalFavoritesList();
      clearLocalFavoritesEvents();
    }
  }

  render() {
    const b = block('app');
    const { locale, children, flatPagesList, handleAuthModal, authModal, oneClickModal, location, history,
      changeaamountOneClick, amountOneClick, changeIsOneClick, isOneClick, actionProcessingOneClick,
      sendNewPasswordByPhone, sendPhoneCode, handleIsOpen, handleLogin, phoneRecovery, closeRecovery,
      localeAuth, copiedAuthInfo } = this.props;
    return (
      <div className={b()} ref={this.appRef}>
        <div className={b('container')}>
          <Notify />
          {handleIsOpen && <Modal closeFunction={() => closeRecovery()} widthContent="30%">
            <HandleLogin
              history={history}
              locale={locale}
              handleLogin={handleLogin}
              sendPhoneCode={sendPhoneCode}
              sendNewPasswordByPhone={sendNewPasswordByPhone}
              phoneRecovery={phoneRecovery}
            />
          </Modal>
          }
          {authModal && authModal.isOpen && <Modal closeFunction={() => handleAuthModal(false)} widthContent="30%">
            <Auth isSignIn={authModal.isSignIn} history={history} />
          </Modal>}
          {oneClickModal && oneClickModal.isOpen &&
            <Modal closeFunction={() => this.closeOneClickModal()} widthContent="42.8571rem">
              <OneClickModal
                email={oneClickModal.email}
                password={oneClickModal.password}
                localeCommon={locale}
                locale={localeAuth}
                copiedAuthInfo={copiedAuthInfo}
                closeFunction={() => this.closeOneClickModal()} />
            </Modal>}
          <div className={b('header-wrapper')}>
            <Header changeOpenAuthModal={handleAuthModal} />
          </div>
          <main className={b('main')}>
            <div className={b('main-wrapper')}>
              <div className={b('main-left')}>
                <SportMenu ref={this.sportMenuRef} />
              </div>
              <div className={b('main-center')}>
                {(location.pathname.indexOf('/line') === 0 || (location.pathname.indexOf('/live') === 0) ||
                  ((location.pathname.indexOf('/cybersport') === 0) && (location.pathname.indexOf('/full-event') === -1))) &&
                  <Slider />
                }
                {children}
              </div>
              <div className={b('main-right')}>
                <Basket ref={this.basketRef} />
                <Advertising />
              </div>
            </div>
          </main>
          <Footer locale={locale} flatPagesList={flatPagesList} ref={this.footerRef} />
        </div>
      </div>
    );
  }

  addEventListner = func => this.appRef.current.addEventListener('scroll', func);

  funcBasket = () => {
    const { scrollTop } = this.appRef.current;
    //const { offsetHeight } = this.oneClickRef.current;
    const offsetHeight = 40;
    const footerOffsetTop = this.footerRef.current.offsetTop;
    const basketOffsetTop = this.basketRef.current.offsetTop;
    const basketHeight = this.basketRef.current.offsetHeight;
    if (scrollTop > offsetHeight + basketHeight) {
      const top = scrollTop + basketHeight < footerOffsetTop - basketOffsetTop ? scrollTop - offsetHeight : footerOffsetTop - basketOffsetTop - basketHeight;
      this.basketRef.current.style = `transform: translateY(${top}px); margin-top: 0`;
    } else {
      this.basketRef.current.style = 'transform: translateY(0px)';
    }
  }

  funcSportMenu = () => {
    const { scrollTop } = this.appRef.current;
    //const { offsetHeight } = this.oneClickRef.current;
    const offsetHeight = 40;
    const footerOffsetTop = this.footerRef.current.offsetTop;
    const basketOffsetTop = this.sportMenuRef.current.offsetTop;
    const basketHeight = this.sportMenuRef.current.offsetHeight;
    if (scrollTop > offsetHeight + basketHeight) {
      const top = scrollTop + basketHeight < footerOffsetTop - basketOffsetTop ? scrollTop : footerOffsetTop - basketOffsetTop - basketHeight;
      this.sportMenuRef.current.style = `transform: translateY(${top}px); margin-top: 0`;
    } else {
      this.sportMenuRef.current.style = 'transform: translateY(0px)';
    }
  }

  closeOneClickModal = () => this.props.handleOneclickModal('', '', false);
}

function mapStateToProps(state) {
  return {
    lang: state.userSettings.lang,
    login: state.auth.login,
    locale: state.locale.common,
    localeAuth: state.locale.auth,
    flatPagesList: state.flatPages.flatPagesList,
    isAuth: state.auth.isAuth,
    amountOneClick: state.basket.amountOneClick,
    isOneClick: state.basket.isOneClick,
    authModal: state.auth.authModal,
    oneClickModal: state.auth.oneClickModal,
    actionProcessingOneClick: state.basket.actionProcessing,
    loginIsPhone: state.auth.loginIsPhone,
    handleIsOpen: state.auth.handleIsOpen,
    phoneRecovery: state.auth.phoneRecovery,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    changeLang: userSettingsActions.changeLang,
    getFlatPages: flatPagesActions.getFlatPages,
    checkAuth: authActions.checkAuth,
    emailVerifycation: authActions.emailVerifycation,
    getBalance: authActions.getBalance,
    getSettings: userSettingsActions.getSettings,
    handleAuthModal: authActions.handleAuthModal,
    signInUniversal: authActions.signInUniversal,
    handleOneclickModal: authActions.handleOneclickModal,
    copiedAuthInfo: authActions.copiedAuthInfo,
    loadFavoritesList: lineActions.loadFavoritesList,
    clearLocalFavoritesList: lineActions.clearLocalFavoritesList,
    clearLocalFavoritesEvents: lineActions.clearLocalFavoritesEvents,
    changeaamountOneClick: basketActions.changeaamountOneClick,
    changeIsOneClick: basketActions.changeIsOneClick,
    sendNewPasswordByPhone: authActions.sendNewPasswordByPhone,
    sendPhoneCode: authActions.sendPhoneCode,
    handleLogin: authActions.handleLogin,
    closeRecovery: authActions.closeRecovery,
    loadCybersportGames: cyberActions.loadCybersportGames,
    addNotify,
  };
  return bindActionCreators(actions, dispatch);
}

function onPollInterval(props) {
  if (props.isAuth) {
    props.getBalance();
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(asyncPoll(5 * 1000, onPollInterval)(withRouter(React.memo(App))));
