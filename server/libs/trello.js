import { HTTP } from 'meteor/http';

class TrelloApi {
  constructor(key, token) {
    this.endpoint = 'https://api.trello.com';
    this.version = '1';
    this.key = key;
    this.token = token;
  }

  makeRequest(method, url, params) {
    const fullUrl = `${this.endpoint}/${this.version}${url}`;
    const extendParam = params;
    extendParam.key = this.key;
    extendParam.token = this.token;
    return HTTP.call(method, fullUrl, { params });
  }

  getBoards(params = {}) {
    const url = '/member/me/boards';
    return this.makeRequest('GET', url, params);
  }
}

export default TrelloApi;
