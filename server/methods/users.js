import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export default () => {
  Meteor.methods({
    'users.removeService'(serviceName) {
      check(serviceName, String);

      const unsetService = `services.${serviceName}`;

      Meteor.users.update(this.userId, {
        $pull: { mergedServices: serviceName },
        $unset: { [unsetService] : '' },
      });
    },
  });
};
