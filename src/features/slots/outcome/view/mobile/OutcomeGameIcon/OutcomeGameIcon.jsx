import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';

import './OutcomeGameIcon.scss';

class OutcomeGameIcon extends React.Component {
  static propTypes = {
    isAuth: PropTypes.bool.isRequired,
    img: PropTypes.string.isRequired,
    gameId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    locale: PropTypes.object.isRequired,

    loadSession: PropTypes.func.isRequired,
    addNotify: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const { isIntersecting } = entry;
        if (isIntersecting) {
          this.image.src = this.props.img;
          this.observer = this.observer.disconnect();
        }
      });
    });
    this.observer.observe(this.image);
  }

  onSlotClick = e => {
    const { loadSession, gameId, isAuth, addNotify, locale } = this.props;
    if (isAuth) {
      loadSession(gameId);
    } else {
      e.preventDefault();
      addNotify(locale.pleaseAuth);
    }
  }

  render() {
    const b = block('outcome-game-icon');
    const { name } = this.props;
    return (
      <div className={b()} onClick={this.onSlotClick}>
        <img className={b('img')} ref={el => { this.image = el; }} alt="slot" />
        <div className={b('name')}>{name}</div>
      </div>
    );
  }
}

export default OutcomeGameIcon;