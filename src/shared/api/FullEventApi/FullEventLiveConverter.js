import dayjs from 'dayjs';
import convertOddToCurrentType from 'shared/models/OddsTypeModel';
import { statusTypes, LiveStatuses, sortCoefGroups, statisticSorted } from './FullEventUtils';

class FullEventLiveConverter {
  convertFullEvent = event => ({
    ID: +event.Id,
    tourneyID: +event.Description.TournamentId,
    sportID: +event.Description.SportId,
    sportName: event.Description.SportName,
    tourneyName: event.Description.TName,
    comment: event.Description.Comment,
    firstTeamName: event.Description.NameTeam1,
    secondTeamName: event.Description.NameTeam2,
    teamIdFirst: event.Description.Team1Id,
    teamIdSecond: event.Description.Team2Id,
    countryID: event.Description.CountryId,
    teams: this.convertorTeams(event.Description),
    date: this.cotvertorEventDate(event.Description.Date),
    coefGroups: this.addAdditionalInfoToCoefs(this.convertorGroups(event.RospisGroups), event, {}),
    score: this.convertorMainScore(event.Description.Score),
    statistic: this.convertorStatistic(event.Statistic),
    timesScore: this.convertorScoreTimes(event.Description.Score),
    time: this.convertorTime(event.Description.MinMatch),
    serve: this.convertorServe(event.Statistic, event.Description),
    mapId: event.ScoreStats[0] ? event.ScoreStats[0].MapId : '',
    mapSportId: event.ScoreStats[0] ? event.ScoreStats[0].SportId : 0,
  });

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
    const sortedStatisticArray = statisticArray
      .sort((a, b) => statisticSorted.indexOf(a.name) - statisticSorted.indexOf(b.name))
      .filter(t => t.value.length === 2);

    return sortedStatisticArray;
  }

  convertorServe = (statisticInfoJson, description) => {
    const { serv } = JSON.parse(statisticInfoJson);
    if (+serv[0] === 1) return description.NameTeam1;
    if (+serv[1] === 1) return description.NameTeam2;
    return '';
  }

  convertorUpdateServe = (statisticInfoJson, event) => {
    const { serv } = JSON.parse(statisticInfoJson);
    if (+serv[0] === 1) return event.firstTeamName;
    if (+serv[1] === 1) return event.secondTeamName;
    return '';
  }

  addAdditionalInfoToCoefs = (groups, event, oldInfo) => groups.map(tempGroup => ({
    ...tempGroup,
    betGroups: tempGroup.betGroups.map(tempBetGroup => ({
      ...tempBetGroup,
      coefs: tempBetGroup.coefs.map(tempCoefs => tempCoefs.map(tempCoef => ({
        ...tempCoef,
        teams: this.convertorTeams(event.Description, { NameTeam1: oldInfo.NameTeam1, NameTeam2: oldInfo.NameTeam2 }),
        sportName: event.Description.SportName || oldInfo.SportName,
        tourneyName: event.Description.TName || oldInfo.TName,
        countryID: event.Description.CountryId,
      }))),
    })),
  }))

  getOldAdditionalInfoToCoefs = oldEvent => ({
    NameTeam1: oldEvent.firstTeamName,
    NameTeam2: oldEvent.secondTeamName,
    SportName: oldEvent.sportName,
    TName: oldEvent.tourneyName,
    teams: oldEvent.teams,
  })

  convertUpdateFullEvent = (eventData, previewEvent) => {
    if (!eventData.LEvents) return previewEvent;
    
    const rawEvent = eventData.LEvents.find(event => +event.Id === previewEvent.ID);
    if (!rawEvent) return previewEvent;

    const updatedEvent = {
      ...previewEvent,
      coefGroups: this
        .addAdditionalInfoToCoefs(this
          .addUpdateStatuses(this
            .updateCoefGroups(rawEvent.Rates, previewEvent.coefGroups), previewEvent.coefGroups), rawEvent,
        this.getOldAdditionalInfoToCoefs(previewEvent)),
      time: this.convertorTime(rawEvent.Description.MinMatch),
      score: this.convertorMainScore(rawEvent.Description.Score),
      timesScore: this.convertorScoreTimes(rawEvent.Description.Score),
      serve: this.convertorUpdateServe(rawEvent.Statistic, previewEvent),
      statistic: this.convertorStatistic(rawEvent.Statistic),
      comment: rawEvent.Description.Comment,
    };

    return updatedEvent;
  }

  convertorTime = time => {
    const seconds = time.Seconds > 9 ?
      time.Seconds : `0${time.Seconds}`;
    return time.TotalMinutes !== -1 ?
      `${time.TotalMinutes}:${seconds}` : '';
  }

  convertorMainScore = score => `${score} `.substring(0, `${score} `.indexOf(' '))

  convertorScoreTimes = score => `${score} `.substring(`${score} `.indexOf(' '))

  convertorTeams = (description, oldDesc) => {
    return `${description.NameTeam1 || oldDesc.NameTeam1} - ${description.NameTeam2 || oldDesc.NameTeam2}`;
  }

  cotvertorEventDate = date =>
    dayjs(+date.substring(date.indexOf('(') + 1, date.indexOf(')'))).format('DD-MM-YYYY HH:mm')

  // Давже не пытайся понять, как это работает, дружище. Это пиздец.
  updateCoefGroups = (newGroups = [], oldGroups = []) => {
    // Создаем массив объединенных групп статистики
    const convertedNewGroups = this.converterNewStatisticGroup(this.converterNewGroups(newGroups));

    // Создаем обновленный массив
    const updatedCoefGroups = oldGroups.map(tempStatisticGroup => {
      // Находим новую группу статистики, соответствующую текущей старой
      const tempNewGroup = convertedNewGroups.find(temp => temp.value === tempStatisticGroup.value);

      // Если таковой нет, значит обновления в ней не было, возвращаем старую
      if (tempNewGroup === undefined) return tempStatisticGroup;

      // Тут начинается пиздец (создаем обновленную группу статистики)
      const newStatisticGroup = {
        ...tempStatisticGroup,
        betGroups: tempStatisticGroup.betGroups.map(tempGroup => {
          // Находим новую группу ставок, соответствующую текущей
          const findedGroups = tempNewGroup.betGroups.filter(t => t.ID === tempGroup.ID);
          
          // Если такой нет, возвращаем текущую
          if (!findedGroups.length) return tempGroup;

          // Проверяем, нужно ли текущую группу удалить
          if (findedGroups.length === 1 && findedGroups[0].status === LiveStatuses.STATUS_REMOVE) return null;
          // Составляем массив с удалённой группой
          const removedNewGroups = findedGroups.filter(t => t.status === LiveStatuses.STATUS_REMOVE);

          // Составляем из массива новых групп коэффициентов массив обновленных и массив добавленных
          const updatedNewGroups = findedGroups.filter(t => t.status === LiveStatuses.STATUS_UPDATE);
          const addedNewGroups = findedGroups.filter(t => t.status === LiveStatuses.STATUS_ADD);

          // Из массива обновленных групп делаем массив коэффициентов
          const updatedNewCoefGroups = [].concat(...updatedNewGroups.reduce((newArray, temp) =>
            [...newArray, ...temp.coefs], []));

          // Заменяем в старой группе коэффициенты на обновленные
          const resultGroupWithUpdate = {
            ...tempGroup,
            coefs: tempGroup.coefs.map(tempArray =>
              tempArray.map(tempCoef =>
                updatedNewCoefGroups.find(tempFinded => tempFinded.ID === tempCoef.ID) || tempCoef)),
          };

          // когда приходит удаление и добавление сразу на одину и ту же группу коэффов
          const addNewCoefs = removedNewGroups.length && addedNewGroups.length ?
            [...[].concat(...addedNewGroups.map(temp => temp.coefs))] :
            [...resultGroupWithUpdate.coefs, ...[].concat(...addedNewGroups.map(temp => temp.coefs))];

          // Добавляем в старую группу новые группы коэффициентов
          const resultWithAdd = {
            ...resultGroupWithUpdate,
            coefs: addNewCoefs,
          };

          // Возвращаем итог
          return resultWithAdd;
        }).filter(t => t !== null), // Удаляем пустые группы ставок
      };

      // Если в группе статистики нет групп ставок, то удаляем её
      return newStatisticGroup.betGroups.length ? newStatisticGroup : null;
    }).filter(t => t !== null); // Удаляем пустые группы статистики

    // Если ты досюда дочитал, можешь попросить у меня 10 рублей за терпение
    return updatedCoefGroups;
  }

  converterNewStatisticGroup = groups => {
    const uniqueGroup = groups.map(temp => ({
      text: temp.groupName,
      value: temp.ID.substring(0, temp.ID.indexOf('_')) + temp.groupName,
    })).filter((v, i, a) => a.findIndex(t => t.text === v.text) === i);
    const statisticGroupWithBetGroups = uniqueGroup.map(temp => ({
      ...temp, betGroups: groups.filter(tempBetGroup => tempBetGroup.groupName === temp.text),
    }));
    return statisticGroupWithBetGroups;
  }

  converterNewGroups = groups => groups.map(tempGroup => ({
    ID: tempGroup.Id,
    name: tempGroup.Caption,
    groupName: tempGroup.GroupName,
    isOpen: true,
    coefs: this.groupCoefsInsideGroup(tempGroup.Rates),
    status: tempGroup.State,
  }))

  addUpdateStatuses = (newGroups = [], oldGroups = []) => newGroups.map(temp => ({
    ...temp,
    betGroups: temp.betGroups.map(tempBetGroup => ({
      ...tempBetGroup,
      coefs: tempBetGroup.coefs.map(tempCoefs => tempCoefs.map(tempCoef => {
        const findedGroup = oldGroups.find(tempFindedGroup => tempFindedGroup.value === temp.value);
        if (!findedGroup) return tempCoef;

        const findedBetGroup = findedGroup.betGroups.find(tempFindedBetGroup =>
          tempFindedBetGroup.ID === tempBetGroup.ID);
        if (!findedBetGroup) return tempCoef;

        const findedCoef = [].concat(...findedBetGroup.coefs).find(tempFindedCoef => tempFindedCoef.ID === tempCoef.ID);
        if (!findedCoef) return tempCoef;

        return {
          ...tempCoef,
          updateStatus: this.defineStatus(findedCoef, tempCoef),
        };
      })),
    })),
  }))

  defineStatus = (oldCoef, newCoef) => {
    if (oldCoef === undefined || newCoef.rate.decimal === oldCoef.rate.decimal) return statusTypes.DEFAULT;
    return newCoef.rate.decimal > oldCoef.rate.decimal ? statusTypes.INCREASE : statusTypes.REDUCED;
  }


  convertorGroups = groups => groups.map(temp => ({
    text: temp.Name,
    value: temp.Id + temp.Name,
    isEnabled: temp.IsEnabled,
    betGroups: this.sorterCoefGroups(this.convertorbetGroups(temp.Rates)),
  }))

  sorterCoefGroups = groups => {
    const mainGroups = sortCoefGroups.reduce((newArray, temp) => groups.find(tempFinded => tempFinded.ID === temp) !== undefined ?
      [...newArray, groups.find(tempFinded => tempFinded.ID === temp)] : newArray, []);
    const otherGroups = groups.filter(temp => sortCoefGroups.findIndex(tempFinded => tempFinded === temp.ID) === -1);
    return [...mainGroups, ...otherGroups];
  }

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

export default FullEventLiveConverter;
