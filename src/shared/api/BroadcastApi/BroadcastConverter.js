export class BroadcastConverter {
  convertSportsByEvents = events => {
    const convertedSports = events.reduce((sports, event) => {
      const sportIndex = sports.findIndex(sport => sport.name === event.sport);
      if (sportIndex === -1) {
        const sport = {
          name: event.sport,
          events: [event],
        };
        return [...sports, sport];
      }
      
      const sport = { ...sports[sportIndex], events: [...sports[sportIndex].events, event] };

      return [...sports.slice(0, sportIndex), sport, ...sports.slice(sportIndex + 1)];
    }, []);

    return convertedSports;
  }

  convertEventsFrames = events => {
    const convertedEvents = events.map(event => {
      const frames = Object.keys(event)
        .filter(key => key.includes('frameLink'))
        .map(key => event[key]);
      
      return { ...event, frames };
    });

    return convertedEvents;
  }
}