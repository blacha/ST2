const build = require('./build.js');
build('./build/src/extension/index.js', './dist/extension/extension.js').catch(e => console.log(e));
