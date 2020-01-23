import { pack } from './pack';

pack('./packages/st-backend/build/index.js', './functions/lib/index.js', [
    'firebase-admin',
    'firebase-functions',
    'cors',
    'express',
]).catch(e => console.log(e));
