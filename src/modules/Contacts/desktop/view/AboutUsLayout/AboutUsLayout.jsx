import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './AboutUsLayout.scss';

const AboutUsLayout = ({ locale }) => {
  const b = block('about-us-layout');
  return (
    <article className={b()}>
      <div className={b('header')}>
        <h4 className={b('header-text')}>{locale.aboutUsTitle}</h4>
      </div>
      <section className={b('top')}>
        <div className={b('logo')} />
        <h1 className={b('title')}>{locale.bkSevenBet}</h1>
      </section>
      <section className={b('info')} dangerouslySetInnerHTML={{ __html: locale.aboutUsText }} />
    </article>
  );
};

AboutUsLayout.propTypes = {
  locale: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    locale: state.locale.common,
  };
}

export default connect(mapStateToProps)(AboutUsLayout);