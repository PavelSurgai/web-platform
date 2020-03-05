import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SVGInline from 'react-svg-inline';

import { bottomLinks as socials } from 'components/Footer/data';
import Button from 'components/Button/desktop';
import SpeechSVG from '../../../img/speech.svg';
import './ContactsLayout.scss';

const ContactsLayout = ({ locale }) => {
  const b = block('contacts-layout');
  
  const openJivo = () => window.jivo_api.open();

  const socialItems = socials.map(item => (
    <li className={b('social-item')} key={item.id}>
      <a className={b('social-item-link')} href={item.link}>
        <SVGInline className={b('social-item-icon').toString()} svg={item.icon} />
      </a>
    </li>
  ));

  return (
    <article className={b()}>
      {/* <div className={b('header')}>
        <h4 className={b('header-text')}>{locale.contacts}</h4>
      </div>
      <section className={b('top')}>
        <div className={b('logo')} />
        <h1 className={b('title')}>{locale.bkSevenBet}</h1>
      </section>
      <section className={b('info')}>
        <div className={b('info-left')}>
          <span className={b('info-text')}>{`${locale.feedbackPhone}:`}</span>
          <span className={b('info-phone')}>8-800-505-22-59</span>
        </div>

        <div className={b('info-right')}>
          <span className={b('info-text')}>{`${locale.ourSocials}:`}</span>
          <div className={b('socials')}>{socialItems}</div>
        </div>
      </section>
      <section className={b('info')}>
        <div className={b('info-left')}>
          <span className={b('info-text')}>{`${locale.support}:`}</span>
          <span className={b('info-text')}>support@pitch90bet.com</span>
          <span className={b('info-text')}>{`${locale.onСooperation}:`}</span>
          <span className={b('info-text')}>partners@pitch90bet.com</span>
        </div>

        <div className={b('info-right')}>
          <SVGInline className={b('info-speech').toString()} svg={SpeechSVG} />
          <div className={b('info-button')}>
            <Button
              text={locale.onlineChat}
              callBack={openJivo}
            />
          </div>
        </div>
      </section> */}
    </article>
  );
};

ContactsLayout.propTypes = {
  locale: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    locale: state.locale.common,
  };
}

export default connect(mapStateToProps)(ContactsLayout);