export default {
  removeService({ Meteor, Bert }, serviceName) {
    Meteor.call('users.removeService', serviceName, (err) => {
      if (err) {
        Bert.alert({
          title: 'Error',
          message: err.message,
          type: 'danger',
        });
      } else {
        Bert.alert({
          title: 'Success',
          message: 'Service successfully removed',
          type: 'success',
        });
      }
    });
  },
};
