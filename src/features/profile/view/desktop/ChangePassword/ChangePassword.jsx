import React, { useState } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions as profileActions } from 'features/profile';
import Input from 'components/Input/desktop';
import Button from 'components/Button/desktop';
import Spinner from 'components/Spinner';
import './ChangePassword.scss';

const ChangePassword = ({ locale, changePassword, changePasswordLoading }) => {
  const b = block('change-password');
  const [oldPassword, editOldPassword] = useState('');
  const [newPassword, editNewPassword] = useState('');
  const [repeatNewPassword, editRepeatNewPassword] = useState('');
  const onSubmit = e => {
    e.preventDefault();
    changePassword(oldPassword, newPassword, repeatNewPassword);
  };
  return (
    <section className={b()}>
      <Spinner isLoading={changePasswordLoading} />
      <h4 className={b('title')}>{locale.changePassword}</h4>
      <form className={b('form')} onSubmit={onSubmit}>
        <label className={b('item')}>
          <span className={b('item-title')}>{`${locale.enterOldPassword}:`}</span>
          <div className={b('item-field')}>
            <Input
              value={oldPassword}
              name="old-password"
              type="password"
              callBack={e => editOldPassword(e.currentTarget.value)}
            />
          </div>
        </label>

        <label className={b('item')}>
          <span className={b('item-title')}>{`${locale.enterNewPassword}:`}</span>
          <div className={b('item-field')}>
            <Input
              value={newPassword}
              name="new-password"
              type="password"
              callBack={e => editNewPassword(e.currentTarget.value)}
            />
          </div>
        </label>

        <label className={b('item')}>
          <span className={b('item-title')}>{`${locale.repeatNewPassword}:`}</span>
          <div className={b('item-field')}>
            <Input
              value={repeatNewPassword}
              name="repeat-new-password"
              type="password"
              callBack={e => editRepeatNewPassword(e.currentTarget.value)}
            />
          </div>
        </label>
        <div className={b('button')}>
          <Button
            type="submit"
            text={locale.save}
            size="low"
            color="green"
          />
        </div>
      </form>
    </section>
  );
};

ChangePassword.propTypes = {
  locale: PropTypes.object.isRequired,
  changePasswordLoading: PropTypes.bool.isRequired,

  changePassword: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    locale: state.locale.profile,
    changePasswordLoading: state.profile.changePasswordLoading,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    changePassword: profileActions.changePassword,
  };
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);