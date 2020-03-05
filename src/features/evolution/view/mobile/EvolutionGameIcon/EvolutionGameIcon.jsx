import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './EvolutionGameIcon.scss';

class EvolutionGameIcon extends React.Component {
  static propTypes = {
    img: PropTypes.string.isRequired,
    gameId: PropTypes.string.isRequired,
    isAuth: PropTypes.bool.isRequired,
  }

  render() {
    const b = block('evolution-game-icon');
    const { gameId, isAuth, img } = this.props;
    const url = isAuth ? `/casinolive/evolution/${gameId}` : '/auth/sign-in';
    return (
      <Link className={b()} to={url} key={gameId}>
        <img className={b('img')} src={img} alt={gameId} />
      </Link>
    );
  }
}

export default EvolutionGameIcon;
