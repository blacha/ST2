const build = require('./build.js');
build('./build/extension/index.js', './dist/extension/extension.js').catch(e => console.log(e));
