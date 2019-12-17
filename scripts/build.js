const ncc = require('@zeit/ncc');
const fs = require('fs');
const path = require('path');
const packageJson = require('../package.json');
const gitRev = require('git-rev-sync');

function writeAssets(dst, output) {
    const lines = output.code.split('\n');
    lines.shift();
    const code = lines
        .join('\n')
        .replace(' __dirname + ', '')
        .replace('__VERSION__', packageJson.version)
        .replace('__HASH__', gitRev.long());

    fs.writeFileSync(dst, code);
}

module.exports = async function build(src, dst) {
    const dstPath = path.dirname(dst);
    if (!fs.existsSync(dstPath)) {
        fs.mkdirSync(dstPath, {
            recursive: true,
        });
    }

    if (process.argv.indexOf('--watch') > -1) {
        const watcher = ncc(src, {
            watch: true,
        });
        console.log('WatchMode', src);
        watcher.handler(output => {
            // console.log(output);
            writeAssets(dst, output);
            console.log('WriteAssets', dst);
        });
    } else {
        const output = await ncc(src);
        writeAssets(dst, output);
    }
};
