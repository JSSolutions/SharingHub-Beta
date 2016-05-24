import { Meteor } from 'meteor/meteor';

export default () => {
  Meteor.publish('user.profile', function () {
    return Meteor.users.find(this.userId);
  });
};
