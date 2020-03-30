import 'source-map-support/register';

import * as cors from 'cors';
import * as express from 'express';
import * as bodyParser from 'body-parser';

import { ApiScan } from './routes/scan';
import { ApiCall } from './api.call';
import { ApiInstall } from './routes/install';
import { ApiClaimPlayerStart, ApiClaimPlayerAccept } from './routes/claim.player';
import { ApiWorldUpdate } from './routes/update.world';
import { ApiVersion } from './routes/debug';
import { V2 } from './v2/v2';

import * as compression from 'compression';

export const Api = express();
Api.use(cors({ maxAge: 24 * 60 * 60 }));
Api.use(bodyParser.json());
Api.use(compression());

ApiCall.bind(Api, new ApiVersion());
ApiCall.bind(Api, new ApiScan());
ApiCall.bind(Api, new ApiInstall());
ApiCall.bind(Api, new ApiClaimPlayerStart());
ApiCall.bind(Api, new ApiClaimPlayerAccept());
ApiCall.bind(Api, new ApiWorldUpdate());

export const v2 = new V2();
Api.post('/api/v2/:name', v2.handle.bind(v2));
