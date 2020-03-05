import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import { menuItems } from 'shared/utils/menuItems';
import './MainMenu.scss';

const MainMenu = ({ locale, location }) => {
  const b = block('main-menu');
  const onTopUpClick = () => {
    const app = document.getElementsByClassName('app')[0];
    if (app.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      app.scrollBy(0, -30);
      setTimeout(onTopUpClick, 5);
    }
  };
  const items = menuItems.map(item => {
    const isActive = location.pathname.indexOf(item.link) !== -1;
    return (
      <li className={b('list-item', { active: isActive })} key={item.textIdent} onClick={() => onTopUpClick()}>
        <Link
          to={item.link}
          className={b('list-item-link', { active: isActive }).toString()}
        >
          {locale[item.textIdent]}
        </Link>
      </li>
    );
  });
  return (
    <nav className={b()}>
      <ul className={b('list')}>
        {items}
      </ul>
    </nav>
  );
};

MainMenu.propTypes = {
  locale: PropTypes.object,
  location: PropTypes.object.isRequired,
};

export default withRouter(React.memo(MainMenu));