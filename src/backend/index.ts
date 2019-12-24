import * as cors from 'cors';
import * as express from 'express';
import { https } from 'firebase-functions';
import { ApiScan } from './scan';
import { ApiCall } from './api.call';

const Api = express();
Api.use(cors());

ApiCall.bind(Api, new ApiScan());

export const api = https.onRequest(Api);
