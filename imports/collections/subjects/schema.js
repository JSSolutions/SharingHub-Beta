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
  subjectKey: {
    type: String,
  },
  memberKeys: {
    type: [Object],
    optional: true,
  },
  'memberKeys.$.key': {
    type: String,
  },
  'memberKeys.$.permissions': {
    type: [String],
    defaultValue: [],
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
