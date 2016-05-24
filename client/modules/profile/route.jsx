import React from 'react';
import { mount } from 'react-mounter';
import AppSidebarLayout from '../core/components/AppSidebarLayout.jsx';

export default function (injectDeps, { FlowRouter }) {
  const AppLayoutCtx = injectDeps(AppSidebarLayout);

  const profileRoutes = FlowRouter.group({
    prefix: '/profile',
    name: 'profile',
  });


  profileRoutes.route('/', {
    name: 'profile.me',
    action() {
      mount(AppLayoutCtx, {
        content: () => <h1>Profile</h1>,
      });
    },
  });
}
