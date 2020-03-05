import { getSportsData } from 'shared/__mock__/results';

export class ResultsApi {
  getSports() {
    return Promise.resolve({ success: true, data: getSportsData });
  }

  getTournaments() {
    return Promise.resolve({ success: true, data: getSportsData });
  }

  getResults() {
    return Promise.resolve({ success: true, data: getSportsData });
  }
}