import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import MembersPage from '../components/MembersPage.jsx';

export const composer = ({ context }, onData) => {
  const { Meteor, Collections, FlowRouter } = context();
  const service = FlowRouter.getParam('menu');
  if (Meteor.subscribe('services.membersList', service).ready()) {
    const members = Collections.Members.find().fetch();
    onData(null, { members });
  } else {
    onData(null, {});
  }
};

export const depsMapper = (context, action) => ({
  context: () => context,
  createServiceMember: action.members.createServiceMember,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(MembersPage);
