import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import Profile from '../components/Profile.jsx';

export const composer = ({ context }, onData) => {
  const { FlowRouter, LocalState } = context();
  const menu = FlowRouter.getParam('menu') || 'settings';
  const loading = LocalState.get(`loading_${menu}`);
  onData(null, { loading, menu });
};

export const depsMapper = (context, action) => ({
  context: () => context,
  loginWithService: action.accounts.loginWithService,
  removeService: action.profile.removeService,
  syncService: action.profile.syncService,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Profile);
