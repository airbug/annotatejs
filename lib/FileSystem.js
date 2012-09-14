/**
 * The purpose of this class is to be a simple pass through that can be overridden during testing so that we can
 * prevent requiring the actual file system. When testing, these methods should be overridden using the Sinon framework
 */

//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var fs = require('fs');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var FileSystem = {};


//-------------------------------------------------------------------------------
// Static Methods
//-------------------------------------------------------------------------------

FileSystem.rename = function(oldPath, newPath, callback) {
    fs.rename(oldPath, newPath, callback);
};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = FileSystem;
