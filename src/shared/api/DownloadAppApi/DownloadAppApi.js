import BaseApi from '../BaseApi';
import { DownloadAppConverter } from './DownloadAppConverter';

class DownloadAppApi extends BaseApi {
  constructor() {
    super();
    this.baseUrl = 'https://seven-bet.com';
    this.converter = new DownloadAppConverter();
  }

  getDownloadUrl = () => this.sendLineQuery(
    this.queryTypes.POST,
    `${this.baseUrl}/app_updater/get_updates`,
    {
      project: 'sevenbet',
    }, null,
    this.converter.convertDownloadApp,
  );
}

export default DownloadAppApi;
