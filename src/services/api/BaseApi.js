import { QueryTypes } from './data';
import HttpActions from './HttpActions';

class BaseApi {
  baseUrl = '';

  queryTypes = {};

  static lang = '';

  constructor(baseUrl = '', version = '') {
    this.baseUrl = baseUrl;
    this.actions = new HttpActions(baseUrl, version);
    this.queryTypes = QueryTypes;
  }

  static setLang(lang) {
    this.lang = lang;
  }

  sendQuery = async (type, url, requestData = {}, options = {}, converterSuccess = dt => dt) => {
    let response;
    switch (type) {
      case QueryTypes.POST:
        response = await this.actions.post(url, requestData, options);
        break;
      case QueryTypes.DELETE:
        response = await this.actions.delete(url, requestData, options);
        break;
      case QueryTypes.PUT:
        response = await this.actions.put(url, requestData, options);
        break;
      default:
        response = await this.actions.get(url);
        break;
    }

    const { data, status } = response;
    const success = status === 200 && data.status === 0;
    const resultResponse = {
      success,
      data: success && converterSuccess(data.result),
      errorMessage: data.error_message ? data.error_message : 'Request execution error',
      codeStatus: data.status,
    };
    return resultResponse;
  }

  sendLineQuery = async (type, url, requestData = {}, options = {}, converterSuccess = dt => dt) => {
    let response;
    switch (type) {
      case QueryTypes.POST:
        response = await this.actions.post(url, requestData, options);
        break;
      case QueryTypes.DELETE:
        response = await this.actions.delete(url, requestData, options);
        break;
      case QueryTypes.PUT:
        response = await this.actions.put(url, requestData, options);
        break;
      default:
        response = await this.actions.get(url);
        break;
    }
    
    const { data, status } = response;
    const success = status === 200;
    const resultResponse = {
      success,
      data: success && converterSuccess(data),
      errorMessage: success ? null : data.message,
      codeStatus: data.status ? data.status : 'defaultMessage',
    };
    return resultResponse;
  }
}

export default BaseApi;
