import dayjs from 'dayjs';

export class ResultsConverter {
  convertSports(data) {
    const convertedData = data.map(item => ({
      value: item.Id,
      name: item.Name,
    }));
    return convertedData;
  }

  convertTournaments(data) {
    let convertedData = [];
    data.forEach(country => {
      convertedData.push({ value: `country${country.ID}`, name: country.Name, countryID: country.ID });
      country.Child.forEach(tournament => convertedData.push({ value: `tournament${tournament.ID}`, name: tournament.Name }));
    });
    return convertedData;
  }

  convertResults = data => {
    let convertedData = {};
    data.forEach(tourney => {
      const tourneyID = tourney.TournamentId;
      const event = tourney.DateInfos[0].Events[0];
      convertedData[tourneyID] = {
        name: tourney.Name,
        sportID: tourney.SportId,
        ID: tourneyID,
        countryID: tourney.countryID,
        events: convertedData[tourneyID] ? [...convertedData[tourneyID].events, this.convertEvent(event)] : [this.convertEvent(event)],
      };
    });
    return convertedData;
  }

  convertEvent(data) {
    const convertedData = {
      date: dayjs(+(data.Date.match(/\d/g).join(''))).format('DD.MM.YYYY'),
      time: dayjs((+(data.Date.match(/\d/g).join('')))).format('HH:mm'),
      ID: data.ID,
      teamName1: data.NameTeam1,
      teamName2: data.NameTeam2,
      score: data.Score,
    };
    return convertedData;
  }
}