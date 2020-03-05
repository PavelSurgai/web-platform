import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';

import { languagesWithIcons } from 'shared/locale';

import BottomPopUp from 'components/BottomPopUp';
import PopUpButton from 'components/PopUpButton';

import './SetLanguage.scss';

const SetLanguage = ({ closeFunction, locale, lang, changeLang }) => {
  const b = block('set-language');
  const languages = Object.keys(languagesWithIcons).map(key => {
    const language = languagesWithIcons[key];
    const isActive = languagesWithIcons[lang].text === language.text;
    return (
      <li
        key={language.text}
        className={b('language', { active: isActive })}
        onClick={isActive ? null : () => {
          changeLang(language.lang);
          closeFunction();
        }}>
        <img className={b('icon')} src={language.icon} alt={language.text} />
        {language.text}
      </li>
    );
  });
  return (
    <BottomPopUp closeFunction={closeFunction}>
      <div className={b()}>
        <h4 className={b('title')}>{locale.chooseLang}</h4>
        <ul className={b('languages-list')}>{languages}</ul>
        <PopUpButton
          text={locale.cancel}
          onClick={closeFunction}
        />
      </div>
    </BottomPopUp>
  );
};

SetLanguage.propTypes = {
  locale: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired,
  closeFunction: PropTypes.func.isRequired,
  changeLang: PropTypes.func.isRequired,
};

export default SetLanguage;
