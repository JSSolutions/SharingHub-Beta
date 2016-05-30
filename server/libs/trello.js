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

  getBoards(params = {}) {
    const url = '/member/me/boards';
    const res = this.makeRequest('GET', url, params);
    if (res instanceof Error) {
      this.handleError(res);
    }
    return res.data;
  }

  getMember(memberId, params = {}) {
    const url = `/member/${memberId}`;
    const res = this.makeRequest('GET', url, params);
    if (res instanceof Error) {
      this.handleError(res);
    }
    return res.data;
  }

  getAdminBoards(userId, params = {}) {
    const boards = this.getBoards(params);
    const adminBoards = [];

    boards.forEach((board) => {
      if (!board.memberships) return;
      board.memberships.forEach((member) => {
        if (member.idMember === userId && member.memberType === 'admin') {
          adminBoards.push(board);
        }
      });
    });

    return adminBoards;
  }

  getAdminBoardsMembers(userId, boards) {
    const members = [];
    const membersId = [];

    boards.forEach(board => {
      if (!board.memberships) return;
      board.memberships.forEach((member) => {
        if (member.idMember !== userId) {
          membersId.push(member.idMember);
        }
      });
    });

    _.uniq(membersId).forEach(memberId => {
      const memberProfile = this.getMember(memberId);
      members.push(memberProfile);
    });

    return members;
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
