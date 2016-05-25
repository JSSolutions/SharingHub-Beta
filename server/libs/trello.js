import { HTTP } from 'meteor/http';
import { Meteor } from 'meteor/meteor';

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
    try {
      return HTTP.call(method, fullUrl, { params });
    } catch (e) {
      return e;
    }
  }

  getBoards(params = {}) {
    const url = '/member/me/boards';
    const res = this.makeRequest('GET', url, params);
    if (res instanceof Error) {
      throw new Meteor.Error(res.response.statusCode, res.response.content);
    }
    return res.data;
  }

  getMember(memberId, params = {}) {
    const url = `/member/${memberId}`;
    const res = this.makeRequest('GET', url, params);
    if (res instanceof Error) {
      throw new Meteor.Error(res.response.statusCode, res.response.content);
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
    boards.forEach(board => {
      if (!board.memberships) return;
      board.memberships.forEach((member) => {
        if (member.idMember !== userId) {
          const memberProfile = this.getMember(member.idMember);
          members.push(memberProfile);
        }
      });
    });
    return members;
  }
}

export default TrelloApi;
