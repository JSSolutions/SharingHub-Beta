import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export default new SimpleSchema({
  name: {
    type: String,
  },
  owner: {
    type: String,
  },
  service: {
    type: String,
  },
  memberKey: {
    type: String,
  },
  subjectKeys: {
    type: [String],
    optional: true,
  },
  image: {
    type: String,
    optional: true,
  },
  additionalData: {
    type: Object,
    optional: true,
    blackbox: true,
  },
});
