import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import Profile from '../components/Profile.jsx';

export const composer = ({ context }, onData) => {
  onData(null, {});
};

export const depsMapper = (context, action) => ({
  context: () => context,
  loginWithService: action.accounts.loginWithService,
  removeService: action.profile.removeService,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Profile);
