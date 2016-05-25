import React from 'react';
import { mount } from 'react-mounter';
import AppSidebarLayout from '../core/components/AppSidebarLayout.jsx';
import ProfileSidebar from './components/ProfileSidebar.jsx';
import Profile from './containers/profile';

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
}
