import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import SVGInline from 'react-svg-inline';

import arrow from '../../img/arrow.svg';

import './OutcomeGameIconFull.scss';

class OutcomeGameIconFull extends React.Component {
  static propTypes = {
    isAuth: PropTypes.bool.isRequired,
    img: PropTypes.string.isRequired,
    gameId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
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
    const { name, description, locale } = this.props;
    const b = block('outcome-game-icon-full');
    return (
      <div className={b()}>
        <div className={b('left-block')}>
          <img className={b('img')} ref={el => { this.image = el; }} alt="slot" />
          <div className={b('text')}>
            <span className={b('name')}>{name}</span>
            <span className={b('description')}>{description}</span>
          </div>
        </div>
        <div className={b('button')} onClick={this.onSlotClick}>
          <span className={b('button-text')}>{locale.play}</span>
          <SVGInline svg={arrow} className={b('arrow')} />
        </div>
      </div>
    );
  }
}

export default OutcomeGameIconFull;