//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var fs = require('fs');

var Class = require('../Class');
var Directory = require('./Directory');
var File = require('./File');
var StringUtil = require('../StringUtil');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var OutputFile = Class.extend(File, {

    //-------------------------------------------------------------------------------
    // Constructor
    //-------------------------------------------------------------------------------

    _constructor: function(outputDirectory, relativeOutputFilePath) {

        this._super(outputDirectory.getAbsoluteDirectoryPath() + relativeOutputFilePath);


        //-------------------------------------------------------------------------------
        // Declare Variables
        //-------------------------------------------------------------------------------

        /**
         * @private
         * @type {Directory}
         */
        this.outputDirectory  = outputDirectory;

        /**
         * @private
         * @type {string}
         */
        this.relativeOutputFilePath = relativeOutputFilePath;
    },


    //-------------------------------------------------------------------------------
    // Getters and Setters
    //-------------------------------------------------------------------------------

    /**
     * @return {string}
     */
    getRelativeFilePath: function() {
        return this.relativeOutputFilePath;
    },


    //-------------------------------------------------------------------------------
    // Class Methods
    //-------------------------------------------------------------------------------

    /**
     *
     */
    deleteFile: function() {
        this._super();
        this.deleteEmptyOutputFileDirectories();
    },


    //-------------------------------------------------------------------------------
    // Private Class Methods
    //-------------------------------------------------------------------------------

    /**
     * @private
     */
    deleteEmptyOutputFileDirectories: function() {
        var directory = this.getParentDirectory();
        this.deleteEmptyOutputFileDirectoryRecursive(directory);
    },

    /**
     * @private
     */
    deleteEmptyOutputFileDirectoryRecursive: function(directory) {
        if (!Obj.equals(directory, this.outputDirectory) && directory.isDirectoryEmpty()) {
            directory.deleteDirectory();
            var parentDirectory = directory.getParentDirectory();
            this.deleteEmptyOutputFileDirectoryRecursive(parentDirectory);
        }
    }
});


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = OutputFile;
