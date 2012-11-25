//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var fs = require('fs');

var Class = require('../../Class');
var HashUtil = require('../../HashUtil');
var ISourceOrigin = require('./ISourceOrigin');
var Obj = require('../../Obj');
var TypeUtil = require('../../TypeUtil');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var SourceFile = Class.extend(Obj, {

    //-------------------------------------------------------------------------------
    // Constructor
    //-------------------------------------------------------------------------------

    _constructor: function(filePath, sourceHome) {

        this._super();


        //-------------------------------------------------------------------------------
        // Declare Variables
        //-------------------------------------------------------------------------------

        /**
         * @private
         * @type {string}
         */
        this.source = null;

        /**
         * @private
         * @type {string}
         */
        this.filePath = fs.realpathSync(filePath);

        /**
         * @private
         * @type {string}
         */
        this.homePath = this.parseHomePath(sourceHome);
    },


    //-------------------------------------------------------------------------------
    // Getters and Setters
    //-------------------------------------------------------------------------------

    /**
     * @return {string}
     */
    getFilePath: function() {
        return this.filePath;
    },

    /**
     * @return {string}
     */
    getHomePath: function() {
        return this.homePath;
    },


    //-------------------------------------------------------------------------------
    // ISourceOrigin Implementation
    //-------------------------------------------------------------------------------

    getSource: function() {
        if (TypeUtil.isNull(this.source)) {
            this.loadSource();
        }
        return this.source;
    },


    //-------------------------------------------------------------------------------
    // IHashCode Implementation
    //-------------------------------------------------------------------------------

    /**
     * @return {number}
     */
    hashCode: function() {
        if (!this._hashCode) {
            this._hashCode = HashUtil.hash("[SourceFile]" + this.filePath);
        }
        return this._hashCode;
    },

    /**
     * @return {string}
     */
    toString: function() {
        var output = "";
        output += "[SourceFile] {\n";
        output += "  filePath:" + this.filePath + "\n";
        output += "}";
        return output;
    },


    //-------------------------------------------------------------------------------
    // Private Class Methods
    //-------------------------------------------------------------------------------

    /**
     * @private
     */
    loadSource: function() {
        //TODO BRN: Instead of loading the entire soource and storing it in a string, the parser should open a stream
        // to the file and process it a few parts at a time.
        var stat = fs.statSync(this.filePath);
        if (stat.isFile()) {
            if (this.filePath.lastIndexOf('.js') === this.filePath.length - 3) {
                this.source = fs.readFileSync(this.filePath, 'utf8');
            } else {
                throw new Error(this.filePath + " is not a javascript file");
            }
        } else {
            throw new Error(this.filePath + " is not a file");
        }
    },

    /**
     * @private
     * @param {string} sourceHome
     * @return {string}
     */
    parseHomePath: function(sourceHome) {
        var homePath = this.filePath.replace(sourceHome.getPath(), "");
        if (homePath.substr(0, 1) === '/') {
            homePath = homePath.substr(1);
        }
        return homePath;
    }
});
Class.implement(SourceFile, ISourceOrigin);

//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = SourceFile;
