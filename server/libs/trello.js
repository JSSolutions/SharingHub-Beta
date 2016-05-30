import { HTTP } from 'meteor/http';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';

class TrelloApi {
  constructor(key, token) {
    this.endpoint = 'https://api.trello.com';
    this.version = '1';
    this.key = key;
    this.token = token;
  }

  handleError(err) {
    let errStatus;
    let errMessage;

    if (err.response) {
      errStatus = err.response.statusCode;
      const message = err.response.content || '';
      const queryStart = message.indexOf('?');
      errMessage = message.substr(0, queryStart === - 1 ? message.length : queryStart);
    } else {
      errStatus = '404';
      errMessage = 'Unknown Error';
    }

    throw new Meteor.Error(errStatus, errMessage);
  }

  makeRequest(method, url, params) {
    const fullUrl = `${this.endpoint}/${this.version}${url}`;
    const extendParam = params;
    extendParam.key = this.key;
    extendParam.token = this.token;
    try {
      return HTTP.call(method, fullUrl, { params });
    } catch (err) {
      return err;
    }
  }

  getBoard(boardId, params = {}) {
    const url = `/boards/${boardId}/`;
    const res = this.makeRequest('GET', url, params);
    if (res instanceof Error) {
      this.handleError(res);
    }
    return res.data;
  }

  getUserBoards(params = {}) {
    const url = '/member/me/boards';
    const res = this.makeRequest('GET', url, params);
    if (res instanceof Error) {
      this.handleError(res);
    }
    return res.data;
  }

  getAdminBoardsList(params = {}) {
    const boards = this.getUserBoards(params);
    const adminBoards = [];

    boards.forEach((board) => {
      const member = board.memberships && board.memberships[0];
      if (!member) return;
      if (member.memberType === 'admin') adminBoards.push(board);
    });

    return adminBoards;
  }

  getMember(memberId, params = {}) {
    const url = `/member/${memberId}`;
    const res = this.makeRequest('GET', url, params);
    if (res instanceof Error) {
      this.handleError(res);
    }
    return res.data;
  }

  addBoardMember(boardId, memberId, params = {}) {
    const url = `/boards/${boardId}/members/${memberId}`;
    const res = this.makeRequest('PUT', url, params);
    if (res instanceof Error) {
      this.handleError(res);
    }
    return res.data;
  }

  removeBoardMember(boardId, memberId, params = {}) {
    const url = `/boards/${boardId}/members/${memberId}`;
    const res = this.makeRequest('DELETE', url, params);
    if (res instanceof Error) {
      this.handleError(res);
    }
    return res.data;
  }
}

export default TrelloApi;
