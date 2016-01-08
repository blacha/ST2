import Parse = require('parse/node');
import {Log} from "../lib/log/log";

Log.getInstance().info('Hello World');

Parse.User.enableUnsafeCurrentUser();