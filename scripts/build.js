const ncc = require('@zeit/ncc');
const fs = require('fs');
const path = require('path');
const packageJson = require('../package.json');
const gitRev = require('git-rev-sync');

module.exports = async function build(src, dst) {
    const dstPath = path.dirname(dst);
    if (!fs.existsSync(dstPath)) {
        fs.mkdirSync(dstPath, {
            recursive: true,
        });
    }
    const output = await ncc(src);
    const lines = output.code.split('\n');
    lines.shift();
    const code = lines
        .join('\n')
        .replace(' __dirname + ', '')
        .replace('__VERSION__', packageJson.version)
        .replace('__HASH__', gitRev.long());

    fs.writeFileSync(dst, code);
};
