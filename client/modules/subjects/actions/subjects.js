export default {
  shareSubjectToMember({ Meteor, Bert, LocalState }, serviceName, subjectKey, memberKey, permissions) {
    LocalState.set(`loading_${subjectKey}`, true);
    LocalState.set(`loading_${memberKey}`, true);
    Meteor.call('services.shareSubjectToMember', serviceName, subjectKey, memberKey, permissions, (err) => {
      if (err) {
        Bert.alert({ title: 'Error', message: err.message, type: 'danger' });
      } else {
        Bert.alert({ title: 'Success', message: 'Subject shared to member', type: 'success' });
      }
      LocalState.set(`loading_${subjectKey}`, false);
      LocalState.set(`loading_${memberKey}`, false);
    });
  },

  unshareSubjectFromMember({ Meteor, Bert, LocalState }, serviceName, subjectKey, memberKey) {
    LocalState.set(`loading_${subjectKey}`, true);
    LocalState.set(`loading_${memberKey}`, true);
    Meteor.call('services.unshareSubjectFromMember', serviceName, subjectKey, memberKey, (err) => {
      if (err) {
        Bert.alert({ title: 'Error', message: err.message, type: 'danger' });
      } else {
        Bert.alert({ title: 'Success', message: 'Subject unshared from member', type: 'success' });
      }
      LocalState.set(`loading_${subjectKey}`, false);
      LocalState.set(`loading_${memberKey}`, false);
    });
  },

  findSubject({ Meteor }, serviceName, memberKey, input, callback) {
    Meteor.call('services.findSubject', serviceName, memberKey, input, (err, res) => {
      if (err) {
        callback(err);
      } else {
        callback(null, res);
      }
    });
  },
};
