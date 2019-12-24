import { pack } from './pack';

pack('./build/src/extension/index.js', './dist/extension/st.user.js').catch(e => console.log(e));
