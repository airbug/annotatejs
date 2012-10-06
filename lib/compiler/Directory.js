//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var fs = require('fs');

var Class = require('../Class');
var Obj = require('../Obj');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var Directory = Class.extend(Obj, {

    //-------------------------------------------------------------------------------
    // Constructor
    //-------------------------------------------------------------------------------

    _constructor: function(absoluteDirectoryPath) {

        this._super();


        //-------------------------------------------------------------------------------
        // Declare Variables
        //-------------------------------------------------------------------------------

        /**
         * @private
         * @type {string}
         */
        this.absoluteDirectoryPath = this.pathFix(absoluteDirectoryPath);
    },


    //-------------------------------------------------------------------------------
    // Getters and Setters
    //-------------------------------------------------------------------------------

    /**
     * @return {string}
     */
    getAbsoluteDirectoryPath: function() {
        return this.absoluteDirectoryPath;
    },


    //-------------------------------------------------------------------------------
    // Object Implementation
    //-------------------------------------------------------------------------------

    /**
     * @param {*} value
     * @return {boolean}
     */
    equals: function(value) {
        if (Class.doesExtend(value, Directory)) {
            return (value.getAbsoluteDirectoryPath() === this.getAbsoluteDirectoryPath());
        }
        return false;
    },

    /**
     * @return {number}
     */
    hashCode: function() {
        if (!this._hashCode) {
            this._hashCode = Obj.hashCode("[Directory]" + Obj.hashCode(this.getAbsoluteDirectoryPath()));
        }
        return this._hashCode;
    },


    //-------------------------------------------------------------------------------
    // Class Methods
    //-------------------------------------------------------------------------------

    /**
     *
     */
    createDirectory: function() {
        if (!fs.existsSync(this.absoluteDirectoryPath)) {
            fs.mkdirSync(this.absoluteDirectoryPath);
        }
    },

    /**
     *
     */
    deleteDirectory: function() {
        if (fs.existsSync(this.absoluteDirectoryPath)) {
            fs.rmdirSync(this.absoluteDirectoryPath);
        }
    },

    /**
     * @return {Directory}
     */
    getParentDirectory: function() {
        if (this.hasParentDirectory()) {
            var absoluteDirectoryPath = this.getAbsoluteDirectoryPath();
            var parentDirectoryPath = absoluteDirectoryPath.substring(0,
                absoluteDirectoryPath.substr(0, absoluteDirectoryPath.length - 1).lastIndexOf('/'));
            return new Directory(parentDirectoryPath);
        }
        return undefined;
    },

    /**
     * @return {boolean}
     */
    hasParentDirectory: function() {
        var absoluteDirectoryPath = this.getAbsoluteDirectoryPath();
        return (absoluteDirectoryPath !== '/');
    },

    /**
     * @return {boolean}
     */
    isDirectoryEmpty: function() {
        var fileStringArray = fs.readdirSync(this.absoluteDirectoryPath);
        return (fileStringArray.length === 0);
    },


    //-------------------------------------------------------------------------------
    // Private Class Methods
    //-------------------------------------------------------------------------------

    /**
     * Make sure the path ends with '/'
     * @private
     * @param {string} path
     * @return {string}
     */
    pathFix: function(path) {
        if (path.length > 0) {
            if (path.substr(path.length - 1) !== '/') {
                path += '/';
            }
        } else {
            path += '/';
        }
        return path;
    }
});


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = Directory;
