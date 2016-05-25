import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export default new SimpleSchema({
  name: {
    type: String,
    optional: true,
  },
  createdAt: {
    type: Date,
    autoValue() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return { $setOnInsert: new Date() };
      }
      return this.unset();
    },
  },
  mergedServices: {
    type: [String],
    optional: true,
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true,
  },
});
