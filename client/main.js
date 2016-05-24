import { createApp } from 'mantra-core';
import initContext from './configs/context';
import coreModule from './modules/core';
import accountModule from './modules/accounts';

const context = initContext();
const app = createApp(context);

app.loadModule(coreModule);
app.loadModule(accountModule);
app.init();
