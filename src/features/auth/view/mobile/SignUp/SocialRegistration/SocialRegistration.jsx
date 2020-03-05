import React from 'react';
import block from 'bem-cn';
import SVGInline from 'react-svg-inline';

import socialItems from '../../../../data/social';
import './SocialRegistration.scss';

const SocialRegistration = () => {
  const b = block('social-registration');
  const socialItemList = Object.values(socialItems).map(temp => (
    <SVGInline
      key={temp.route}
      svg={temp.img}
      className={b('item').toString()}
      onClick={() => window.open(`/api/user/login/${temp.route}`, '_self')} />
  ));
  return (
    <div className={b()}>
      {socialItemList}
    </div>
  );
};

export default SocialRegistration;
