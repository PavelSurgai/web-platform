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
import { actions as authActions } from 'features/auth';
import { actions as lineActions } from 'features/line';
import { actions as basketActions } from 'features/basket';

import { addNotify } from 'features/notify';
import { sideMenuItems } from 'shared/utils/sideMenu';
import { SlideOutModel } from 'shared/models/SlideOutModel';

import SubHeaderMenu from 'components/SubHeaderMenu';
import SlotsMenu from 'components/SlotsMenu';
import Spinner from 'components/Spinner/mobile';
import Notify from 'features/notify/mobile';
import SlideOut from 'components/SlideOut';
import Modal from 'components/Modal/mobile';
import SideMenu from 'components/SideMenu';
import Slider from 'features/slider/mobile';
import Header from 'components/Header/mobile';
import Footer from 'components/Footer/mobile';
import MainMobileMenu from 'components/MainMobileMenu';
import OneClickModal from 'features/auth/view/mobile/SignUp/OneClickRegistration/OneClickModal';

import { defineNeedSlider, defineNeedBasket, defineNeedSendVerification, defineNeedSlotsMenu } from '../data/forRouterFeatures';

import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.checkIterations = 0;
    this.scrollHeight = 0;
    this.appRef = React.createRef();
    this.sideRef = React.createRef();
    this.scrollRef = React.createRef();
    this.headerRef = React.createRef();
    this.menuRef = React.createRef();
  }

  state = {
    isMenuOpen: false,
  }

  static propTypes = {
    lang: PropTypes.string.isRequired,
    locale: PropTypes.object.isRequired,
    localeAuth: PropTypes.object.isRequired,
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
    isAuth: PropTypes.bool.isRequired,
    handleIsOpen: PropTypes.bool.isRequired,
    amountOneClick: PropTypes.number.isRequired,
    isOneClick: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    phoneRecovery: PropTypes.bool.isRequired,

    closeRecovery: PropTypes.func.isRequired,
    sendPhoneCode: PropTypes.func.isRequired,
    modalBasketIsOpen: PropTypes.bool.isRequired,

    emailVerifycation: PropTypes.func.isRequired,
    changeIsOneClick: PropTypes.func.isRequired,
    changeaamountOneClick: PropTypes.func.isRequired,
    getSettings: PropTypes.func.isRequired,
    checkAuth: PropTypes.func.isRequired,
    handleLogin: PropTypes.func.isRequired,
    getFlatPages: PropTypes.func.isRequired,
    changeLang: PropTypes.func.isRequired,
    loadFavoritesList: PropTypes.func.isRequired,
    clearLocalFavoritesList: PropTypes.func.isRequired,
    clearLocalFavoritesEvents: PropTypes.func.isRequired,
    sendNewPasswordByPhone: PropTypes.func.isRequired,
    basketBetsCount: PropTypes.number.isRequired,
    actionProcessing: PropTypes.bool.isRequired,
    handleOneclickModal: PropTypes.func.isRequired,
    copiedAuthInfo: PropTypes.func.isRequired,
    getIsActiveUseNameFromLocalStorage: PropTypes.func.isRequired,
    signInUniversal: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { getSettings, loadFavoritesList, getFlatPages, lang, getIsActiveUseNameFromLocalStorage,
      changeLang, emailVerifycation, location, history, checkAuth, signInUniversal } = this.props;
    const touchListener = new SlideOutModel(value => this.setState({ isMenuOpen: value }), this.appRef.current);
    touchListener.init();
    getIsActiveUseNameFromLocalStorage();
    changeLang(lang);
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
      setTimeout(() => checkAuth(() => this.redirectToRegistration()), 500);
    }
    getSettings();
    getFlatPages(lang);
    loadFavoritesList();
    if (defineNeedSendVerification(location.pathname)) {
      const code = location.search.slice(location.search.indexOf('=') + 1);
      emailVerifycation(code);
      history.push('/line/top-events');
    }
    this.checkTimeout = setInterval(this.checkHeight, 400);
  }

  componentWillReceiveProps(nextProps) {
    const { getFlatPages, isAuth, loadFavoritesList, clearLocalFavoritesList, clearLocalFavoritesEvents,
      getSettings } = this.props;
    const { lang, location } = nextProps;

    if (location.pathname !== this.props.location.pathname) {
      this._scrollToTop();
      this.checkIterations = 0;
    }

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
    const { basketBetsCount, locale, children, flatPagesList, location, history, sendNewPasswordByPhone,
      changeaamountOneClick, handleLogin, amountOneClick, changeIsOneClick, isOneClick, actionProcessing,
      sendPhoneCode, isAuth, handleIsOpen, closeRecovery, phoneRecovery, oneClickModal, handleOneclickModal, localeAuth,
      copiedAuthInfo, modalBasketIsOpen, changeMenuOpen } = this.props;
    const changeMenuState = value => {
      this.setState({ isMenuOpen: value });
    };
    const { isMenuOpen } = this.state;
    const subHeader = defineNeedSlotsMenu(location.pathname) ? <SlotsMenu /> : <SubHeaderMenu />;
    return (
      <React.Fragment>
        <SlideOut menu={<SideMenu menuItems={sideMenuItems} locale={locale} ref={this.sideRef} />}
          isOpen={isMenuOpen}
          closeFunction={() => this.setState({ isMenuOpen: false })}>
          <Header
            ref={this.headerRef}
            count={basketBetsCount}
            changeMenuOpen={this.changeMenuOpen}
            isCyber={(location.pathname.indexOf('/cybersport') === 0)}
            sub={subHeader}
          />
          <div className={b()} ref={this.appRef} id="app">
            <Notify />
            <Spinner isLoading={actionProcessing} />
            {oneClickModal && oneClickModal.isOpen &&
              <Modal closeFunction={() => handleOneclickModal('', '', false)} widthContent="100%" heightContent="100%">
                <OneClickModal
                  email={oneClickModal.email}
                  password={oneClickModal.password}
                  localeCommon={locale}
                  locale={localeAuth}
                  copiedAuthInfo={copiedAuthInfo}
                  closeFunction={() => this.closeOneClickModal()} />
              </Modal>}
            <div className={b('scroll-block')} ref={this.scrollRef} id="app-scroll">
              {defineNeedSlider(location.pathname) && <Slider />}
              {children}
              {/* <Footer locale={locale} flatPagesList={flatPagesList} /> */}
            </div>
          </div>
        </SlideOut>
        <MainMobileMenu
          ref={this.menuRef}
          isAuth={isAuth}
          locale={locale}
          isOneClick={isOneClick}
          count={basketBetsCount}
          amountOneClick={amountOneClick}
          changeIsOneClick={changeIsOneClick}
          changeaamountOneClick={changeaamountOneClick}
          isMenuOpen={this.state.isMenuOpen}
          sideMenuControl={changeMenuState} />
      </React.Fragment>
    );
  }

  checkHeight = () => {
    if (this.menuRef.current !== null && this.headerRef.current !== null &&
        this.scrollRef.current.scrollHeight !== this.scrollHeight) {
      const menuHeight = this.menuRef.current.clientHeight;
      const headerHeight = this.headerRef.current.clientHeight;
      if (this.scrollRef.current.scrollHeight + menuHeight + headerHeight <= window.innerHeight) {
        this.appRef.current.style.height = `calc(100% - ${menuHeight + headerHeight + 1}px)`;
        this.scrollRef.current.style.height = '100%';
      } else {
        this.appRef.current.style.height = null;
        this.scrollRef.current.style.height = null;
      }
      this.scrollHeight = this.scrollRef.current.scrollHeight;
    }
    
    // if (this.checkIterations < 100) {
    //   this.checkTimeout = setTimeout(this.checkHeight, 200);
    //   this.checkIterations += 1;
    // } else {
    //   this.checkIterations = 0;
    // }
  }

  redirectToRegistration = () => {
    // this.props.history.push('/auth/sign-up')
  }

  closeOneClickModal = () => this.props.handleOneclickModal('', '', false);

  _scrollToTop = () => {
    document.scrollingElement.scrollTop = 0;
  };

  changeMenuOpen = value => this.setState({ isMenuOpen: value });
}

function mapStateToProps(state) {
  return {
    lang: state.userSettings.lang,
    locale: state.locale.common,
    localeAuth: state.locale.auth,
    flatPagesList: state.flatPages.flatPagesList,
    isAuth: state.auth.isAuth,
    basketBetsCount: state.basket.bets.length,
    authModal: state.auth.authModal,
    isOneClick: state.basket.isOneClick,
    amountOneClick: state.basket.amountOneClick,
    actionProcessing: state.basket.actionProcessing,
    passwordIsChanged: state.auth.passwordIsChanged,
    loginIsPhone: state.auth.loginIsPhone,
    login: state.auth.login,
    handleIsOpen: state.auth.handleIsOpen,
    phoneRecovery: state.auth.phoneRecovery,

    modalBasketIsOpen: state.basket.modalBasketIsOpen,
    oneClickModal: state.auth.oneClickModal,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    changeLang: userSettingsActions.changeLang,
    getFlatPages: flatPagesActions.getFlatPages,
    checkAuth: authActions.checkAuth,
    emailVerifycation: authActions.emailVerifycation,
    signInUniversal: authActions.signInUniversal,
    getBalance: authActions.getBalance,
    handleOneclickModal: authActions.handleOneclickModal,
    copiedAuthInfo: authActions.copiedAuthInfo,
    getSettings: userSettingsActions.getSettings,
    sendNewPassword: authActions.sendNewPassword,
    loadFavoritesList: lineActions.loadFavoritesList,
    clearLocalFavoritesList: lineActions.clearLocalFavoritesList,
    clearLocalFavoritesEvents: lineActions.clearLocalFavoritesEvents,
    changeIsOneClick: basketActions.changeIsOneClick,
    changeaamountOneClick: basketActions.changeaamountOneClick,
    sendNewPasswordByPhone: authActions.sendNewPasswordByPhone,
    sendPhoneCode: authActions.sendPhoneCode,
    closeRecovery: authActions.closeRecovery,
    handleLogin: authActions.handleLogin,
    getIsActiveUseNameFromLocalStorage: userSettingsActions.getIsActiveUseNameFromLocalStorage,
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
