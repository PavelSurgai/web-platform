import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions as profileActions } from 'features/profile';
import Spinner from 'components/Spinner';
import { AdditionalInfo } from './AdditionalInfo';
import './UserInfo.scss';

class UserInfo extends React.Component {
  static propTypes = {
    locale: PropTypes.object.isRequired,
    updateInfoLoading: PropTypes.bool.isRequired,
    userInfoLoading: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    balance: PropTypes.number.isRequired,
    bonusBalance: PropTypes.number.isRequired,

    updateUserInfo: PropTypes.func.isRequired,
    getUserInfo: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.getUserInfo();
  }
  
  render() {
    const b = block('user-info');
    const { locale, user, userInfoLoading, updateUserInfo, updateInfoLoading, balance, bonusBalance } = this.props;
    const { id, currency, yandex, card, phone, numberDocument, address } = user;
    return (
      <div className={b()}>
        <Spinner isLoading={userInfoLoading || updateInfoLoading} />
        <section className={b('main')}>
          <h4 className={b('title')}>{locale.userInfo}</h4>
          <div className={b('info')}>

            <div className={b('item')}>
              <span className={b('item-title')}>{`${locale.accountNum}:`}</span>
              <div className={b('item-field')}>{id}</div>
            </div>

            <div className={b('item')}>
              <span className={b('item-title')}>{`${locale.balance}:`}</span>
              <div className={b('item-field', { balance: true })}>{`${balance} ${currency}`}</div>
            </div>

            <div className={b('item')}>
              <span className={b('item-title')}>{`${locale.bonusBalance}:`}</span>
              <div className={b('item-field', { balance: true })}>{`${bonusBalance || 0} ${currency}`}</div>
            </div>

            <div className={b('item')}>
              <span className={b('item-title')}>{`${locale.currency}:`}</span>
              <div className={b('item-field')}>{currency}</div>
            </div>

          </div>
        </section>
        <AdditionalInfo
          locale={locale}
          yandex={yandex}
          card={card}
          numberDocument={numberDocument}
          address={address}
          updateUserInfo={updateUserInfo}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    locale: state.locale.profile,
    user: state.profile.user,
    userInfoLoading: state.profile.userInfoLoading,
    updateInfoLoading: state.profile.updateInfoLoading,
    balance: state.auth.balance,
    bonusBalance: state.auth.bonusBalance,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    getUserInfo: profileActions.getUserInfo,
    updateUserInfo: profileActions.updateUserInfo,
  };
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
