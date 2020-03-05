import React from 'react';
import ReactDOM from 'react-dom';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as notifyActions } from '../../redux';

import Notification from './Notification';
import './Notify.scss';

class Notify extends React.PureComponent {
  static propTypes = {
    notifications: PropTypes.array.isRequired,
    
    deleteNotify: PropTypes.func.isRequired,
  }

  render() {
    const b = block('notify');
    const { notifications, deleteNotify } = this.props;
    const items = notifications.map(item => (
      <Notification
        text={item.text}
        type={item.type}
        deleteNotify={deleteNotify}
        id={item.id}
        key={item.id}
        needClose={item.needClose}
      />
    ));
    return ReactDOM.createPortal(
      items,
      document.getElementById('notify-root'),
    );
  }
}

function mapStateToProps(state) {
  return {
    notifications: state.notify.notifications,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    deleteNotify: notifyActions.deleteNotify,
  };
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Notify);