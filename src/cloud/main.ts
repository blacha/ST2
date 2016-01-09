/// <reference path="./parse.d.ts" />

import * as ACL from './permission/acl';
import * as Verify from './functions/verify';
import * as Player from './functions/player';
import {Log} from "../lib/log/log";
import {ConsoleLogStream} from "../lib/log/stream";

Log.getInstance().addStream(new ConsoleLogStream(Log.DEBUG));

Verify.define();
Player.define();