import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import MemberDetail from '../components/MemberDetail.jsx';

export const composer = ({ context }, onData) => {
  const { Meteor, Collections, FlowRouter } = context();
  const service = FlowRouter.getParam('menu');
  const memberId = FlowRouter.getParam('_id');
  if (Meteor.subscribe('services.membersDetail', service, memberId).ready()) {
    const member = Collections.Members.findOne(memberId);
    const subjects = Collections.Subjects.find().fetch();
    onData(null, { member, subjects, service });
  } else {
    onData(null, { service });
  }
};

export const depsMapper = (context, action) => ({
  context: () => context,
  shareSubjectToMember: action.subjects.shareSubjectToMember,
  unshareSubjectFromMember: action.subjects.unshareSubjectFromMember,
  findSubject: action.subjects.findSubject,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(MemberDetail);
