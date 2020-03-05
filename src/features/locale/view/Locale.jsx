import React, { useMemo, useState } from 'react';
import block from 'bem-cn';
import { useSelector, useDispatch } from 'react-redux'
import SVGInline from 'react-svg-inline';

import { languagesWithIcons } from 'services/locale';
import { actions } from '../redux';
import ok from './img/ok.svg';

import './Locale.scss';

const Locale = () => {
  const b = block('locale');
  const locale = useSelector(state => state.locale.locale);
  const lang = useSelector(state => state.locale.lang);
  const [activeLang, changeActivelang] = useState(lang);
  const dispatch = useDispatch();
  const langItems = useMemo(() => Object.entries(languagesWithIcons).map(temp => <div
    key={temp[0]}
    className={b('item', { active: activeLang === temp[0] })}
    onClick={() => changeActivelang(temp[0])}>
    <img src={temp[1].icon} alt="" className={b('image')} />
    {temp[1].text}
  </div>), [lang, b, dispatch, activeLang]);

  return <section className={b()}>
    <div className={b('title')}>{locale.languageSelection}</div>
    {langItems}
    <div className={b('bottom')}>
      <div className={b('button')} onClick={() => dispatch(actions.changeLang(activeLang))}>
        {locale.changeLang}
        <SVGInline svg={ok} className={b('ok').toString()} />
      </div>
    </div>
  </section>
}

export default Locale;
