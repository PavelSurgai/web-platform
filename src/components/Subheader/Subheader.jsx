import React, { useEffect } from 'react';
import block from 'bem-cn';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import SVGInline from 'react-svg-inline';

import home from './img/home.svg';

import './Subheader.scss';

const Subheader = ({ getBalance, user }) => {
  const b = block('subheader');
  const dispatch = useDispatch();
  useEffect(() => {
    const value = setInterval(() => dispatch(getBalance()), 3000);
    return () => {
      clearInterval(value);
    }
  }, [])

  return <article className={b()}>
    {`${user.name}: ${user.balance} ${user.currency}`}
    <Link to='/' className={b('home')}>
      <SVGInline svg={home} className={'image'} />
    </Link>
  </article>
}

export default Subheader;
