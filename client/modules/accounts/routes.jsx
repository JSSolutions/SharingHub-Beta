import React from 'react';
import { mount } from 'react-mounter';
import AppLayout from '../core/components/AppLayout.jsx';
import SignUp from './containers/sign_up';

export default function (injectDeps, { FlowRouter }) {
  const AppLayoutCtx = injectDeps(AppLayout);
  FlowRouter.route('/sign-up', {
    name: 'accounts.signUp',
    action() {
      mount(AppLayoutCtx, {
        content: () => <SignUp />,
      });
    },
  });
}
