import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import SVGInline from 'react-svg-inline';

import CrossSVG from './img/cross.svg';
import './Notification.scss';

class Notification extends React.PureComponent {
  constructor(props) {
    super(props);
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
    if (needClose) {
      setTimeout(this._hideNotify, 8000);
    }
  }

  render() {
    const b = block('notification');
    const { text, type } = this.props;
    return (
      <div className={b({ deleting: this.state.isDeleting })}>
        <div className={b('wrapper', { type })}>
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
