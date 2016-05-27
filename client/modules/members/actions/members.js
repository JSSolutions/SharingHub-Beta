export default {
  findMember({ Meteor }, serviceName, subjectKey, input, callback) {
    Meteor.call('services.findMember', serviceName, subjectKey, input, (err, res) => {
      if (err) {
        callback(err);
      } else {
        callback(null, res);
      }
    });
  },

  createServiceMember({ Meteor, Bert }, serviceName, memberKey) {
    Meteor.call('services.createMember', serviceName, memberKey, (err) => {
      if (err) {
        Bert.alert({ title: 'Error', message: err.message, type: 'danger' });
      } else {
        Bert.alert({ title: 'Success', message: 'Subject shared to member', type: 'success' });
      }
    });
  },
};
