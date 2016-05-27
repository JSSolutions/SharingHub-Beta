import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import { EmptySpinner } from '../../core/libs/spinners.jsx';

export const composer = ({ context }, onData) => {
  const { Meteor } = context();
  if (Meteor.subscribe('user.profile').ready()) {
    const user = Meteor.user();
    onData(null, { user });
  } else {
    onData(null, {});
  }
};

export const depsMapper = (context, action) => ({
  context: () => context,
  logout: action.accounts.logout,
});

export default (component) => composeAll(
  composeWithTracker(composer, EmptySpinner),
  useDeps(depsMapper)
)(component);
