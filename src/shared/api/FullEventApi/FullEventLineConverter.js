import dayjs from 'dayjs';
import convertOddToCurrentType from 'shared/models/OddsTypeModel';
import { sortCoefGroups } from './FullEventUtils';

class FullEventLineConverter {
  convertFullEvent = event => ({
    ID: +event.Id.ID,
    tourneyID: +event.Id.TurnirID,
    sportID: +event.Id.SportID,
    sportName: event.SportName,
    tourneyName: event.TournamentName,
    teams: this.convertorTeams(event),
    date: this.cotvertorEventDate(event.Date),
    countryID: +event.CountryId,
    coefGroups: this.addAdditionalInfoToCoefs(this.convertorGroups(event.Groups), event),
    teamIdFirst: event.Team1Id,
    teamIdSecond: event.Team2Id,
  })

  addAdditionalInfoToCoefs = (groups, event) => groups.map(tempGroup => ({
    ...tempGroup,
    betGroups: tempGroup.betGroups.map(tempBetGroup => ({
      ...tempBetGroup,
      coefs: tempBetGroup.coefs.map(tempCoefs => tempCoefs.map(tempCoef => ({
        ...tempCoef,
        teams: this.convertorTeams(event),
        sportName: event.SportName,
        tourneyName: event.TournamentName,
        countryID: +event.CountryId,
      }))),
    })),
  }))

  convertorTeams = event => `${event.NameTeam1} - ${event.NameTeam2}`

  cotvertorEventDate = date => [
    dayjs(+date.substring(date.indexOf('(') + 1, date.indexOf(')'))).format('HH:mm'),
    dayjs(+date.substring(date.indexOf('(') + 1, date.indexOf(')'))).format('DD.MM.YYYY'),
  ]

  convertorGroups = groups => groups.map(temp => ({
    text: temp.Name,
    value: temp.GroupId + temp.Name,
    isEnabled: temp.IsEnabled,
    betGroups: this.sorterCoefGroups(this.convertorbetGroups(temp.Bets)),
  }))

  sorterCoefGroups = groups => {
    const mainGroups = sortCoefGroups.reduce((newArray, temp) => groups.find(tempFinded => tempFinded.ID === temp) !== undefined ?
      [...newArray, groups.find(tempFinded => tempFinded.ID === temp)] : newArray, []);
    const otherGroups = groups.filter(temp => sortCoefGroups.findIndex(tempFinded => tempFinded === temp.ID) === -1);
    return [...mainGroups, ...otherGroups];
  };

  convertorbetGroups = groups => groups.map(temp => ({
    ID: temp.Id,
    name: temp.Caption,
    isOpen: true,
    coefs: this.groupCoefsInsideGroup(temp.Rates),
  }))

  groupCoefsInsideGroup = coefs => {
    if (coefs.length <= 3) return [coefs.map(temp => this.convertCoefInfo(temp))];
    const convertedCoefs = [];
    for (let i = 0; i < coefs.length; i += 2) {
      const newGroup = [this.convertCoefInfo(coefs[i])];
      if (coefs[i + 1]) newGroup.push(this.convertCoefInfo(coefs[i + 1]));
      convertedCoefs.push(newGroup);
    }
    return convertedCoefs;
  }

  convertCoefInfo = coef => ({
    betslipInfo: coef.AddToBasket,
    ID: this.flattenBasketInfo(coef.AddToBasket),
    rate: convertOddToCurrentType(+((` ${coef.Rate}`).split('').map(temp => temp === ',' ? '.' : temp).join(''))),
    shortName: coef.NameShort,
    longName: coef.NameLong,
    foraSize: coef.ForaSize,
    totalSize: coef.TotalSize,
  })

  flattenBasketInfo(info) {
    const parts = info ? [info.eId, info.bId, info.fs, info.a1, info.a2] : [];
    return parts.map(part => part != null ? part : 'null').join('_');
  }
}

export default FullEventLineConverter;