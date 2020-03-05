import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './InbetGameIcon.scss';

class InbetGameIcon extends React.Component {
  static propTypes = {
    img: PropTypes.string.isRequired,
    gameId: PropTypes.string.isRequired,
    section: PropTypes.string.isRequired,
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

  render() {
    const b = block('inbet-game-icon');
    const { gameId, section } = this.props;
    return (
      <Link className={b()} to={`/slots/${section}/${gameId}`} key={section + gameId}>
        <img className={b('img')} ref={ el => this.image = el } alt={gameId} />
      </Link>
    );
  }
}

export default InbetGameIcon;
