import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import SubjectDetail from '../components/SubjectDetail.jsx';

export const composer = ({ context }, onData) => {
  const { Meteor, Collections, FlowRouter, LocalState } = context();
  const service = FlowRouter.getParam('menu');
  const subjectId = FlowRouter.getParam('_id');
  if (Meteor.subscribe('services.subjectsDetail', service, subjectId).ready()) {
    const subject = Collections.Subjects.findOne(subjectId);
    const members = Collections.Members.find().fetch();
    const loadingAction = LocalState.get(`loading_${subject.subjectKey}`);
    onData(null, { subject, members, service, loadingAction });
  } else {
    onData(null, { service, loading: true });
  }
};

export const depsMapper = (context, action) => ({
  context: () => context,
  findMember: action.members.findMember,
  shareSubjectToMember: action.subjects.shareSubjectToMember,
  unshareSubjectFromMember: action.subjects.unshareSubjectFromMember,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(SubjectDetail);
