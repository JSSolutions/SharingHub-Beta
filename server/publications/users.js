import { Meteor } from 'meteor/meteor';

export default () => {
  Meteor.publish('user.profile', function () {
    const fields = { name: 1, createdAt: 1, mergedServices: 1 };
    return Meteor.users.find(this.userId, { fields });
  });
};
