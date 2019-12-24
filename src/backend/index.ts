import * as cors from 'cors';
import * as express from 'express';
import * as bodyParser from 'body-parser';

import { https } from 'firebase-functions';
import { ApiScan } from './scan';
import { ApiCall } from './api.call';

const Api = express();
Api.use(cors());
Api.use(bodyParser());

ApiCall.bind(Api, new ApiScan());

export const api = https.onRequest(Api);
