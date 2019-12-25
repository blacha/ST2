import * as ncc from '@zeit/ncc';
import * as fs from 'fs';
import * as path from 'path';
import * as gitRev from 'git-rev-sync';
import * as packageJson from '../../package.json';

export interface NccOutput {
    code: string;
    map?: string;
    assets: { [fileName: string]: { source: Buffer; permissions: number } };
}

function writeAssets(dst: string, output: NccOutput) {
    const lines = output.code.split('\n');
    const code = lines
        .join('\n')
        .replace(' __dirname + ', '') // Hack to make NCC pack for web!
        .replace('__VERSION__', packageJson.version)
        .replace('__HASH__', gitRev.long());

    fs.writeFileSync(dst, code);
    if (output.map) {
        fs.writeFileSync(dst + '.map', output.map);
    }
    const outputPath = path.dirname(dst);
    for (const [fileName, asset] of Object.entries(output.assets)) {
        const outputFile = path.join(outputPath, fileName);
        fs.writeFileSync(outputFile, asset.source);
    }
}
function noop(output: NccOutput) {
    return output;
}

export async function pack(
    src: string,
    dst: string,
    externals: string[] = [],
    callback: (output: NccOutput) => NccOutput = noop,
) {
    const dstPath = path.dirname(dst);
    if (!fs.existsSync(dstPath)) {
        fs.mkdirSync(dstPath, { recursive: true });
    }
    const output = await ncc(src, { externals, sourceMap: true });
    writeAssets(dst, callback(output));
}
