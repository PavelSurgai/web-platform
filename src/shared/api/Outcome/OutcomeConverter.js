import { getSections } from './OutcomeUtils';

class OutcomeConverter {
  convertGameList = data => {
    const convertedData = data.Games.map(item => {
      return {
        id: item.Id,
        description: item.Description,
        format: item.Format,
        name: item.Name,
        sectionId: item.SectionId,
        type: item.Type,
      };
    });
    return { 
      gameList: convertedData,
      sections: getSections(convertedData),
    };
  }

  convertSession = data => {
    return {
      sessionId: data.SessionId,
      sessionUrl: data.SessionUrl,
    };
  }
}

export default OutcomeConverter;
