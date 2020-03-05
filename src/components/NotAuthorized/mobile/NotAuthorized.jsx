import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import SVGInline from 'react-svg-inline';
import Button from 'components/Button/mobile';

import sad from '../img/sad.svg';
import './NotAuthorized.scss';

const NotAutorized = ({ locale }) => {
  const b = block('not-autorized');
  return (
    <article className={b()}>
      <div className={b('smile')}>
        <SVGInline svg={sad} className={b('sad-smile')} />
      </div>
      <div className={b('sad-text-auth')}>{locale.youNotAuth}</div>
      <div className={b('sad-text')}>{locale.pleaseAuth}</div>
      <div className={b('buttons')}>
        <div className={b('button')}>
          <Button
            text={locale.reg}
            link="/auth/sign-up"
          />
        </div>
        <div className={b('button')}>
          <Button
            text={locale.auth}
            color={'gray'}
            link="/auth/sign-in"
          />
        </div>
      </div>
    </article>
  );
};

NotAutorized.propTypes = {
  locale: PropTypes.object.isRequired,
};

export default NotAutorized;