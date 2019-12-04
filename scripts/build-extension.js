const ncc = require('@zeit/ncc');
const fs = require('fs');
const gitRev = require('git-rev-sync');
const packageJson = require('../package.json');

async function main() {
    const output = await ncc('./build/src/extension/index.js');
    const lines = output.code.split('\n');
    lines.shift();
    const code = lines
        .join('\n')
        .replace(' __dirname + ', '')
        .replace('__VERSION__', packageJson.version)
        .replace('__HASH__', gitRev.long());

    fs.writeFileSync('./dist/extension.js', code);
}

main().catch(e => console.log(e));
