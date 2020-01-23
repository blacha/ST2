import * as path from 'path';
import * as fs from 'fs';
import { replaceConfig, Config } from './config';
import findAndReadPackageJSON from 'find-and-read-package-json';

const DistFolder = path.join(__dirname, '..', '..', '..', 'dist');

async function main() {
    if (!fs.existsSync(DistFolder)) {
        throw new Error('Missing dist folder: ' + DistFolder);
    }
    const pkgJson = await findAndReadPackageJSON(DistFolder);
    Config.version = pkgJson.json.version;
    const jsFiles = fs.readdirSync(DistFolder).filter(f => f.endsWith('.js'));
    for (const fileName of jsFiles) {
        const filePath = path.join(DistFolder, fileName);
        const fileData = fs.readFileSync(filePath).toString();

        if (fileData.includes('__VERSION__')) {
            console.log('Replacing config', filePath, Config.version, Config.hash);
            const newFileData = replaceConfig(fileData);
            fs.writeFileSync(filePath, newFileData);
        }
    }
}

main().catch(e => console.error(e));
