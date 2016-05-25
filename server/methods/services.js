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
          break;
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
  });
};
