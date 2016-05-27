import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Subjects, Members } from '/imports/collections';

export default () => {
  Meteor.publish('services.subjectsList', function (serviceName) {
    check(serviceName, String);
    return Subjects.find({ owner: this.userId, service: serviceName });
  });

  Meteor.publish('services.membersList', function (serviceName) {
    check(serviceName, String);
    return Members.find({ owner: this.userId, service: serviceName });
  });

  Meteor.publishComposite('services.subjectsDetail', function (serviceName, subjectId) {
    return {
      find() {
        return Subjects.find(subjectId);
      },
      children: [{
        find(subject) {
          return Members.find({
            owner: this.userId,
            service: serviceName,
            memberKey: { $in: subject.memberKeys },
          });
        },
      }],
    };
  });

  Meteor.publishComposite('services.membersDetail', function (serviceName, memberId) {
    return {
      find() {
        return Members.find(memberId);
      },
      children: [{
        find(member) {
          return Subjects.find({
            owner: this.userId,
            service: serviceName,
            subjectKey: { $in: member.subjectKeys },
          });
        },
      }],
    };
  });
};
