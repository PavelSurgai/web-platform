import React, { useState } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import SVGInline from 'react-svg-inline';

import TotoItem from '../TotoItem';

import arrowSVG from '../../img/arrow.svg';

import './TotoTicket.scss';

const TotoTicket = ({ ticketItem, locale, hideTotoTicket }) => {
  const b = block('toto-ticket');
  const { totoID, ticketID, isOpen } = ticketItem;
  const totoItems = ticketItem.totoList.map(
    (totoItem, index) =>
      <TotoItem
        key={index}
        item={totoItem}
        selectedRates={ticketItem.selectedIDs}
        callBack={() => {}}
    />,
  ); 
  return (
    <div className={b().toString()}>
      <div className={b('header', { closed: !isOpen }).toString()} onClick={() => hideTotoTicket(ticketID, isOpen)}>
        <div className={b('information-container')}>
          <div className={b('edition')}>{`${locale.edition}: ${totoID}`}</div>
          <div className={b('ticket-number')}>{`${locale.ticket}: ${ticketID}`}</div>
        </div>
        <div className={b('arrow-container', { closed: !isOpen })}>
          <SVGInline className={b('arrow')} svg={arrowSVG} />
        </div>
      </div>
      <div className={b('bets-container', { closed: !isOpen })}>
        {isOpen && totoItems}
      </div>
    </div>
  );
};

TotoTicket.propTypes = {
  ticketItem: PropTypes.object.isRequired,
  locale: PropTypes.object.isRequired,

  hideTotoTicket: PropTypes.func.isRequired,
};

export default TotoTicket;