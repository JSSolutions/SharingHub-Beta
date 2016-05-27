import React from 'react';
import { mount } from 'react-mounter';
import AppSidebarLayout from '../core/components/AppSidebarLayout.jsx';
import ProfileSidebar from './components/ProfileSidebar.jsx';
import Profile from './containers/profile';
import SubjectDetail from '../subjects/containers/subject_detail';
import MemberDetail from '../members/containers/member_detail';

export default function (injectDeps, { FlowRouter }) {
  const AppLayoutCtx = injectDeps(AppSidebarLayout);

  const profileRoutes = FlowRouter.group({
    prefix: '/profile',
    name: 'profile',
  });


  profileRoutes.route('/:menu?', {
    name: 'profile.me',
    action() {
      mount(AppLayoutCtx, {
        content: () => <Profile />,
        sidebar: () => <ProfileSidebar />,
      });
    },
  });

  profileRoutes.route('/:menu/subject/:_id', {
    name: 'profile.serviceItemDetail',
    action() {
      mount(AppLayoutCtx, {
        content: () => <SubjectDetail />,
        sidebar: () => <ProfileSidebar />,
      });
    },
  });

  profileRoutes.route('/:menu/member/:_id', {
    name: 'profile.serviceItemDetail',
    action() {
      mount(AppLayoutCtx, {
        content: () => <MemberDetail />,
        sidebar: () => <ProfileSidebar />,
      });
    },
  });
}
