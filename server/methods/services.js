import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Subjects, Members } from '/imports/collections';

export default () => {
  Meteor.methods({
    'services.syncService'(serviceName) {
      check(serviceName, String);
      let result;

      switch (serviceName) {
        case 'trello':
          result = Meteor.call('trello.getServiceData');
          break;
        default:
          throw new Meteor.Error('invalidService', 'Invalid Service name');
      }

      if (result) {
        if (result.subjects) {
          result.subjects.forEach((sub) => {
            Subjects.upsert({
              subjectKey: sub.subjectKey,
              owner: this.userId,
              service: serviceName,
            }, { $set: sub });
          });
        }
        if (result.members) {
          result.members.forEach((mem) => {
            Members.upsert({
              memberKey: mem.memberKey,
              owner: this.userId,
              service: serviceName,
            }, { $set: mem });
          });
        }
      }
    },
    'services.removeService'(serviceName) {
      check(serviceName, String);
      const unsetService = `services.${serviceName}`;
      Subjects.remove({ owner: this.userId, service: serviceName });
      Members.remove({ owner: this.userId, service: serviceName });
      Meteor.users.update(this.userId, {
        $pull: { mergedServices: serviceName },
        $unset: { [unsetService]: '' },
      });
    },
    'services.shareSubjectToMember'(serviceName, subjectKey, memberKey, permissions) {
      check(serviceName, String);
      check(subjectKey, String);
      check(memberKey, String);
      check(permissions, Array);

      if (!permissions || permissions.length < 1) {
        throw new Meteor.Error('InvalidPermissions', 'Member permissions is required');
      }

      let result;
      switch (serviceName) {
        case 'trello':
          result = Meteor.call('trello.addBoardMember', subjectKey, memberKey, permissions);
          break;
        default:
          throw new Meteor.Error('invalidService', 'Invalid Service name');
      }

      if (result) {
        Subjects.update({ subjectKey, owner: this.userId, service: serviceName }, {
          $push: { memberKeys: { key: memberKey, permissions } },
        });
        Members.update({ memberKey, owner: this.userId, service: serviceName }, {
          $push: { subjectKeys: { key: subjectKey, permissions } },
        });
      }
    },
    'services.unshareSubjectFromMember'(serviceName, subjectKey, memberKey) {
      check(serviceName, String);
      check(subjectKey, String);
      check(memberKey, String);
      let result;

      switch (serviceName) {
        case 'trello':
          result = Meteor.call('trello.removeBoardMember', subjectKey, memberKey);
          break;
        default:
          throw new Meteor.Error('invalidService', 'Invalid Service name');
      }

      if (result) {
        Subjects.update({ subjectKey, owner: this.userId, service: serviceName }, {
          $pull: { memberKeys: { key: memberKey } },
        });
        Members.update({ memberKey, owner: this.userId, service: serviceName }, {
          $pull: { subjectKeys: { key: subjectKey } },
        });
      }
    },
    'services.createMember'(serviceName, memberKey) {
      check(serviceName, String);
      check(memberKey, String);
      let result;

      switch (serviceName) {
        case 'trello':
          result = Meteor.call('trello.getMembersProfile', memberKey);
          break;
        default:
          throw new Meteor.Error('invalidService', 'Invalid Service name');
      }

      const member = Members.findOne({ memberKey: result.memberKey });
      if (member) {
        throw new Meteor.Error('duplicateMemberKey', 'Member with this key already exist');
      } else {
        Members.insert(result);
      }
    },
    'services.findMember'(serviceName, subjectKey, query) {
      check(serviceName, String);
      check(subjectKey, String);
      check(query, String);

      const subject = Subjects.findOne({ subjectKey, service: serviceName });
      const memberKeys = subject && subject.memberKeys && subject.memberKeys.map(mk => mk.key);

      switch (serviceName) {
        case 'trello':
          if (!query || query.length < 1) return [];
          const re = new RegExp(query, 'i');
          return Members.find(
            { name: re, memberKey: { $nin: memberKeys } },
            { limit: 50, fields: { name: 1, memberKey: 1 } }).fetch();
        default:
          return [];
      }
    },
    'services.findSubject'(serviceName, memberKey, query) {
      check(serviceName, String);
      check(memberKey, String);
      check(query, String);

      const member = Members.findOne({ memberKey, service: serviceName });
      const subjectKeys = member && member.subjectKeys && member.subjectKeys.map(sk => sk.key);

      switch (serviceName) {
        case 'trello':
          if (!query || query.length < 1) return [];
          const re = new RegExp(query, 'i');
          return Subjects.find(
            { name: re, subjectKey: { $nin: subjectKeys } },
            { limit: 50, fields: { name: 1, subjectKey: 1 } }).fetch();
        default:
          return [];
      }
    },
  });
};
