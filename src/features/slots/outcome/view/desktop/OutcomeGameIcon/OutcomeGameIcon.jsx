import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './OutcomeGameIcon.scss';

class OutcomeGameIcon extends React.Component {
  state = {
    failed: false,
  }

  static propTypes = {
    locale: PropTypes.object.isRequired,
    img: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    gameId: PropTypes.string.isRequired,
    section: PropTypes.string.isRequired,
    isAuth: PropTypes.bool.isRequired,

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

  onIconClick = e => {
    const { isAuth, addNotify, locale } = this.props;
    if (!isAuth) {
      e.preventDefault();
      addNotify(locale.pleaseAuth);
    }
  }

  render() {
    const b = block('outcome-game-icon');
    const { description, gameId, section } = this.props;
    return this.state.failed ? null : (
      <Link
        className={b()}
        to={`/slots/${section}/${gameId}`}
        key={gameId}
        ref={el => { this.link = el; }}
        onClick={this.onIconClick}>
        <img
          className={b('img')}
          ref={el => { this.image = el; }}
          alt={description}
          onError={() => this.setState({ failed: true })} />
        <div className={b('description')}>{description}</div>
      </Link>
    );
  }
}

export default OutcomeGameIcon;