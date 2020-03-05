import { toCamelCase } from 'shared/helpers/toCamelCase';
import BaseApi from '../BaseApi';
import { BroadcastConverter } from './BroadcastConverter';

class BroadcastApi extends BaseApi {
  constructor() {
    super();
    this.converter = new BroadcastConverter();
  }

  getMatchList = async () => {
    const url = 'https://www.mediadata.space/newsource/api.php?token=SDMCNAHXJVKAMXOFOLA4RN3JN54JNACKSALVNJSALD045';
    const response = await this.actions.get(url);
    const camelCasedData = toCamelCase(response.data);
    const convertedEvents = this.converter.convertEventsFrames(camelCasedData.matchList);
    const convertedData = this.converter.convertSportsByEvents(convertedEvents);
    const success = response.status === 200;
    
    return {
      success,
      data: convertedData,
    };
  }
}

export default BroadcastApi;