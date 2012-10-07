//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var fs = require('fs');

var Class = require('../Class');
var Directory = require('./Directory');
var Obj = require('../Obj');
var List = require('../List');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

//TODO BRN: Rewrite this class using the built in 'path' module

var File = Class.extend(Obj, {

    //-------------------------------------------------------------------------------
    // Constructor
    //-------------------------------------------------------------------------------

    _constructor: function(absoluteFilePath) {

        this._super();


        //-------------------------------------------------------------------------------
        // Declare Variables
        //-------------------------------------------------------------------------------

        /**
         * @private
         * @type {string}
         */
        this.absoluteFilePath = absoluteFilePath;
    },


    //-------------------------------------------------------------------------------
    // Getters and Setters
    //-------------------------------------------------------------------------------

    /**
     * @return {string}
     */
    getAbsoluteFilePath: function() {
        return this.absoluteFilePath;
    },

    /**
     * @return {string}
     */
    getFileName: function() {

        //TODO BRN: This could be sped up by caching the result of this parse.

        var absoluteFilePath = this.getAbsoluteFilePath();
        var fileName = absoluteFilePath.substr(absoluteFilePath.lastIndexOf('/') + 1);
        return fileName;
    },

    /**
     * @param {File} toFile
     * @return {string}
     */
    getFilePathToAnotherFile: function(toFile) {

        //TODO BRN: WOW, stop being an idiot and use the built in 'path' module that already does all of this...

        var finalPath = '';
        var toFileDirectoryList = new List();
        var toFileDirectory = toFile.getParentDirectory();
        toFileDirectoryList.add(toFileDirectory);

        var currentDirectory = toFileDirectory;
        while (currentDirectory.hasParentDirectory()) {
            currentDirectory = currentDirectory.getParentDirectory();
            toFileDirectoryList.addAt(0, currentDirectory);
        }

        var fromFileDirectory = this.getParentDirectory();
        var commonDirectory = undefined;
        if (toFileDirectoryList.contains(fromFileDirectory)) {
            finalPath += './';
            commonDirectory = fromFileDirectory;
        } else {
            currentDirectory = fromFileDirectory;
            while (currentDirectory.hasParentDirectory()) {
                currentDirectory = currentDirectory.getParentDirectory();
                finalPath += '../';
                if (toFileDirectoryList.contains(currentDirectory)) {
                    commonDirectory = currentDirectory;
                    break;
                }
            }
        }
        var remainingToPath = toFile.getAbsoluteFilePath().replace(commonDirectory.getAbsoluteDirectoryPath(), '');

        return finalPath + remainingToPath;
    },


    //-------------------------------------------------------------------------------
    // Object Implementation
    //-------------------------------------------------------------------------------

    /**
     * @param {*} value
     * @return {boolean}
     */
    equals: function(value) {
        if (Class.doesExtend(value, File)) {
            return (value.getAbsoluteFilePath() === this.getAbsoluteFilePath());
        }
        return false;
    },

    /**
     * @return {number}
     */
    hashCode: function() {
        if (!this._hashCode) {
            this._hashCode = Obj.hashCode("[File]" + Obj.hashCode(this.getAbsoluteFilePath()));
        }
        return this._hashCode;
    },


    //-------------------------------------------------------------------------------
    // Class Methods
    //-------------------------------------------------------------------------------

    /**
     *
     */
    createFile: function() {

        // TODO BRN: We could speed this up here by not creating sync. We'd have to figure out what to do if two writes
        // were requested by the compiler.

        this.ensureFileDirectory();
        var absoluteFilePath = this.getAbsoluteFilePath();
        fs.writeFileSync(absoluteFilePath, "");
    },

    /**
     *
     */
    deleteFile: function() {
        // TODO BRN: We could speed this up here by not removing sync. We'd have to figure out what to do if two writes
        // were requested by the compiler.

        var absoluteFilePath = this.getAbsoluteFilePath();
        if (fs.existsSync(absoluteFilePath)) {
            fs.unlinkSync(absoluteFilePath);
        }
    },

    /**
     * @return {Directory}
     */
    getParentDirectory: function() {
        var absoluteFilePath = this.getAbsoluteFilePath();
        var absoluteDirectoryPath = absoluteFilePath.substring(0, absoluteFilePath.lastIndexOf('/') + 1);
        return new Directory(absoluteDirectoryPath);
    },

    /**
     * @param {string} data
     */
    writeFile: function(data) {

        // TODO BRN: We could speed this up here by not writing sync. We'd have to figure out what to do if two writes
        // were requested by the compiler.

        fs.writeFileSync(this.getAbsoluteFilePath(), data);
    },


    //-------------------------------------------------------------------------------
    // Private Class Methods
    //-------------------------------------------------------------------------------

    /**
     * @private
     */
    ensureFileDirectory: function() {
        var directory = this.getParentDirectory();
        directory.createDirectory(true);
    }
});


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = File;
