require('./scripts')

function characterScript(code) {
    for (let script of SCRIPTS) {
        if (script.ranges.some(([from, to]) => {
        return code >= from && code < to;
        })) {
        return script;
        }
    }
    return null;
}

  
// This makes sure the data is exported in node.js —
// `require('./path/to/scripts.js')` will get you the array.
if (typeof module != "undefined" && module.exports && (typeof window == "undefined" || window.exports != exports))
    module.exports = characterScript;
if (typeof global != "undefined" && !global.characterScript)
    global.characterScript = characterScript;