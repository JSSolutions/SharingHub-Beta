import { createApp } from 'mantra-core';
import initContext from './configs/context';
import coreModule from './modules/core';
import accountModule from './modules/accounts';
import profileModule from './modules/profile';
import memberModule from './modules/members';
import subjectsModule from './modules/subjects';

const context = initContext();
const app = createApp(context);

app.loadModule(coreModule);
app.loadModule(accountModule);
app.loadModule(profileModule);
app.loadModule(memberModule);
app.loadModule(subjectsModule);
app.init();
