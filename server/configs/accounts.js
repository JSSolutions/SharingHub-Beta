import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Users } from '/imports/collections';

export default () => {
  Accounts.onCreateUser((options = {}, user) => {
    user.name = options.profile && options.profile.name;
    if (user.services) {
      const service = Object.keys(user.services)[0];
      user.mergedServices = [service];
    }
    return user;
  });


  const origUpdateOrCreateUserFromExternalService = Accounts.updateOrCreateUserFromExternalService;
  Accounts.updateOrCreateUserFromExternalService = function (serviceName, serviceData, options) {
    const loggedInUser = Meteor.user();
    if (loggedInUser && typeof(loggedInUser.services[serviceName]) === 'undefined') {
      const setAttr = {};
      setAttr[`services.${serviceName}`] = serviceData;
      Meteor.users.update(loggedInUser._id, { $set: setAttr, $addToSet: { mergedServices: serviceName } });
    }
    return origUpdateOrCreateUserFromExternalService.apply(this, arguments);
  };
};
