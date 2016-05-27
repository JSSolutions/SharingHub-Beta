export default {
  removeService({ Meteor, Bert }, serviceName) {
    Meteor.call('services.removeService', serviceName, (err) => {
      if (err) {
        Bert.alert({
          title: 'Error',
          message: err.message,
          type: 'danger',
        });
      } else {
        Bert.alert({
          title: 'Success',
          message: 'Service was removed',
          type: 'success',
        });
      }
    });
  },

  syncService({ Meteor, Bert, LocalState }, serviceName) {
    LocalState.set(`loading_${serviceName}`, true);
    Meteor.call('services.syncService', serviceName, (err) => {
      if (err) {
        Bert.alert({
          title: 'Error',
          message: err.message,
          type: 'danger',
        });
      } else {
        Bert.alert({
          title: 'Success',
          message: 'Service was synced',
          type: 'success',
        });
      }
      LocalState.set(`loading_${serviceName}`, false);
    });
  },
};
