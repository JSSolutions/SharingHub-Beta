import { Mongo } from 'meteor/mongo';
import Schema from './schema';

class MembersCollection extends Mongo.Collection {}

const Members = new MembersCollection('members');
Members.attachSchema(Schema);

Members.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

export default Members;