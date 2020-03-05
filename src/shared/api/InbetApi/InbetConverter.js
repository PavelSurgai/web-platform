class InbetConverter {
  convertGameList = (gameList) => {
    const sections = [];
    const games = [];
    for (const game in gameList.applications) {
      const item = gameList.applications[game];
      if (item.html5) {
        if (item.loader !== 'loader') item.source = item.loader;
        games.push(item);
        if (sections.indexOf(item.type) === -1 && item.type !== 'utils') {
          sections.push(item.type);
        }
      }
    }
    
    return {
      gameList: games,
      sections,
    };
  }

  convertSession = (session) => {
    return session.session;
  }
}

export default InbetConverter;