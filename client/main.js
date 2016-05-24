import { createApp } from 'mantra-core';
import initContext from './configs/context';

const context = initContext();
const app = createApp(context);
app.init();
