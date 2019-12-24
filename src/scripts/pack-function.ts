import { pack } from './pack';

pack('./build/src/backend/index.js', './functions/lib/index.js', false, [
    'firebase-admin',
    'firebase-functions',
    'cors',
    'express',
]).catch(e => console.log(e));
