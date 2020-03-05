import { getSportByPriorityID } from 'shared/utils/sports';
import { replaseSportName } from 'shared/utils/sports/sportNameForReplase';

export class SportMenuConverter {
  convertSports(data) {
    const convertedSports = data.map(sport => ({
      ID: sport.ID,
      Name: replaseSportName(sport.Name),
      priority: getSportByPriorityID(sport.ID),
    }));
    const sortedData = convertedSports.sort((a, b) => a.priority - b.priority);
    return sortedData;
  }

  convertCountries(data) {
    const convertedCountries = data.map(country => ({
      ID: country.ID,
      Name: country.Name,
      Count: country.Count,
    }));
    return convertedCountries;
  }
}
