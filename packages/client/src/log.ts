import * as pino from 'pino';
import * as ulid from 'ulid';
import { PrettyTransform } from 'pretty-json-log';

const id = ulid.ulid().toLowerCase();
const outputStream = process.stdout.isTTY ? PrettyTransform.stream() : process.stdout;

export const Logger = pino({ level: 'trace' }, outputStream).child({ id });
