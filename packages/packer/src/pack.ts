import * as ncc from '@zeit/ncc';
import * as fs from 'fs';
import * as path from 'path';
import findAndReadPackageJSON from 'find-and-read-package-json';
import bytes = require('bytes');

import { replaceConfig, Config } from './config';

export interface NccOutput {
    code: string;
    map?: string;
    assets: { [fileName: string]: { source: Buffer; permissions: number } };
}

function writeAssets(dst: string, output: NccOutput) {
    const lines = output.code.split('\n');
    const code = replaceConfig(lines.join('\n').replace(' __dirname + ', '')); // Hack to make NCC pack for web!

    fs.writeFileSync(dst, code);
    console.log(`✓ ${dst} (${bytes(fs.statSync(dst).size)})`);
    if (output.map) {
        const mapFile = dst + '.map';
        fs.writeFileSync(mapFile, output.map);
        console.log(`✓ ${mapFile} (${bytes(fs.statSync(mapFile).size)})`);
    }
    const outputPath = path.dirname(dst);
    for (const [fileName, asset] of Object.entries(output.assets)) {
        const outputFile = path.join(outputPath, fileName);
        const dirName = path.dirname(outputFile);
        if (!fs.existsSync(dirName)) {
            fs.mkdirSync(dirName, { recursive: true });
        }
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
    const pkgJson = await findAndReadPackageJSON(src);
    Config.version = pkgJson.json.version;

    const dstPath = path.dirname(dst);
    if (!fs.existsSync(dstPath)) {
        fs.mkdirSync(dstPath, { recursive: true });
    }
    const output = await ncc(src, { externals, sourceMap: true, debugLog: true });
    writeAssets(dst, callback(output));
}
