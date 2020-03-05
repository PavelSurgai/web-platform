import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import SVGInline from 'react-svg-inline';

import { NotifyModel } from 'services/models/NotifyModel';
import CrossSVG from '../img/cross.svg';

import { notificationImg } from '../type';

import './Notification.scss';

class Notification extends React.PureComponent {
  constructor(props) {
    super(props);
    this.notifyRef = React.createRef();
    this.state = {
      isDeleting: false,
      isDeleted: false,
    };
  }

  static propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    needClose: PropTypes.bool.isRequired,

    deleteNotify: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { needClose } = this.props;
    const touchListener = new NotifyModel(() => this._hideNotify(), this.notifyRef.current);
    touchListener.init();
    if (needClose) {
      setTimeout(this._hideNotify, 7000);
    }
  }

  render() {
    const b = block('notification');
    const { text, type } = this.props;
    return (
      <div className={b({ deleting: this.state.isDeleting })} ref={this.notifyRef}>
        <div className={b('wrapper', { type })}>
          <div className={b('noti')}>
            <SVGInline svg={notificationImg[type].img} className={b(`img-${notificationImg[type].type}`).toString()} />
          </div>
          <span className={b('text')}>{text}</span>
          <div className={b('left')}>
            <SVGInline
              className={b('cross').toString()}
              svg={CrossSVG}
              onClick={() => this._hideNotify()}
            />
          </div>
        </div>
      </div>
    );
  }

  _hideNotify = () => {
    const { deleteNotify, id } = this.props;
    if (!this.state.isDeleted) {
      this.setState({ isDeleting: true },
        () => setTimeout(() => {
          this.setState({ isDeleted: true });
          deleteNotify(id);
        }, 700));
    }
  }
}

export default Notification;
