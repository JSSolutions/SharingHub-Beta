import React from 'react';
import { mount } from 'react-mounter';
import AppLayout from '../core/components/AppLayout.jsx';
import LandingPage from './components/LandingPage.jsx';

export default function (injectDeps, { FlowRouter }) {
  const AppLayoutCtx = injectDeps(AppLayout);
  FlowRouter.route('/', {
    name: 'home',
    action() {
      mount(AppLayoutCtx, {
        content: () => <LandingPage />,
      });
    },
  });
}
