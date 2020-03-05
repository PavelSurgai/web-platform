import React, { useState } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './AboutUsLayout.scss';

import BackBlock from 'components/BackBlock/mobile';
import Input from 'components/Input/mobile';

import licenseImg from '../../../img/license.jpg';

const AboutUsLayout = ({ locale }) => {
  const b = block('about-us-layout');
  const [state, changeState] = useState({
    name: '',
    tel: '',
    email: '',
    text: '',
  });
  const onChangeState = (e, name) => {
    changeState({ ...state, [name]: e.currentTarget.value });
  };
  return (
    <article className={b()}>
      <BackBlock>
        {locale.aboutUsTitle}
      </BackBlock>
      <section className={b('top')}>
        <h1 className={b('title')}>{locale.bkSevenBet}</h1>
      </section>
      <section className={b('info')}>
        <div className={b('paragraph')}>
          {locale.t1}
        </div>
        <div className={b('paragraph')}>
          {locale.t2}
        </div>
        <h1 className={b('title')}>{locale.sBIs}</h1>
        <div className={b('list')}>
          {locale.firstLi.map(li => <li className={b('li')}>{li}</li>)}
        </div>
        <div className={b('paragraph')}>
          {locale.t3}
        </div>
        <div className={b('paragraph')}>
          {locale.t4}
        </div>
        <div className={b('paragraph')}>
          {locale.t5}
        </div>
        <img className={b('image')} src={licenseImg} alt="license" />
        <div className={b('paragraph')}>
          {locale.t6}
        </div>
        <div className={b('list')}>
          {locale.secondLi.map(li => <li className={b('li')}>{li}</li>)}
        </div>
        <div className={b('paragraph')}>
          {locale.t7}
        </div>
        {/* <div className={b('paragraph')}>
          {locale.feedBack}
        </div>
        <form className={b('form')}>
          <div className={b('group')}>
            <div className={b('input-title')}>{locale.yourName}</div>
            <Input
              value={state.name}
              callBack={e => onChangeState(e, 'name')}
            />
          </div>
          <div className={b('group')}>
            <div className={b('input-title')}>{locale.tel}</div>
            <Input
              value={state.tel}
              callBack={e => onChangeState(e, 'tel')}
            />
          </div>
          <div className={b('group')}>
            <div className={b('input-title')}>{locale.email}</div>
            <Input
              value={state.email}
              callBack={e => onChangeState(e, 'email')}
            />
          </div>
          <div className={b('group')}>
            <div className={b('input-title')}>{locale.text}</div>
            <Input
              value={state.text}
              callBack={e => onChangeState(e, 'text')}
            />
          </div>
        </form> */}
      </section>
    </article>
  );
};

AboutUsLayout.propTypes = {
  locale: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    locale: state.locale.aboutUs,
  };
}

export default connect(mapStateToProps)(AboutUsLayout);