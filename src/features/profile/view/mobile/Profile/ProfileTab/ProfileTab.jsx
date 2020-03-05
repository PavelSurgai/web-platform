import React, { useCallback } from 'react';
import block from 'bem-cn';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import SVGInline from 'react-svg-inline';
import { Link } from 'react-router-dom';

import './ProfileTab.scss';

const ProfileTab = ({ item, locale }) => {
  const b = block('profile-tab');
  const dispatch = useDispatch();
  const callBack = useCallback(() => {
    if (item.callBack) dispatch(item.callBack());
  }, [item, dispatch]);
  return (
    <Link className={b()} to={item.link || '#'} onClick={callBack}>
      <div className={b('left')}>
        <div className={b('header')}>{locale[item.textIdent]}</div>
        <div className={b('description')}>{locale[item.additionalText]}</div>
      </div>
      <div className={b('right')}>
        {item.icon && <SVGInline svg={item.icon} className={b('icon').toString()} />}
      </div>
    </Link>
  );
};

ProfileTab.propTypes = {
  item: PropTypes.object.isRequired,
  locale: PropTypes.object.isRequired,
};

export default ProfileTab;