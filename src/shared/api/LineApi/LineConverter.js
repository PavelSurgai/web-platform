import dayjs from 'dayjs';
import convertOddToCurrentType from 'shared/models/OddsTypeModel';
import { isSportWithoutDraw } from 'shared/utils/sports/drawSports';
import { mainBetsLine } from '../../utils/mainBets';

class LineConverter {
  convertorLineTourneys = (tourneys, sportID) => tourneys.map(temp => ({
    ID: temp.Id, tourneyName: temp.Name, events: [], isOpen: true, sportID,
  }))

  convertEvent = (event, countryID) => ({
    ID: +event.EventKeys.ID,
    additionalBetsCount: +event.ExtraBetTypesCount,
    eventDate: this.convertorDate(event.Date),
    sportID: +event.EventKeys.SportID,
    sportName: event.SportName,
    tourneyID: +event.EventKeys.TurnirID,
    tourneyName: event.TourneyName,
    timestamp: this.converterTimestamp(event.Date),
    countryID,
    teams: this.convertorTeams(event),
    coefs: event.MainBets ? this.addAdditionalInfoToCoefs(this.convertorCoefs(event.MainBets), event, countryID) :
      this.addAdditionalInfoToCoefs([], event, countryID),
  });

  convertorLineEvents = (events, countryID) => {
    const convertedEvents = events[0].EventsHeaders.map(event => this.convertEvent(event, countryID));
    const sortedEvents = convertedEvents.sort((a, b) => a.timestamp - b.timestamp);
    const convertedDrawSportsEvents = this.convertDrawSportsEvents(sortedEvents);
    return convertedDrawSportsEvents;
  }

  convertDrawSportsEvents = events => {
    const convertedData = events
      .map(event => event && isSportWithoutDraw(event.sportID) ? this.replaceDrawCoef(event) : event);
    return convertedData;
  }

  replaceDrawCoef = event => {
    const eventCopy = event;
    eventCopy.coefs[2] = eventCopy.coefs[1];
    eventCopy.coefs[1] = null;
    return eventCopy;
  }

  addAdditionalInfoToTopCoefs = (coefs, event, countryID) => coefs.map(temp => {
    if (temp === null) return null;
    return ({
      ...temp,
      teams: this.convertorTeamsTop(event.TeamsGroup),
      sportName: event.SportName,
      tourneyName: event.TourneyName,
      countryID,
    });
  })

  addAdditionalInfoToCoefs = (coefs, event, countryID) => coefs.map(temp => {
    if (temp === null) return null;
    return ({
      ...temp,
      teams: this.convertorTeams(event),
      sportName: event.SportName,
      tourneyName: event.TourneyName,
      countryID,
    });
  })

  convertorDate = date => [
    dayjs(+date.substring(date.indexOf('(') + 1, date.indexOf(')'))).format('HH:mm'),
    dayjs(+date.substring(date.indexOf('(') + 1, date.indexOf(')'))).format('DD.MMMM.YYYY'),
  ]

  converterTimestamp = date => dayjs(+date.substring(date.indexOf('(') + 1, date.indexOf(')'))).unix()

  convertorTeamsTop = teams => teams.join(' - ')

  convertorTeamsFavorit = event => `${event.NameTeam1} - ${event.NameTeam2}`

  convertorTeams = event => `${event.HomeTeamName} - ${event.AwayTeamName}`

  convertorCoefs = coefs => this.filterCoefs(([].concat(...coefs.map(temp => temp.Rates))))

  filterCoefs = coefs => mainBetsLine.map(temp => {
    const coef = coefs.find(tempFinded => tempFinded.BetId === temp);
    return coef === undefined ? null : ({
      ID: this.flattenBasketInfo(coef.AddToBasket),
      longName: coef.NameLong,
      shortName: coef.NameShort,
      rate: convertOddToCurrentType(+((`${coef.Rate}`).split('').map(temp => temp === ',' ? '.' : temp).join(''))),
      betslipInfo: coef.AddToBasket,
      foraSize: coef.ForaSize,
      totalSize: coef.TotalSize,
    });
  })

  flattenBasketInfo(info) {
    const parts = info ? [info.eId, info.bId, info.fs, info.a1, info.a2] : [];
    return parts.map(part => part != null ? part : 'null').join('_');
  }

  convertorTop = events => this.convertorToSports(this.convertorTopEventsToTourneys(this.convertorTopEvents(events)));

  convertorToSports = tourneys => {
    const uniqueSports = tourneys.map(tempEvent => ({ ID: tempEvent.sportID, name: tempEvent.sportName })).filter((v, i, a) => a.map(t => t.ID).indexOf(v.ID) === i);
    return uniqueSports.map(tempSport => ({
      ...tempSport,
      tourneys: tourneys.filter(tempFilterEvent => tempFilterEvent.sportID === tempSport.ID),
      isOpen: true,
    }));
  }

  convertorTopEventsToTourneys = events => events
    // Формируем турниры
    .map(tempEvent => ({
      ID: tempEvent.tourneyID,
      tourneyName: tempEvent.tourneyName,
      sportName: tempEvent.sportName,
      sportID: tempEvent.sportID,
      events: [],
      isOpen: true,
    }))
    // Оставляем уникальные турниры
    .filter((v, i, a) => a.findIndex(temp => temp.ID === v.ID) === i)
    // Добавляем в турниры события
    .map(tempTourney => ({
      ...tempTourney,
      events: events
        .filter(tempEvent => tempEvent.tourneyID === tempTourney.ID)
        .sort((a, b) => a.timestamp - b.timestamp),
    }))

  convertorTopEvents = events => events.map(tempEvent => ({
    ID: +tempEvent.Id,
    additionalBetsCount: +tempEvent.MarketsCount,
    eventDate: this.convertorDate(tempEvent.Date),
    sportID: +tempEvent.SId,
    sportName: tempEvent.SportName,
    tourneyID: +tempEvent.TId,
    tourneyName: tempEvent.TournamentName,
    countryID: +tempEvent.CId,
    teams: this.convertorTeamsTop(tempEvent.TeamsGroup),
    coefs: this.addAdditionalInfoToTopCoefs(this.convertorCoefs(tempEvent.Markets), tempEvent, 1),
    timestamp: this.converterTimestamp(tempEvent.Date),
  }))

  convertFavoritesList = data => data.map(tempEvent => ({
    data: {
      eventDate: tempEvent.data.event_date,
      ID: tempEvent.data.event_id,
      name: tempEvent.data.event_name,
      type: tempEvent.data.type,
    },
    ID: tempEvent.id,
    isActive: tempEvent.is_active,
    user: tempEvent.user,
  }));

  favoritEventConvertor = event => event && ({
    ID: event.Id.ID,
    additionalBetsCount: event.Count,
    eventDate: this.convertorDate(event.Date),
    sportID: event.Id.SportID,
    sportName: event.SportName,
    tourneyID: event.Id.TurnirID,
    tourneyName: event.TournamentName,
    countryID: event.CountryId,
    teams: this.convertorTeamsFavorit(event),
    coefs: event.MainBets ? this.addAdditionalInfoToCoefs(this.convertorCoefs(event.MainBets), event, event.CountryId) :
      this.addAdditionalInfoToCoefs([], event, event.CountryId),
  })
}

export default LineConverter;
