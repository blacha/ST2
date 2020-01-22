import * as admin from 'firebase-admin';
admin.initializeApp();

import * as cors from 'cors';
import * as express from 'express';
import * as bodyParser from 'body-parser';

import { https } from 'firebase-functions';
import { ApiScan } from './routes/scan';
import { ApiCall } from './api.call';
import { ApiInstall } from './routes/install';
import { ApiClaimStart, ApiClaimPlayer } from './routes/claim';

const Api = express();
Api.use(cors({ maxAge: 24 * 60 * 60 }));
Api.use(bodyParser());

ApiCall.bind(Api, new ApiScan());
ApiCall.bind(Api, new ApiInstall());
ApiCall.bind(Api, new ApiClaimStart());
ApiCall.bind(Api, new ApiClaimPlayer());

export const api = https.onRequest(Api);
