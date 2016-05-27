import { Mongo } from 'meteor/mongo';
import Schema from './schema';

class MembersCollection extends Mongo.Collection {}

const Members = new MembersCollection('members');
Members.attachSchema(Schema);

Members.helpers({
  $getAvatar() {
    const additionalData = this.additionalData;
    switch (this.service) {
      case 'trello':
        if (additionalData.avatarHash) {
          return `https://trello-avatars.s3.amazonaws.com/${additionalData.avatarHash}/170.png`;
        }
        return null;
      default:
        return null;
    }
  },
});

Members.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

export default Members;
