import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import SignUp from '../components/SignUp.jsx';

export const composer = ({ context }, onData) => {
  onData(null, {});
};

export const depsMapper = (context, action) => ({
  context: () => context,
  loginWithService: action.accounts.loginWithService,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(SignUp);
