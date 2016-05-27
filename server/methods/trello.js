import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Subjects, Members } from '/imports/collections';
import TrelloApi from '../libs/trello';
import Trello from 'node-trello';

const key = Meteor.settings.services.trello.consumerKey;

const getTrelloKeys = () => {
  const user = Meteor.user();
  const { accessToken, id } = user.services.trello || {};
  if (!accessToken) {
    throw new Meteor.Error('notAuthorized', 'The user must be logged in with Trello account ');
  }
  return { accessToken, id };
};

const parsTrelloSubject = (board, userId) => {
  const { name, id, memberships, ...rest } = board;
  return {
    name,
    owner: userId,
    service: 'trello',
    subjectKey: id,
    memberKeys: memberships.map((m) => m.idMember),
    additionalData: rest,
  };
};

const parsTrelloMembers = (member, userId) => {
  const { fullName, id, idBoards, ...rest } = member;
  return {
    name: fullName,
    owner: userId,
    service: 'trello',
    memberKey: id,
    subjectKeys: idBoards,
    additionalData: rest,
  };
};

export default () => {
  Meteor.methods({
    'trello.getServiceData'() {
      const boards = Meteor.call('trello.getAdminBoards');
      const boardsMember = Meteor.call('trello.getAdminBoardsMembers', boards);
      const subjects = boards.map((board) => parsTrelloSubject(board, this.userId));
      const members = boardsMember.map((member) => parsTrelloMembers(member, this.userId));
      return { subjects, members };
    },
    'trello.getAdminBoards'() {
      const { accessToken, id } = getTrelloKeys();
      const trello = new TrelloApi(key, accessToken);
      return trello.getAdminBoards(id);
    },
    'trello.getAdminBoardsMembers'(adminBoards) {
      check(adminBoards, Array);

      const { accessToken, id } = getTrelloKeys();
      const trello = new TrelloApi(key, accessToken);
      return trello.getAdminBoardsMembers(id, adminBoards);
    },
    'trello.getMembersProfile'(memberKey) {
      check(memberKey, String);

      const { accessToken, id } = getTrelloKeys();
      const trello = new TrelloApi(key, accessToken);
      const member = trello.getMember(memberKey);
      return parsTrelloMembers(member, this.userId);
    },
    'trello.addBoardMember'(boardId, memberId) {
      check(boardId, String);
      check(memberId, String);
      const { accessToken, id } = getTrelloKeys();
      const trello = new TrelloApi(key, accessToken);
      return trello.addBoardMember(boardId, memberId, { type: 'normal' });
    },
    'trello.removeBoardMember'(boardId, memberId) {
      check(boardId, String);
      check(memberId, String);
      const { accessToken, id } = getTrelloKeys();
      const trello = new TrelloApi(key, accessToken);
      return trello.removeBoardMember(boardId, memberId);
    },
  });
};
