import React, { Fragment } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './EvolutionGameIcon.scss';

class EvolutionGameIcon extends React.Component {
  static propTypes = {
    img: PropTypes.string.isRequired,
    gameId: PropTypes.string.isRequired,
    isAuth: PropTypes.bool.isRequired,
    handleAuthModal: PropTypes.func.isRequired,
  }

  render() {
    const b = block('evolution-game-icon');
    const { gameId, isAuth, handleAuthModal, img } = this.props;
    return (
      <Fragment>
        {isAuth ?
          <Link className={b()} to={`/casinolive/evolution/${gameId}`} key={gameId}>
            <img className={b('img')} src={img} alt={gameId} />
          </Link> :
          <div className={b()} key={gameId} onClick={() => handleAuthModal(true)}>
            <img className={b('img')} src={img} alt={gameId} />
          </div>
        }
      </Fragment>
    );
  }
}

export default EvolutionGameIcon;
