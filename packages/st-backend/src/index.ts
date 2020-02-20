import 'source-map-support/register';
import * as admin from 'firebase-admin';
admin.initializeApp();

import { https } from 'firebase-functions';
import { Api } from './api';

export const api = https.onRequest(Api);
