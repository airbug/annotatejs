/**
 * NOTE BRN: This class differs from the HashUtil class by trying to access the native hashcode function of any object
 * that extends the base level Object class. We broke this out in to a separate class because if it's placed in the
 * HashUtil class it causes a circular dependency with Class.js
 */


//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Class = require('./Class');
var HashUtil = require('./HashUtil');
var IHashcode = require('./IHashcode');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var HashcodeUtil = Class.declare({});


//-------------------------------------------------------------------------------
// Static Methods
//-------------------------------------------------------------------------------

/**
 * @param {*} value
 * @return {string}
 */
HashcodeUtil.hashcode = function(value) {
    if (Class.doesImplement(value, IHashcode)) {
        return value.hashcode();
    } else {
        return HashUtil.hash(value);
    }
};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = HashcodeUtil;
