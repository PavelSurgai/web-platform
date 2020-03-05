import { getLangIdByName } from 'shared/utils/languages/languages';
import BaseApi from '../BaseApi';
import { SettingsConverter } from './SettingsConverter';

class SettingsApi extends BaseApi {
  constructor(baseUrl) {
    super(baseUrl);
    this.baseUrl = `${baseUrl}/api`;
    this.converter = new SettingsConverter();
  }

  getSettings = () => this.sendQuery(
    this.queryTypes.GET,
    `${this.baseUrl}/site/settings`,
    null, null,
    this.converter.convertSettings,
  );

  setGlobalLanguage = langName => this.sendLineQuery(
    this.queryTypes.POST,
    `${this.baseUrl}/bs3/remote/SetLanguage`,
    { languageId: getLangIdByName(langName) },
  );
}

export default SettingsApi;