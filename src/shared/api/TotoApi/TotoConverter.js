import dayjs from 'dayjs';

class TotoConverter {
  convertTotoList = data => {
    let eventList;
    const name = data.name ? data.name : '';
    const { jackpot } = data;
    const totoID = data.id ? data.id : null;
    if (Object.keys(data).length > 1) {
      eventList = Object.keys(data.toto_bets).map(key => ({
        teams: this.convertorTeams(data.toto_bets[key]),
        ID: key,
        date: this.cotvertorEventDate(data.toto_bets[key].Date),
        sportName: data.toto_bets[key].SportName,
        tourneyName: data.toto_bets[key].TournamentName,
      }));
    } else {
      eventList = {
        jackpot: data.jackpot,
      };
    }
    return { eventList, name, totoID, jackpot };
  };

  convertUserTotoBets = data => {
    const eventList = data.map(bet => {
      const selectedIDs = bet.toto_result;
      const isOpen = false;
      const totoID = bet.toto_id;
      const ticketID = bet.id;
      const totoList = Object.keys(bet.toto_bets).map(key => ({
        teams: this.convertorTeams(bet.toto_bets[key]),
        ID: key,
        date: this.cotvertorEventDate(bet.toto_bets[key].Date),
        sportName: bet.toto_bets[key].SportName,
        tourneyName: bet.toto_bets[key].TournamentName,
      }));
      return { totoList, selectedIDs, isOpen, totoID, ticketID };
    });
    return eventList;
  }

  cotvertorEventDate = date =>
    dayjs(+date.substring(date.indexOf('(') + 1, date.indexOf(')'))).format('DD.MM.YYYY HH:mm');

  convertorTeams = event => `${event.NameTeam1} - ${event.NameTeam2}`
}

export default TotoConverter;
