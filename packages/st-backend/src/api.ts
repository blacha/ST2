import 'source-map-support/register';

import * as cors from 'cors';
import * as express from 'express';
import * as bodyParser from 'body-parser';

import { V2 } from './v2/v2';

import * as compression from 'compression';

export const Api = express();
Api.use(cors({ maxAge: 24 * 60 * 60 }));
Api.use(bodyParser.json());
Api.use(compression());

export const v2 = new V2();
Api.post('/api/v2/:name', v2.handle.bind(v2));
