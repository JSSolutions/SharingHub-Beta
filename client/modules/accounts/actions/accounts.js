export default {
  loginWithService({ Meteor, Bert }, service) {
    let loginMethod;
    const options = {};

    switch (service) {
      case 'trello':
        loginMethod = Meteor.loginWithTrello;
        break;
      case 'google':
        loginMethod = Meteor.loginWithGoogle;
        options.requestPermissions = ['https://www.googleapis.com/auth/drive'];
        break;
      case 'github':
        loginMethod = Meteor.loginWithGithub;
        break;
      default: break;
    }

    if (loginMethod) {
      loginMethod(options, (err) => {
        if (err) {
          Bert.alert({
            title: 'Error',
            message: err.message,
            type: 'danger',
          });
        } else {
          Bert.alert({
            title: 'Success',
            message: 'Welcome',
            type: 'success',
          });
        }
      });
    }
  },
};
