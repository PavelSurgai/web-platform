import React from 'react';
import Proptypes from 'prop-types';
import block from 'bem-cn';
import SVGInline from 'react-svg-inline';

import Button from 'components/Button/mobile';
import BackBlock from 'components/BackBlock/mobile';
import sadSmile from '../../img/sad-smile.svg';

import './FullEventEmpty.scss';

const FullEventEmpty = ({ locale, b = block('full-event-empty') }) =>
  <React.Fragment>
    <BackBlock>
      {locale.back}
    </BackBlock>
    <section className={b()}>
      <SVGInline svg={sadSmile} className={b('image')} />
      <div className={b('end-text')}>
        {locale.endText}
      </div>
      <div className={b('info-text')}>
        {locale.infotext}
      </div>
      <div className={b('button')}>
        <Button
          text={locale.openResult}
          link="/results"
          size="low" />
      </div>
      <div className={b('button')}>
        <Button
          text={locale.toMain}
          link="/main"
          color="dark-blue"
          size="low" />
      </div>
    </section>
  </React.Fragment>;

FullEventEmpty.propTypes = {
  locale: Proptypes.object.isRequired,
  b: Proptypes.func,
}

export default FullEventEmpty;