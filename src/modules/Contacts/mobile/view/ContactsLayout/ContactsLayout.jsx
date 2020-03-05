import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SVGInline from 'react-svg-inline';

import { bottomLinks as socials } from 'components/Footer/data';
import BackBlock from 'components/BackBlock/mobile';
import Button from 'components/Button/mobile';
import SpeechSVG from '../../../img/speech.svg';
import LogoPNG from '../../../img/logo.png';
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
    <React.Fragment>
      <BackBlock>
        <span>{locale.contacts}</span>
      </BackBlock>
      <article className={b()}>
        <img className={b('logo')} src={LogoPNG} alt="SevenBet" />
        <h1 className={b('title')}>{locale.bkSevenBet}</h1>
        <span className={b('text')}>{`${locale.feedbackPhone}:`}</span>
        <span className={b('phone')}>8-800-505-22-59</span>
        <span className={b('text')}>{`${locale.ourSocials}`}</span>
        <div className={b('socials')}>{socialItems}</div>
        
        <SVGInline className={b('speech').toString()} svg={SpeechSVG} />
        <div className={b('button')}>
          <Button
            text={locale.onlineChat}
            callBack={openJivo}
          />
        </div>
        <span className={b('text')}>{`${locale.support}:`}</span>
        <span className={b('text')}>support@pitch90bet.com</span>
        <span className={b('text')}>{`${locale.onСooperation}:`}</span>
        <span className={b('text')}>partners@pitch90bet.com</span>
      </article>
    </React.Fragment>
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