import { Meteor } from 'meteor/meteor';
import { ServiceConfiguration } from 'meteor/service-configuration';

export default () => {
  const { trello, google, github } = Meteor.settings.services;

  ServiceConfiguration.configurations.upsert(
    { service: 'trello' }, {
      $set: {
        name: 'Sharing Hub',
        consumerKey: trello.consumerKey,
        secret: trello.secret,
        scope: ['read', 'write', 'account'],
        loginStyle: 'popup',
        expiration: 'never',
      },
    }
  );
  ServiceConfiguration.configurations.upsert(
    { service: 'google' }, {
      $set: {
        clientId: google.clientId,
        secret: google.secret,
      },
    }
  );
  ServiceConfiguration.configurations.upsert(
    { service: 'github' }, {
      $set: {
        clientId: github.clientId,
        secret: github.secret,
      },
    }
  );
};
