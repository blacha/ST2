import { pack, NccOutput } from './pack';
import { Version } from '../version';

const ExtensionHeader = `// ==UserScript==
// @name            Shockr - Tiberium Alliances Tools
// @author          Shockr <shockr@chard.com>
// @description     Tools to work with Tiberium alliances https://shockrtools.web.app/
// @include         http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include         http*://cncapp*.alliances.commandandconquer.com/*/index.aspx*
// @grant           GM_updatingEnabled
// @grant           unsafeWindow
// @version         ${Version.version}
// @downloadURL     https://shockrtools.web.app/extension/st.user.js
// @icon            https://shockrtools.web.app/${Version.icon}
// ==/UserScript==`;

function makeInjector(code: string) {
    return `
function startSt() {
    ${code}
}
if (window.location.pathname !== ('/login/auth')) {
    var script = document.createElement('script');
    script.innerHTML = '(' + startSt.toString() + ')()';
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);
}`;
}

function makeExtension(output: NccOutput): NccOutput {
    const lines = output.code.replace('require("crypto");', 'null;').split('\n');
    lines.shift();

    output.code = `${ExtensionHeader}\n${makeInjector(lines.join('\n'))}`;
    return output;
}

pack('./build/src/extension/index.js', './dist/extension/st.user.js', [], makeExtension).catch(e => console.log(e));
