//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var fs = require('fs');

var Class = require('../Class');
var HashUtil = require('../HashUtil');
var List = require('../List');
var Set = require('../Set');
var SourceFile = require('./SourceFile');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var SourcePath = Class.declare({

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
    // IHashcode Implementation
    //-------------------------------------------------------------------------------

    /**
     * @return {string}
     */
    hashcode: function() {
        if (!this._hashcode) {
            this._hashcode = "[SourcePath]" + HashUtil.hash(this.path);
        }
        return this._hashcode;
    },


    //-------------------------------------------------------------------------------
    // Class Methods
    //-------------------------------------------------------------------------------

    /**
     * @return {Set<SourceFile>}
     */
    getSourceFiles: function() {
        var sourceFilePathList = this.scanPathForSourceFilePaths();
        var _this = this;
        sourceFilePathList.forEach(function(sourceFilePath) {
            var sourceFile = new SourceFile(sourceFilePath);
            if (!_this.sourceFileSet.contains(sourceFile)) {
                _this.sourceFileSet.add(sourceFile);
            }
        });
        return this.sourceFileSet;
    },

    /**
     * @return {List<string>}
     */
    scanPathForSourceFilePaths: function() {
        var sourcePathList = new List();
        var fileStringArray = fs.readdirSync(this.path);
        for (var i = 0, size = fileStringArray.length; i < size; i++) {
            var pathString = this.path + "/" + fileStringArray[i];
            var stat = fs.statSync(pathString);
            if (stat.isDirectory()) {
                var childModulePathList = scanDirectoryForSourceFiles(pathString);
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

module.exports = SourcePath;
