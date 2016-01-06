// ==UserScript==
// @name            Shockr - Tiberium Alliances Tools
// @author          Shockr <shockr@c.ac.nz>
// @description     Tools to work with Tiberium alliances http://c.ac.nz/taopt
// @include         http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @grant           GM_updatingEnabled
// @grant           unsafeWindow
// @version         5.0.0
// @downloadURL     https://c.ac.nz/client/st2.user.js
// @icon            https://c.ac.nz/favicon.png
// ==/UserScript==

function setupShockrTools() {
// import "build/extension.js"
};


function innerHTML(func) {
    return ('try {(  ' + func.toString() + ')()} catch(e) { console.log("Error start ST2", e);};');
}

if (window.location.pathname !== ('/login/auth')) {
    var script = document.createElement('script');
    script.innerHTML = innerHTML(setupShockrTools);
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);
}