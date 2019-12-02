const ncc = require('@zeit/ncc');
const fs = require('fs');

async function main() {
    const output = await ncc('./build/src/extension/index.js');
    const lines = output.code.split('\n');
    lines.shift();
    // lines.pop();
    // lines.push(`/******/ })();`);

    const code = lines.join('\n').replace(' __dirname + ', '');
    fs.writeFileSync('./extension.js', code);
}

main().catch(e => console.log(e));
