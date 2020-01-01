import { pack, NccOutput } from './pack';
import { Config } from './config';

const ExtensionHeader = `// ==UserScript==
// @name            Shockr - Tiberium Alliances Tools
// @author          Shockr <shockr@chard.com>
// @description     Tools to work with Tiberium alliances ${Config.baseUrl}
// @include         http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include         http*://cncapp*.alliances.commandandconquer.com/*/index.aspx*
// @grant           GM_updatingEnabled
// @grant           unsafeWindow
// @version         ${Config.version}
// @downloadURL     ${Config.baseUrl}/extension/st.user.js
// @icon            ${Config.baseUrl}/${Config.icon}
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
    const lines = output.code
        .replace('require("crypto");', 'null;')
        .split('\n')
        // Remove source map
        .filter(f => !f.startsWith('//# sourceMappingURL='));
    lines.shift();

    output.code = `${ExtensionHeader}\n${makeInjector(lines.join('\n'))}`;
    return output;
}

pack('./packages/st-extension/build/index.js', './dist/extension/st.user.js', [], makeExtension).catch(e =>
    console.log(e),
);
