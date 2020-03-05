import dayjs from 'dayjs';
import convertOddToCurrentType from 'shared/models/OddsTypeModel';
import convertCoefType from 'shared/models/CoefsTypeModel';
import { sortSportByPriority } from 'shared/utils/sports';
import { replaseSportName } from 'shared/utils/sports/sportNameForReplase';
import FullEventLiveConverter from '../FullEventApi/FullEventLiveConverter';
import { mainBetsLive } from '../../utils/mainBets';

import { statusTypes, LiveStatuses } from './LiveUtills';

class LiveConverter {
  constructor() {
    this.FullEventLiveConverter = new FullEventLiveConverter();
  }

  convertorLive = data => sortSportByPriority(this.convertorToSports(this.convertorEvents(data.LEvents)))

  convertorEvents = events => {
    const convertedEvents = events.map(tempEvent => this.convertorEvent(tempEvent));
    return convertedEvents;
  }

  convertorEvent = event => {
    const convertedEvent = {
      ID: +event.Id,
      additionalBetsCount: +event.CountRospis,
      tourneyID: +event.Description.TournamentId,
      sportID: +event.Description.SportId,
      sportName: replaseSportName(event.Description.SportName),
      tourneyName: event.Description.TName,
      comment: event.Description.Comment,
      countryID: event.Description.CountryId,
      servingTeam: event.Description.ServingTeam,
      teams: this.convertorTeams(event.Description),
      coefs: event.RospisGroups[0] ?
        this.addAdditionalInfoToCoefs(this.convertorCoefs(event.RospisGroups[0].Rates), event) :
        [null, null, null, null, null, null, null, null, null, null],
      score: this.convertorMainScore(event.Description.Score, event.Description.SportId),
      timesScore: this.convertorScoreTimes(event.Description.Score),
      time: this.FullEventLiveConverter.convertorTime(event.Description.MinMatch),
      statisticInfo: this.statisticConverter(event.Statistic),
      statistic: this.convertorStatistic(event.Statistic),
    };
    convertedEvent.typedCoefs = convertCoefType(convertedEvent.coefs);
    return convertedEvent;
  };

  convertorStatistic = statistic => {
    const statisticList = JSON.parse(statistic);
    const notEmptyKeys = Object
      .entries(statisticList)
      .filter(temp => temp[1].length > 0 && temp[0] !== 'serv')
      .map(temp => temp[0]);
    let statisticObject = {};
    notEmptyKeys.forEach(temp => { statisticObject[temp] = statisticList[temp]; });
    if (statisticObject.periods !== undefined) {
      statisticObject.periods.forEach((temp, index) => { statisticObject[index + 1] = temp; });
    }
    delete statisticObject.periods;
    const statisticArray = Object.entries(statisticObject).map(temp => ({ name: temp[0], value: temp[1] }));
    const sortedStatisticArray = statisticArray.filter(t => +t.name === +t.name && t.value.length === 2);

    return sortedStatisticArray;
  }

  sortSportByPriority = sports => sports.sort((a, b) => a.priority < b.priority)

  statisticConverter = statisticString => {
    const statisticArray = JSON.parse(statisticString);
    const reduceStatisticArray = Object.keys(statisticArray).reduce((newArray, temp) => {
      return (statisticArray[temp].length !== 0 && ['periods', 'score', 'curGame', 'fouls', 'serv'].findIndex(tempFind => tempFind === temp) === -1) ?
        [...newArray, { textID: temp, valueForFirstTeam: statisticArray[temp][0], valueForSecondTeam: statisticArray[temp][1] }] : newArray;
    }, []);
    return reduceStatisticArray;
  }

  addAdditionalInfoToCoefs = (coefs, event) => coefs.map(temp => {
    if (temp === null) return null;
    return ({
      ...temp,
      teams: this.convertorTeams(event.Description),
      sportName: event.Description.SportName,
      tourneyName: event.Description.TName,
      countryID: event.Description.CountryId,
    });
  })

  convertorToSports = tourneys => {
    const uniqueSports = tourneys.map(tempEvent => ({ ID: tempEvent.sportID, name: tempEvent.sportName })).filter((v, i, a) => a.map(t => t.ID).indexOf(v.ID) === i);
    return uniqueSports.map(tempSport => ({
      ...tempSport,
      tourneys: this.convertorToTourneys(tourneys.filter(tempFilterEvent => tempFilterEvent.sportID === tempSport.ID)),
      isOpen: true,
    }));
  }

  convertorToTourneys = events => {
    const uniqueTourneys = events.map(tempEvent => ({
      ID: tempEvent.tourneyID,
      name: tempEvent.tourneyName,
      sportID: tempEvent.sportID,
      sportName: tempEvent.sportName,
      countryID: tempEvent.countryID,
    })).filter((v, i, a) => a.map(t => t.ID).indexOf(v.ID) === i);
    return uniqueTourneys.map(tempTourney => ({
      ...tempTourney,
      events: events.filter(tempFilterEvent => tempFilterEvent.tourneyID === tempTourney.ID),
      isOpen: true,
    }));
  }

  saveOpenedSports = (oldSports, newSports) => newSports.map(tempNewSport => ({
    ...tempNewSport,
    isOpen: oldSports.find(tempOldSport => tempOldSport.ID === tempNewSport.ID) !== undefined ?
      oldSports.find(tempOldSport => tempOldSport.ID === tempNewSport.ID).isOpen : true,
    tourneys: oldSports.find(tempOldSport => tempOldSport.ID === tempNewSport.ID) !== undefined ?
      this.saveOpenedTourneys(oldSports.find(nempOldSport => nempOldSport.ID === tempNewSport.ID).tourneys, tempNewSport.tourneys) : tempNewSport.tourneys,
  }))

  saveOpenedTourneys = (oldTourney, newTourney) => newTourney.map(tempNewTourney => ({
    ...tempNewTourney,
    isOpen: oldTourney.find(tempOldTourney => tempOldTourney.ID === tempNewTourney.ID) !== undefined ?
      oldTourney.find(tempOldTourney => tempOldTourney.ID === tempNewTourney.ID).isOpen : true,
  }))

  convertorMainScore = (score, sportId) => {
    if (sportId === 3) return this.convertorTennisScore(score);
    return `${score} `.substring(0, `${score} `.indexOf(' '));
  }

  convertorTennisScore = score => {
    const tennisScore = score.match(/\(.*(\d:\d)\)/);
    return score.substring(0, score.indexOf('(') - 1);
  };

  convertorScoreTimes = score => `${score} `.substring(`${score} `.indexOf(' '))

  convertorTeams = description => `${description.NameTeam1} - ${description.NameTeam2}`

  convertorCoefs = coefs => this.filterCoefs(([].concat(...coefs.map(temp => temp.Rates))))

  filterCoefs = coefs => {
    const mainBets = mainBetsLive.map(temp => coefs.find(tempFinded => tempFinded.Id === temp));
    const handicaps = this.defineHandicapsAndTotals(coefs, '30_40', 'ForaSize');
    const totals = this.defineHandicapsAndTotals(coefs, '30_50', 'TotalSize');
    const result = [...mainBets, ...handicaps, ...totals].map(coef => coef === undefined ? null : ({
      ID: this.flattenBasketInfo(coef.AddToBasket),
      longName: coef.NameLong,
      shortName: coef.NameShort,
      rate: convertOddToCurrentType(+((` ${coef.Rate}`).split('').map(temp => temp === ',' ? '.' : temp).join(''))),
      betslipInfo: coef.AddToBasket,
      foraSize: coef.ForaSize,
      totalSize: coef.TotalSize,
    }));
    return result;
  }

  defineHandicapsAndTotals = (coefs, GroupID, nameSize) => {
    const needCoefs = coefs.filter(coef => coef.TID === GroupID);
    const UniqeForaSizeWithModule = needCoefs
      .filter((v, i, a) => a.findIndex(t => t[nameSize] === v[nameSize]) === i)
      .map(t => Math.abs(t[nameSize]))
      .filter((v, i, a) => a.findIndex(t => t === v) === i);
    const coefGroupsWithEqualForaSize = UniqeForaSizeWithModule.map(temp => needCoefs.filter(t => Math.abs(t[nameSize]) === temp)).filter(t => t.length === 2);
    let indexOfSmallestDifference = 0;
    coefGroupsWithEqualForaSize.forEach((temp, index) => {
      const tempDifference = Math.abs(+coefGroupsWithEqualForaSize[indexOfSmallestDifference][0].Rate.replace(',', '.') - +coefGroupsWithEqualForaSize[indexOfSmallestDifference][1].Rate.replace(',', '.'));
      if (+Math.abs(temp[0].Rate.replace(',', '.') - +temp[1].Rate.replace(',', '.')) < tempDifference) {
        indexOfSmallestDifference = index;
      }
    });
    return coefGroupsWithEqualForaSize[indexOfSmallestDifference] || [undefined, undefined];
  }


  flattenBasketInfo(info) {
    const parts = info ? [info.eId, info.bId, info.fs, info.a1, info.a2] : [];
    return parts.map(part => part != null ? part : 'null').join('_');
  }

  _flatternEvents(groups) {
    const flatternedTourneys = groups.reduce((res, group) => res.concat(group.tourneys), []);
    const flatternedEvents = flatternedTourneys.reduce((res, group) => res.concat(group.events), []);
    return flatternedEvents;
  }

  convertorTime = event => [1, 5, 6].findIndex(item => item === +event.Description.SportId) !== -1 ?
    event.Description.MinMatch.TotalMinutes !== -1 ? `${event.Description.MinMatch.TotalMinutes}'` : '' : ''

  updateAndConvertMultiLiveEvents = (newEvents, currentEvents, currentMulti) => ({
    sports: this.updateAndConvertLiveEvents(newEvents.LEvents, currentEvents),
    multiEvents: currentMulti.map(tempMultiEvent => this.FullEventLiveConverter.convertUpdateFullEvent(newEvents, tempMultiEvent)),
  })

  updateAndConvertLiveEvents(newEvents, currentEvents) {
    const currEvents = this._flatternEvents(currentEvents);

    const newLiveEvents = this._updateLiveEvent(currEvents, newEvents);

    const saveedOpenSports = this.saveOpenedSports(currentEvents, newLiveEvents);

    return saveedOpenSports;
  }

  _updateLiveEventGroups = (liveEvent, currEvents) => {
    return currEvents;
  }

  _updateLiveEvent = (currEvents, newEvents) => {
    const newLiveEvents = currEvents.map(tempCurrEvent => {
      const containEvent = newEvents.find(tempFinded => +tempFinded.Id === tempCurrEvent.ID);
      if (containEvent === undefined) return tempCurrEvent;

      const isRemove = containEvent.State === LiveStatuses.STATUS_REMOVE;
      if (isRemove) return null;

      const isUpdate = containEvent.State === LiveStatuses.STATUS_UPDATE;
      return isUpdate ? this.convertorUpdateEvent(containEvent, tempCurrEvent) : null;
    });

    const eventsWithoutRemoved = newLiveEvents.filter(t => t !== null);

    const addedEvents = newEvents.reduce((newArray, temp) => {
      return temp.State === LiveStatuses.STATUS_ADD ?
        [...newArray, this.convertorEvent(temp)] : newArray;
    }, eventsWithoutRemoved);


    return sortSportByPriority(this.convertorToSports(addedEvents));
  };

  convertorUpdateEvent = (event, oldEvent) => {
    const convertedUpdateEvent = {
      ...oldEvent,
      additionalBetsCount: event.CountRospis,
      score: this.convertorMainScore(event.Description.Score, event.Description.SportId),
      time: this.FullEventLiveConverter.convertorTime(event.Description.MinMatch),
      comment: event.Description.Comment,
      servingTeam: event.Description.ServingTeam,
      timesScore: this.convertorScoreTimes(event.Description.Score),
      coefs: this.convertorUpdateCoefs(event.Rates, oldEvent.coefs, oldEvent),
      statistic: this.convertorStatistic(event.Statistic),
    };
    convertedUpdateEvent.typedCoefs = convertCoefType(convertedUpdateEvent.coefs);
    return convertedUpdateEvent;
  };

  convertorUpdateCoefs = (coefs, oldCoefs, event) => {
    if (!coefs) return oldCoefs;
    if (!coefs.length) return oldCoefs;
    const newCoefs = this.addAdditionalInfoToUpdateCoefs(this.convertorCoefs(coefs), event);
    const updateCoefs = this.concatCoefs(newCoefs, oldCoefs);
    return updateCoefs;
  }

  addAdditionalInfoToUpdateCoefs = (coefs, event) => coefs.map(temp => {
    if (temp === null) return null;
    return ({
      ...temp,
      teams: event.teams,
      sportName: event.sportName,
      tourneyName: event.tourneyName,
      countryID: event.countryID,
    });
  })

  concatCoefs = (coefs, oldCoefs) => oldCoefs.map((tempOldCoef, index) => {
    if (!tempOldCoef) return coefs[index];

    if (!coefs[index]) return tempOldCoef;

    return {
      ...coefs[index], updateStatus: this.defineStatus(tempOldCoef, coefs[index]),
    };
  })

  defineStatus = (oldCoef, newCoef) => {
    if (oldCoef === undefined || newCoef.rate === oldCoef.rate) return statusTypes.DEFAULT;
    return newCoef.rate.decimal > oldCoef.rate.decimal ? statusTypes.INCREASE : statusTypes.REDUCED;
  }
}

export default LiveConverter;
