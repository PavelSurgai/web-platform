import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import { useSelector } from 'react-redux';
import { shortLanguages } from 'shared/locale';

import './MapAttack.scss';

import { mapAttackIds } from 'features/fullEvent/data/mapAttackIds';

const MapAttack = ({ isOpenMapAttack, mapId, mapSportId }) => {
  const b = block('map-attack');
  const newMapSportId = mapAttackIds[mapSportId] ? mapAttackIds[mapSportId] : mapSportId;
  const lang = useSelector(state => state.userSettings.lang);
  const frameLang = shortLanguages[lang];
  const mapAttackUrl = `https://map-attack.com/Home%20Page.html?matchId=${mapId}&lang=${frameLang}&provider=2&sportId=${newMapSportId}`;
  return (
    <div className={b('map-attack-wrapper', { opened: isOpenMapAttack })}>
      <iframe
        title="map-attack"
        frameBorder="0"
        scrolling="no"
        src={mapAttackUrl}
        onLoad={() => console.log('loaded')}
        onError={() => console.log('onError')}
      />
    </div>
  );
};

MapAttack.propTypes = {
  isOpenMapAttack: PropTypes.bool.isRequired,
  mapId: PropTypes.string.isRequired,
  mapSportId: PropTypes.number.isRequired,
};

export default MapAttack;