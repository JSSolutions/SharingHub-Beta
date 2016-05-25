import { Mongo } from 'meteor/mongo';
import Schema from './schema';

class SubjectCollection extends Mongo.Collection {}

const Subjects = new SubjectCollection('subjects');
Subjects.attachSchema(Schema);

Subjects.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

export default Subjects;
