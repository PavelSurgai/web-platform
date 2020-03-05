import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import SVGInline from 'react-svg-inline';

import { languagesWithIcons } from 'shared/locale';
import ArrowSVG from './img/arrow.svg';
import './SetLanguage.scss';

class SetLanguage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  static propTypes = {
    lang: PropTypes.string.isRequired,
    changeLang: PropTypes.func.isRequired,
  }

  render() {
    const b = block('set-language');
    const { lang, changeLang } = this.props;
    const items = Object.values(languagesWithIcons).map(item => {
      const isCurent = lang === item.lang;
      return isCurent ? '' : <img
        className={b('item')}
        key={item.lang}
        src={item.icon}
        onClick={() => changeLang(item.lang)}
        alt={item.text}
      />;
    });
    return (
      <div
        className={b({ open: this.state.isOpen })}
        onClick={() => this.setState({ isOpen: !this.state.isOpen })}
      >
        <div className={b('top')}>
          <img className={b('item')} src={languagesWithIcons[lang].icon} alt={languagesWithIcons[lang].text} />
          <SVGInline className={b('arrow').toString()} svg={ArrowSVG} />
        </div>
        <div className={b('items')}>
          {items}
        </div>
      </div>
    );
  }
}

export default SetLanguage;