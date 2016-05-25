import { Meteor } from 'meteor/meteor';
import Schema from './schema';

Meteor.users.attachSchema(Schema);

Meteor.users.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

export default Meteor.users;
