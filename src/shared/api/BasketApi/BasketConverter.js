import dayjs from 'dayjs';
import convertOddToCurrentType from 'shared/models/OddsTypeModel';
import { getErrorMessage } from './data';

class BasketConverter {
  convertLimit = data => {
    return data.d === null ? null : ({
      max: data ? +Math.floor(data.d.Max) : 0,
      min: data ? +Math.ceil(data.d.Min) : 0,
    });
  }

  convertAddToBetslipDataFail = bet => (bet ? { id: bet.LinesID, errorCode: true } : null);

  convertDate = date => dayjs(+date.substring(date.indexOf('(') + 1, date.indexOf(')'))).format('DD MMMM, hh:mm');

  convertAddToBetslipData = data => {
    const bet = data.d;
    const convertedBet = {
      id: bet.LinesID,
      errorCode: getErrorMessage(bet.ErrorMessage),
      betslipInfo: {
        EG: bet.EG,
        a1: bet.Add1,
        a2: bet.Add2,
        bId: bet.BetVarID,
        eId: bet.LinesID,
        fs: bet.HandSize,
        isLive: bet.IsLive,
        r: bet.OddsBet,
      },
      ID: this.flattenBasketInfo(bet),
      rate: convertOddToCurrentType(bet.OddsBet),
      shortName: bet.NameBetShort,
      longName: bet.NameBetLong,
      teams: this.convertorTeams(bet),
      sportName: bet.NameSport,
      max: bet.Max,
      min: bet.Min,
      tourneyName: bet.NameTurnir,
      date: bet.DateEventLive && this.convertDate(bet.DateEventLive),
    };
    return convertedBet;
  };

  convertRemoteBasket = data => ({
    bets: this.convertorBasketBets(data.Bets),
    betslipTypeID: data.BetslipType,
  })

  convertorBasketBets = bets => bets.map(tempBet => ({
    betslipInfo: {
      a1: tempBet.Add1,
      a2: tempBet.Add2,
      bId: tempBet.BetVarID,
      eId: tempBet.LinesID,
      fs: tempBet.HandSize,
      isLive: tempBet.IsLive,
      r: tempBet.OddsBet,
    },
    ID: this.flattenBasketInfo(tempBet),
    rate: convertOddToCurrentType(tempBet.OddsBet),
    shortName: tempBet.NameBetShort,
    longName: tempBet.NameBetLong,
    teams: this.convertorTeams(tempBet),
    sportName: tempBet.NameSport,
    max: tempBet.Max,
    min: tempBet.Min,
    tourneyName: tempBet.NameTurnir,
    date: tempBet.DateEventLive && this.convertDate(tempBet.DateEventLive),
  }))

  convertorTeams = bet => `${bet.NameTeam1} - ${bet.NameTeam2}`

  flattenBasketInfo = bet => {
    const parts = [bet.LinesID, bet.BetVarID, bet.HandSize, bet.Add1, bet.Add2];
    return parts.map(part => part != null ? part : 'null').join('_');
  }
}

export default BasketConverter;