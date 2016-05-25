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
};
