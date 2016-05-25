import users from './users';
import trello from './trello';
import services from './services';

export default () => {
  users();
  trello();
  services();
};
