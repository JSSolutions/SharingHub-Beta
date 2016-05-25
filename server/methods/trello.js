import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import TrelloApi from '../libs/trello';

const key = Meteor.settings.services.trello.consumerKey;

export default () => {
  Meteor.methods({
    'trello.getBoards'() {
      const user = Meteor.user();
      const token = user.services.trello && user.services.trello.accessToken;

      if (!token) {
        throw new Meteor.Error('notAuthorized', 'The user must be logged in with Trello account ');
      }

      const trello = new TrelloApi(key, token);
      console.log('boards: ', trello.getBoards());
    },
  });
};
