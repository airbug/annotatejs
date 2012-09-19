//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Class = require('../Class');
var Event = require('../Event');
var EventDispatcher = require('../EventDispatcher');
var List = require('../List');
var Map = require('../Map');
var OutputFile = require('./OutputFile');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var Application = Class.extend(EventDispatcher, {

    //-------------------------------------------------------------------------------
    // Constructor
    //-------------------------------------------------------------------------------

    _constructor: function() {

        this._super();


        //-------------------------------------------------------------------------------
        // Declare Variables
        //-------------------------------------------------------------------------------

        /**
         * @private
         * @type {Directory}
         */
        this.outputDirectory = null;

        // NOTE BRN: The input files should never be modified except by the user who is writing code. The output files
        // can be modified by the compiler.

        /**
         * @private
         * @type {List<Script>}
         */
        this.inputScriptList = new List();

        /**
         * @private
         * @type {Map<string, OutputFile>}
         */
        this.relativeFilePathToOutputFileMap = new Map();
    },


    //-------------------------------------------------------------------------------
    // Getters and Setters
    //-------------------------------------------------------------------------------

    /**
     * @return {Directory}
     */
    getOutputDirectory: function() {
        return this.outputDirectory;
    },

    /**
     * @param {Directory} outputDirectory
     */
    setOutputDirectory: function(outputDirectory) {
        this.outputDirectory = outputDirectory;
    },


    //-------------------------------------------------------------------------------
    // Class Methods
    //-------------------------------------------------------------------------------

    /**
     * All output paths are relative to the output directory specified when starting the compiler. '.' and '..' are
     * not supported.
     * @param relativeFilePath
     * @return {OutputFile}
     */
    createOutputFile: function(relativeFilePath) {
        if (relativeFilePath.length === 0) {
            throw new Error("File path is empty");
        }
        if (relativeFilePath.substr(0, 1) === '/') {
            relativeFilePath = relativeFilePath.substr(1);
            if (relativeFilePath.length === 0) {
                throw new Error("File path is empty");
            }
        } else if (relativeFilePath.substr(0, 1) === '.') {
            throw new Error("Output file path should be in the format of dir/dir/name. '.' and '..' are not " +
                "supported. All files are relative to the output directory specified when starting the compiler.");
        }
        var outputFilePath = this.outputDirectory.getPath() + relativeFilePath;
        var outputFile = new OutputFile(outputFilePath);
        this.relativeFilePathToOutputFileMap.put(relativeFilePath, outputFile);
        return outputFile;
    },

    /**
     * @param relativeFilePath
     * @return {OutputFile}
     */
    getOutputFile: function(relativeFilePath) {
        return this.relativeFilePathToOutputFileMap.get(relativeFilePath);
    },

    /**
     * @param {Script} script
     */
    addScript: function(script) {
        if (!this.inputScriptList.contains(script)) {
            this.inputScriptList.add(script);
        }
        this.dispatchEvent(new Event(Application.EventTypes.SCRIPT_ADDED, script));
    },

    /**
     * @param {Script} script
     */
    removeScript: function(script) {
        //TODO BRN:
    }
});


//-------------------------------------------------------------------------------
// Static Variables
//-------------------------------------------------------------------------------

Application.EventTypes = {
    SCRIPT_ADDED: "Application:ScriptAdded",
    SCRIPT_REMOVED: "Application:ScriptRemoved"
};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = Application;
