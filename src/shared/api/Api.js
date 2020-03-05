import AuthApi from './AuthApi';
import FlatPagesApi from './FlatPagesApi';
import SportMenuApi from './SportMenuApi';
import ProfileApi from './ProfileApi';
import PaymentApi from './PaymentApi';
import SettingsApi from './SettingsApi';
import FullEventApi from './FullEventApi/FullEventApi';
import LineApi from './LineApi/LineApi';
import LiveApi from './LiveApi';
import MediaApi from './Media';
import BetHistoryApi from './BetHistoryApi';
import BasketApi from './BasketApi';
import OutcomeApi from './Outcome';
import InbetApi from './InbetApi';
import EvolutionApi from './EvolutionApi';
import PromocodeApi from './Promocode';
import BetgamesApi from './BetgamesApi';
import ResultsApi from './ResultsApi';
import TotoApi from './TotoApi';
import CybersportApi from './CybersportApi';
import DonwloadAppApi from './DownloadAppApi';
import BroadcastApi from './BroadcastApi';
import LiveGamesApi from './LiveGamesApi';

class Api {
  constructor(baseUrl = '') {
    this.auth = new AuthApi(baseUrl);
    this.flatPages = new FlatPagesApi(baseUrl);
    this.sportMenu = new SportMenuApi(baseUrl);
    this.fullEvent = new FullEventApi(baseUrl);
    this.line = new LineApi(baseUrl);
    this.live = new LiveApi(baseUrl);
    this.media = new MediaApi(baseUrl);
    this.outcome = new OutcomeApi(baseUrl);
    this.profile = new ProfileApi(baseUrl);
    this.payment = new PaymentApi(baseUrl);
    this.settings = new SettingsApi(baseUrl);
    this.betHistory = new BetHistoryApi(baseUrl);
    this.basket = new BasketApi(baseUrl);
    this.inbet = new InbetApi(baseUrl);
    this.evolution = new EvolutionApi();
    this.promocode = new PromocodeApi(baseUrl);
    this.betgames = new BetgamesApi(baseUrl);
    this.results = new ResultsApi(baseUrl);
    this.toto = new TotoApi(baseUrl);
    this.cybersport = new CybersportApi(baseUrl);
    this.liveGames = new LiveGamesApi(baseUrl);
    this.downloadApp = new DonwloadAppApi();
    this.broadcast = new BroadcastApi();
  }
}

export default Api;
