//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Class = require('./Class');
var Obj = require('./Obj');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var StringUtil = Class.extend(Obj, {});


//-------------------------------------------------------------------------------
// Static Methods
//-------------------------------------------------------------------------------

/**
 * @static
 * @param {string} content
 */
StringUtil.indent = function(content) {
    var output = "";
    var contentParts = content.split("\n");
    for (var i = 0, size = contentParts.length; i < size; i++) {
        var contentPart = contentParts[i];
        output += "  " + contentPart + "\n";
    }
    return output;
};

/**
 * @static
 * @param {string} str
 * @return {string}
 */
StringUtil.trim = function(str, pattern) {
    if (pattern === undefined) {
        pattern = '\s';
    }
    return str.replace(new RegExp('^' + pattern + pattern + '*', 'g'), '').replace(new RegExp(pattern + pattern + '*$', 'g'), '');
};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = StringUtil;
