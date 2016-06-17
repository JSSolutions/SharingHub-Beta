export default {
  services: {
    trello: {
      title: 'Trello',
      icon: 'fa fa-trello',
      permissions: {
        multi: false,
        list: [
          {
            label: 'Normal',
            value: 'normal',
          },
          {
            label: 'Admin',
            value: 'admin',
          },
        ],
      },
    },
    google: {
      title: 'Google Drive',
      icon: 'fa fa-google',
    },
    github: {
      title: 'GitHub',
      icon: 'fa fa-github-alt',
    },
  },
};
