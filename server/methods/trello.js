import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Subjects, Members } from '/imports/collections';
import TrelloApi from '../libs/trello';
import { _ } from 'meteor/underscore';

const key = Meteor.settings.services.trello.consumerKey;
const memberFields = 'fullName,avatarHash,username,url,email';

const getTrelloKeys = () => {
  const user = Meteor.user();
  const { accessToken, id } = user.services.trello || {};
  if (!accessToken) {
    throw new Meteor.Error('notAuthorized', 'The user must be logged in with Trello account ');
  }
  return { accessToken, id };
};

const parseServiceData = (boards, trelloId, userId) => {
  const subjects = [];
  let members = [];

  boards.forEach(board => {
    subjects.push(parseTrelloSubject(board, userId));
    board.memberships.forEach(m => {
      if (m.idMember !== trelloId) {
        const parsedMember = _.find(members, (pm) => m.idMember === pm.memberKey);
        const subjectKey = { key: board.id, permissions: [m.memberType] };
        if (!parsedMember) {
          members.push(parseTrelloMembers(m.member, subjectKey, userId));
        } else {
          if (!parsedMember.subjectKeys) {
            parsedMember.subjectKeys = [];
          }
          parsedMember.subjectKeys.push(subjectKey);
        }
      }
    });
  });

  return { subjects, members };
};

const parseTrelloSubject = (board, userId) => {
  const { name, id, memberships, ...rest } = board;
  return {
    name,
    owner: userId,
    service: 'trello',
    subjectKey: id,
    memberKeys: memberships.map((m) => ({ key: m.idMember, permissions: [m.memberType] })),
    additionalData: rest,
  };
};

const parseTrelloMembers = (member, subjectKey, userId) => {
  const { fullName, id, ...rest } = member;
  return {
    name: fullName,
    owner: userId,
    service: 'trello',
    memberKey: id,
    subjectKeys: subjectKey ? [subjectKey] : [],
    additionalData: rest,
  };
};

export default () => {
  Meteor.methods({
    'trello.getAdminBoards'() {
      const { accessToken } = getTrelloKeys();
      const trello = new TrelloApi(key, accessToken);
      const params = {
        filter: 'open',
        fields: 'id',
        memberships: 'me',
      };
      return trello.getAdminBoardsList(params);
    },
    'trello.getServiceData'() {
      const { accessToken, id } = getTrelloKeys();
      const trello = new TrelloApi(key, accessToken);
      const boardParams = {
        fields: 'name,desc,memberships,url',
        memberships: 'all',
        memberships_member: true,
        memberships_member_fields: memberFields,
      };
      const adminBoards = Meteor.call('trello.getAdminBoards');
      const boards = [];
      adminBoards.forEach(board => {
        boards.push(trello.getBoard(board.id, boardParams));
      });
      return parseServiceData(boards, id, this.userId);
    },
    'trello.getMembersProfile'(memberKey) {
      check(memberKey, String);
      const { accessToken } = getTrelloKeys();
      const params = { fields: memberFields };
      const trello = new TrelloApi(key, accessToken);
      const member = trello.getMember(memberKey, params);
      return parseTrelloMembers(member, null, this.userId);
    },
    'trello.addBoardMember'(boardId, memberId, permissions) {
      check(boardId, String);
      check(memberId, String);
      const { accessToken } = getTrelloKeys();
      const trello = new TrelloApi(key, accessToken);
      return trello.addBoardMember(boardId, memberId, { type: permissions[0] });
    },
    'trello.removeBoardMember'(boardId, memberId) {
      check(boardId, String);
      check(memberId, String);
      const { accessToken } = getTrelloKeys();
      const trello = new TrelloApi(key, accessToken);
      return trello.removeBoardMember(boardId, memberId);
    }
  });
};
