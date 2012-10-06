//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var fs = require('fs');

var Class = require('../Class');
var Directory = require('./Directory');
var Obj = require('../Obj');
var List = require('../List');
var StringUtil = require('../StringUtil');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

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
        /*var commonPath = '/';
        var targetDirectoryPath = StringUtil.trim(targetFile.getParentDirectory().getAbsoluteDirectoryPath(), '/');
        var myDirectoryPath = StringUtil.trim(this.getParentDirectory().getAbsoluteDirectoryPath(), '/');
        var targetDirectoryPathParts = targetDirectoryPath.split('/');
        var myDirectoryPathParts = myDirectoryPath.split('/');

        for (var i = 0, size = myDirectoryPathParts.length, size2 = targetDirectoryPathParts.length; i < size && i < size2; i++) {
            var myDirectoryPathPart = myDirectoryPathParts[i];
            if (myDirectoryPathPart === targetDirectoryPathParts[i]) {
                commonPath += myDirectoryPathPart + '/';
            } else {
                break;
            }
        }

        var targetFilePathDifference = StringUtil.trim(targetFile.getAbsoluteFilePath().replace(commonPath, ''), '/');
        var myDirectoryPathDifference = StringUtil.trim(myDirectoryPath.replace(commonPath, ''), '/');
        var myFilePathDifferenceParts = myDirectoryPathDifference.split('/');

        var finalPath = '';
        myFilePathDifferenceParts.forEach(function() {
            finalPath += '../';
        });
        finalPath += targetFilePathDifference;
        return finalPath;*/

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
        directory.createDirectory();
    }
});


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = File;
