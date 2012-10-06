//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var fs = require('fs');

var Class = require('../../Class');
var HashUtil = require('../../HashUtil');
var List = require('../../List');
var Obj = require('../../Obj');
var Set = require('../../Set');
var SourceFile = require('./SourceFile');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var SourceHome = Class.extend(Obj, {

    //-------------------------------------------------------------------------------
    // Constructor
    //-------------------------------------------------------------------------------

    _constructor: function(path) {

        this._super();


        //-------------------------------------------------------------------------------
        // Declare Variables
        //-------------------------------------------------------------------------------

        this.path = fs.realpathSync(path);

        this.sourceFileSet = new Set();
    },


    //-------------------------------------------------------------------------------
    // Getters and Setters
    //-------------------------------------------------------------------------------

    getPath: function() {
        return this.path;
    },


    //-------------------------------------------------------------------------------
    // IHashCode Implementation
    //-------------------------------------------------------------------------------

    /**
     * @return {number}
     */
    hashCode: function() {
        if (!this._hashCode) {
            this._hashCode = HashUtil.hash("[SourcePath]" + this.path);
        }
        return this._hashCode;
    },


    //-------------------------------------------------------------------------------
    // Class Methods
    //-------------------------------------------------------------------------------

    /**
     * @return {Set<SourceFile>}
     */
    getSourceFiles: function() {
        var sourceFilePathList = this.scanHomePathForSourceFilePaths();
        var _this = this;
        sourceFilePathList.forEach(function(sourceFilePath) {
            var sourceFile = new SourceFile(sourceFilePath, _this);
            if (!_this.sourceFileSet.contains(sourceFile)) {
                _this.sourceFileSet.add(sourceFile);
            }
        });
        return this.sourceFileSet;
    },

    /**
     * @return {List<string>}
     */
    scanHomePathForSourceFilePaths: function() {
        return this.scanDirectoryForSourceFiles(this.path);
    },

    /**
     * @param {string} directoryPathString
     * @return {List<string>}
     */
    scanDirectoryForSourceFiles: function(directoryPathString) {
        var sourcePathList = new List();
        var fileStringArray = fs.readdirSync(directoryPathString);
        for (var i = 0, size = fileStringArray.length; i < size; i++) {
            var pathString = directoryPathString + "/" + fileStringArray[i];
            var stat = fs.statSync(pathString);
            if (stat.isDirectory()) {
                var childModulePathList = this.scanDirectoryForSourceFiles(pathString);
                sourcePathList.addAll(childModulePathList);
            } else if (stat.isFile()) {
                if (pathString.lastIndexOf('.js') === pathString.length - 3) {
                    sourcePathList.add(pathString);
                }
            }
        }
        return sourcePathList;
    }
});


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = SourceHome;
