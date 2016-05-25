export default {
  loginWithService({ Meteor, FlowRouter, Bert }, service) {
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
      const user = Meteor.user();
      loginMethod(options, (err) => {
        if (err) {
          Bert.alert({
            title: 'Error',
            message: err.message,
            type: 'danger',
          });
        } else {
          if (!user) FlowRouter.go('profile.me');
          Bert.alert({
            title: 'Success',
            message: user ? 'Service successfully added' : 'Welcome',
            type: 'success',
          });
        }
      });
    }
  },

  logout({ Meteor, FlowRouter }) {
    Meteor.logout();
    FlowRouter.go('/');
  },
};
