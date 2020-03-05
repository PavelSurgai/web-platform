import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SVGInline from 'react-svg-inline';

import { actions as profileActions } from 'features/profile';
import BackBlock from 'components/BackBlock/mobile';
import Spinner from 'components/Spinner';
import Input from 'components/Input/mobile';
import Button from 'components/Button/mobile';
import { infoItems, stateItems } from './data/infoItems';
import './AdditionalInfo.scss';

class AdditionalInfo extends React.Component {
  state = stateItems;

  static propTypes = {
    locale: PropTypes.object.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    numberDocument: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,

    getUserInfo: PropTypes.func.isRequired,
    updateUserInfo: PropTypes.func.isRequired,
  }
  
  componentDidMount() {
    const { getUserInfo } = this.props;
    getUserInfo();
  }

  componentWillReceiveProps(nextProps) {
    const { firstName, lastName, numberDocument, phone } = this.state;
    if (nextProps.firstName !== firstName || nextProps.lastName !== lastName ||
    nextProps.numberDocument !== numberDocument || nextProps.phone !== phone) {
      this.setState({
        firstName: nextProps.firstName,
        lastName: nextProps.lastName,
        numberDocument: nextProps.numberDocument,
        phone: nextProps.phone,
      });
    }
  }

  onInputChange = e => this.setState({ [e.currentTarget.name]: e.currentTarget.value });

  render() {
    const b = block('additional-info');
    const { locale, updateUserInfo, isLoading } = this.props;
    const items = infoItems.map(temp => (
      <label className={b('item')} key={temp.id}>
        <SVGInline svg={temp.image} className={b('image')} />
        <div className={b('column')}>
          <span className={b('item-title')}>{`${locale[temp.id]}:`}</span>
          <div className={b('item-field')}>
            <Input value={this.state[temp.id]} name={temp.id} callBack={this.onInputChange} />
          </div>
        </div>
      </label>
    ));
    return (
      <React.Fragment>
        <BackBlock>
          <span>{locale.additionalInfo}</span>
        </BackBlock>
        <form
          className={b('info')}
          onSubmit={e => {
            e.preventDefault();
            updateUserInfo(this.state);
          }}
        >
          <Spinner isLoading={isLoading} />
          {items}
          
          <div className={b('stub')} />

          <div className={b('button')}>
            <Button
              type="submit"
              text={locale.save}
              size="low"
              color="dark-blue"
            />
          </div>
        </form>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    phone: state.profile.user.phone,
    firstName: state.profile.user.firstName,
    numberDocument: state.profile.user.numberDocument,
    lastName: state.profile.user.lastName,
    isLoading: state.profile.userInfoLoading,
    locale: state.locale.profile,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    getUserInfo: profileActions.getUserInfo,
    updateUserInfo: profileActions.updateUserInfo,
  };
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AdditionalInfo);
