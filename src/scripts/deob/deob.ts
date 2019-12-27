import * as fs from 'fs';

const inputPath = process.argv[2];
if (inputPath == null) {
    console.log('Missing clientlib path\n Usage\n\tdeobs.js <path-to-client-lib>');
    process.exit(1);
}

console.log('ClientLib:Path', inputPath);

const OutputPath = './output/';
if (!fs.existsSync(OutputPath)) {
    fs.mkdirSync(OutputPath);
}

const clientLibLines = fs
    .readFileSync(inputPath)
    .toString()
    .split('\n');
console.log('ClientLib:SourceLines:', clientLibLines.length);

const protoRegexp = /^\$I.([A-Z]{6}).prototype.([a-z_A-Z]+) = \$I.([A-Z]{6}).prototype.([A-Z]{6})/;
const staticRegexp = /^\$I.([A-Z]{6}).([a-z_A-Z]+) = \$I.([A-Z]{6}).([A-Z]{6})/;

/**
 * Mapping of internal function names
 * @example
 * 'FWQSFQ' => 'set_IsShowOwnBases'
 */
const Mappings: Map<string, string> = new Map();
/**
 * Mapping of ClientLibFunction -> Name
 *
 * @example
 *'VYYURO' => 'ClientLib.Data.Forum.ForumInfo.ReadWritePermissions'
 */
const ClientLibMapping: Map<string, string> = new Map();
/**
 * List of known duplicates
 */
const Dupes = new Map();
/**  Dont log debug comments */
const skipDebug = true;
for (const ll of clientLibLines) {
    const line = ll.trimRight();

    if (line.includes(' = $I') && line.charAt(0) !== ' ') {
        if (line.indexOf('constructor') > -1) {
            continue;
        }
        // CLientLib.Army.Foo = function() { ... }
        if (line.startsWith('ClientLib')) {
            const lineData = line
                .trim()
                .replace(';', '')
                .split(' = $I.');

            if (lineData.length > 2) {
                throw new Error('Werid ClientLibLine: ' + line);
            }

            ClientLibMapping.set(lineData[1], lineData[0]);
            continue;
        }

        // Attempt to find internal protonames
        const protoMatch = line.match(protoRegexp) || line.match(staticRegexp);
        if (protoMatch != null) {
            const [fullLine, targetProto, functionName, otherProto, sourceFunctionName] = protoMatch;

            const otherMapping = Mappings.get(sourceFunctionName);
            if (otherMapping) {
                // Already a mapping but uses the same name so we can use it
                if (otherMapping == functionName) {
                    skipDebug || console.log('\n\nDuplicateFine', sourceFunctionName, ' -> ', functionName);
                    continue;
                }
                // Duplicate obfuscated key, we cannot just replace these
                // TODO need to do a context aware replacement for this
                Dupes.set(sourceFunctionName, true);
                Mappings.delete(sourceFunctionName);

                skipDebug || console.log('DupeMapping', functionName, targetProto, Mappings.get(sourceFunctionName));
            }

            // Known duplicate ignore
            if (Dupes.has(sourceFunctionName)) {
                continue;
            }
            Mappings.set(sourceFunctionName, functionName);
            continue;
        }
    }
}

function replaceMatch(line: string, match: string) {
    let output = line;
    const clientMap = ClientLibMapping.get(match);
    if (clientMap != null) {
        const re = new RegExp(`\\$I.${match}`, 'g');
        output = line.replace(re, clientMap);
        if (output.trim() == `${clientMap} = ${clientMap};`) {
            output = '';
        }

        if (output.includes(`${match}`)) {
            console.log('StillMatching', line, '->', output, match);
        }
    }
    const functionName = Mappings.get(match);
    if (functionName != null) {
        const re = new RegExp(match, 'g');
        output = line.replace(re, functionName);
    }

    return output;
}

const toReplace = /([A-Z]{6})/g;

function writeDeObs() {
    const outputClientLib: string[] = ['#!/usr/bin/env node'];
    const outputQx: string[] = ['#!/usr/bin/env node'];
    let output = outputClientLib;
    /** Wait till we find the first usage of ClientLib ignore all lines till that point */
    let foundClientLib = false;
    for (const line of clientLibLines) {
        // Qx data has started, split into separate file
        if (line.startsWith('(function()')) {
            output = outputQx;
        }
        // Skip the GAMEDATA at the start of the file
        if (!foundClientLib) {
            if (line.startsWith('if (typeof($I)')) {
                foundClientLib = true;
            } else {
                continue;
            }
        }
        // Useless line, just remove
        if (line.trim() == 'var $createHelper;') {
            continue;
        }

        let curLine = line;
        const matches = line.match(toReplace);
        if (matches) {
            for (const match of matches) {
                curLine = replaceMatch(curLine, match);
            }
        }

        // Emptyline skip
        if (curLine == '') {
            continue;
        }

        // Once debosfucated the lines will sometimes reference themselves.
        // ClientLib.Army.Foo = ClientLib.Army.Foo
        if (curLine.startsWith('ClientLib') && curLine.includes(' = ')) {
            const parts = curLine.split(' = ');
            if (parts.length == 2) {
                if (parts[0] + ';' == parts[1].trim()) {
                    continue;
                }
            }
        }

        // if (line.includes('$I')){
        //     for (const replace of replacements) {
        //         if (line.includes(`$I.${replace}`)) {
        //             line = line.replace(/\$I.${replace}/g, CL_MAPPING[replace])
        //         }
        //     }
        // }
        // if (curLine.length > 1000) {
        //     break;
        // }
        // if (curLine != line) {
        //     console.log(line.trim(), curLine.trim())
        // }
        output.push(curLine);
    }

    console.log('OutputLines', { clientLib: outputClientLib.length, qx: outputQx.length });
    const currentDay = new Date().toISOString().substr(0, 10);
    fs.writeFileSync(`${OutputPath}/${currentDay}-clientlib.js`, outputClientLib.join('\n'));
    fs.writeFileSync(`${OutputPath}/${currentDay}-qx.js`, outputQx.join('\n'));
}

console.log('Mappings', Mappings.size);
console.log('ClientLibMappings', ClientLibMapping.size);
console.log('DupeIds', Dupes.size);
writeDeObs();
