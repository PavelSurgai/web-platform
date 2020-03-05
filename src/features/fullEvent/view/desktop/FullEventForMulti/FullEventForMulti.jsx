import React, { useState } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';

import Spinner from 'components/Spinner';
import FullEventForMultiHeader from './FullEventForMultiHeader';
import FullEventSubHeaderLive from '../FullEventSubHeaderLive/FullEventSubHeaderLive';
import FullEventSettings from './FullEventSettings/FullEventSettings';
import FullEventTable from '../FullEventTable/FullEventTable';
import './FullEventForMulti.scss';

const FullEventForMulti = ({ changeVisibleAllGroups, event, changeVisibleGroup, addToBasket, bets, removeEvent, oddType, fullEventProcessing }) => {
  const [tempEventID, onChangeTempEventID] = useState(`${event.coefGroups[0] ? event.coefGroups[0].value : ''}`);
  const [amountColumns, onChangeAmountColumns] = useState(1);
  const b = block('full-event-line');
  const selectedRates = bets.map(tempBet => tempBet.ID);
  const statisticList = event.coefGroups ?
    event.coefGroups.map(temp => ({ text: temp.text, value: temp.value })) : [];
  const coefGroup = (event.coefGroups && event.coefGroups.find(temp => temp.value === tempEventID)) ?
    event.coefGroups.find(temp => temp.value === tempEventID).betGroups : [];
  const openAllGroups = () => {
    const activeGroup = event.coefGroups.find(temp => temp.value === tempEventID);
    changeVisibleAllGroups(activeGroup.betGroups.find(temp => temp.isOpen === false) !== undefined);
  };
  const allCoefsGroupIsOpen = event.coefGroups && event.coefGroups.find(temp => temp.value === tempEventID)
    .betGroups.find(temp => temp.isOpen === false) !== undefined;
  return (
    <article className={b()}>
      {event.sportID ?
        (<React.Fragment>
          <FullEventForMultiHeader
            countryID={event.countryID}
            sportID={event.sportID}
            tourneyName={event.tourneyName}
            sportName={event.sportName}
            removeEvent={removeEvent} />
          <FullEventSubHeaderLive
            teams={event.teams}
            date={event.date}
            comment={event.comment}
            sportID={event.sportID}
            score={event.score}
            timesScore={event.timesScore}
            time={event.time} />
          <FullEventSettings
            amountColumns={amountColumns}
            changeAmountColumns={value => onChangeAmountColumns(value)}
            tempEventID={tempEventID}
            statisticList={statisticList}
            changeTempEventID={onChangeTempEventID}
            openAllGroups={openAllGroups} 
            allCoefsGroupIsOpen={allCoefsGroupIsOpen} />
          <FullEventTable
            amountColumns={1}
            oddType={oddType}
            coefGroups={coefGroup || []}
            changeVisibleGroup={(eventID, visible) => changeVisibleGroup(eventID, visible, tempEventID)}
            addToBasket={addToBasket}
            selectedRates={selectedRates} />
        </React.Fragment>) :
        <Spinner isLoading={fullEventProcessing} />}
    </article>
  );
};

FullEventForMulti.propTypes = {
  changeVisibleAllGroups: PropTypes.func.isRequired,
  changeVisibleGroup: PropTypes.func.isRequired,
  addToBasket: PropTypes.func.isRequired,
  removeEvent: PropTypes.func.isRequired,
  bets: PropTypes.array.isRequired,
  oddType: PropTypes.object.isRequired,

  event: PropTypes.shape({
    ID: PropTypes.number,
    coefGroups: PropTypes.array,
    data: PropTypes.string,
    sportID: PropTypes.number,
    teams: PropTypes.string,
    tourneyName: PropTypes.string,
  }).isRequired,
  fullEventProcessing: PropTypes.bool.isRequired,
};

export default FullEventForMulti;