//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Application = require('../../Application');
var Class = require('../../../Class');
var Compiler = require('../../Compiler');
var DependencyManager = require('../dependency/DependencyManager');
var ICompilerModule = require('../ICompilerModule');
var List = require('../../../List');
var Map = require('../../../Map');
var Obj = require('../../../Obj');
var OutputFile = require('../../OutputFile');
var Set = require('../../../Set');
var SourceFile = require('../../source/SourceFile');
var SourceString = require('../../source/SourceString');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

// NOTE BRN: Output generation is one of the few operations that we currently perform all at once. Since file writing
// is expensive, we wait till we are given the green light and then perform one full walk of the application output
// nodes.

var OutputNodeJsModule = Class.extend(Obj, {

    //-------------------------------------------------------------------------------
    // Constructor
    //-------------------------------------------------------------------------------

    _constructor: function() {

        this._super();


        //-------------------------------------------------------------------------------
        // Declare Variables
        //-------------------------------------------------------------------------------

        //TODO BRN: Filling this reference should be broken out in to an IOC style container system supported by
        // annotate js, instead of reaching out to the compiler to grab our reference.

        /**
         * @private
         * @type {DependencyManager}
         */
        this.dependencyManager = null;

        /**
         * @private
         * @type {Directory}
         */
        this.outputDirectory = null;

        /**
         * @private
         * @type {Set<OutputFile>}
         */
        this.outputFileSet = new Set();
    },


    //-------------------------------------------------------------------------------
    // Getters and Setters
    //-------------------------------------------------------------------------------


    //-------------------------------------------------------------------------------
    // ICompilerModule Implementation
    //-------------------------------------------------------------------------------

    /**
     * @return {string}
     */
    getModuleName: function() {
        return OutputNodeJsModule.MODULE_NAME;
    },

    /**
     * @param {Compiler} compiler
     */
    initialize: function(compiler) {
        this.outputDirectory = compiler.getCompilerProperties().getProperty('outputDirectory');

        // TODO BRN: We should be using a Spring style injection of dependencies instead of having to grab dependencies
        // from the compiler like this. We'll have to wait until we have completed the first version of the compiler
        // though so that we can use annotations for declaring our dependencies.

        this.dependencyManager = compiler.getCompilerModule(DependencyManager.MODULE_NAME);
        this.dependencyManager.addEventListener(DependencyManager.EventType.DEPENDENCIES_UPDATED,
            this.hearDependencyManagerDependenciesUpdatedEvent, this);

        var application = compiler.getApplication();
        application.addEventListener(Application.EventType.SCRIPT_ADDED,
            this.hearApplicationScriptAddedEvent, this);
        application.addEventListener(Application.EventType.SCRIPT_REMOVED,
            this.hearApplicationScriptRemovedEvent, this);
    },


    //-------------------------------------------------------------------------------
    // Private Class Methods
    //-------------------------------------------------------------------------------

    /**
     * @private
     * @param {OutputFile} outputFile
     */
    addOutputFile: function(outputFile) {
        this.outputFileSet.add(outputFile);
        outputFile.createFile();
    },

    /**
     * @private
     * @param {Script} script
     * @return {string}
     */
    generateOutputFileFromScript: function(script) {
        var relativeOutputFilePath = "";
        var sourceOrigin = script.getSourceOrigin();
        if (Class.doesExtend(sourceOrigin, SourceFile)) {
            relativeOutputFilePath = sourceOrigin.getHomePath();
        } else if (Class.doesExtend(sourceOrigin, SourceString)) {
            relativeOutputFilePath = sourceOrigin.getName();
        }

        if (relativeOutputFilePath.length === 0) {
            throw new Error("File path is empty");
        }
        if (relativeOutputFilePath.substr(0, 1) === '/') {
            relativeOutputFilePath = relativeOutputFilePath.substr(1);
            if (relativeOutputFilePath.length === 0) {
                throw new Error("File path is empty");
            }
        } else if (relativeOutputFilePath.substr(0, 1) === '.') {
            throw new Error("Output file path should be in the format of dir/dir/name. '.' and '..' are not " +
                "supported. All files are relative to the output directory specified when starting the compiler.");
        }
        return new OutputFile(this.outputDirectory, relativeOutputFilePath);
    },

    /**
     * @private
     * @param {OutputFile} outputFile
     * @return {boolean}
     */
    hasOutputFile: function(outputFile) {
        return this.outputFileSet.contains(outputFile);
    },

    /**
     * @private
     * @param {Script} addedScript
     */
    processAddedScript: function(addedScript) {
        var outputFile = this.generateOutputFileFromScript(addedScript);

        // TODO BRN: This should be converted in to a CompilerError and added to the ErrorManager so that the compiler
        // will handle this situation gracefully instead of bombing out. To do this correctly we would need to track
        // the map between output files and scripts. This way if there is more than one per script we know to remove
        // the error once one of the conflicting scripts has been removed.

        if (this.hasOutputFile(outputFile)) {
            throw new Error("An output file already exists at this location. Likely there is a script conflict. One or" +
                " more scripts is trying to write to the same output location.");
        } else {
            this.addOutputFile(outputFile);
        }
    },

    /**
     * @private
     * @param removedScript
     */
    processRemovedScript: function(removedScript) {
        var outputFile = this.generateOutputFileFromScript(removedScript);
        this.removeOutputFile(outputFile);
    },

    /**
     * @private
     * @param {OutputFile} outputFile
     */
    removeOutputFile: function(outputFile) {
        this.outputFileSet.remove(outputFile);
        outputFile.deleteFile();
    },

    /**
     * @private
     */
    writeOutput: function() {
        var _this = this;
        var scriptList = this.dependencyManager.getScriptsInDependentOrder();
        scriptList.forEach(function(script) {
            var outputFile = _this.generateOutputFileFromScript(script);
            var scriptExportName = _this.dependencyManager.getScriptExportName(script);
            var requiredScriptList = _this.dependencyManager.getRequiredScriptsOfScript(script);
            if (!_this.hasOutputFile(outputFile)) {
                throw new Error("No output file is present for script");
            }

            var requireOutput = "";
            requiredScriptList.forEach(function(requiredScript) {
                var requiredOutputFile = _this.generateOutputFileFromScript(requiredScript);
                var requiredScriptExportName = _this.dependencyManager.getScriptExportName(requiredScript);
                requireOutput += "var " + requiredScriptExportName + " = require(\"" +
                    outputFile.getFilePathToAnotherFile(requiredOutputFile) + "\");\n";
            });

            var sourceOutput = script.getSource() + "\n";
            var exportOutput = "";
            if (scriptExportName) {
                exportOutput = "module.exports = " + scriptExportName + ";\n";
            }
            outputFile.writeFile(requireOutput + sourceOutput + exportOutput);
        });
    },


    //-------------------------------------------------------------------------------
    // Event Listeners
    //-------------------------------------------------------------------------------

    /**
     * @private
     * @param {Event} event
     */
    hearApplicationScriptAddedEvent: function(event) {
        var script = event.getData();
        this.processAddedScript(script);
    },

    /**
     * @private
     * @param {Event} event
     */
    hearApplicationScriptRemovedEvent: function(event) {
        var script = event.getData();
        this.processRemovedScript(script);
    },

    // TODO BRN: We should decouple the task of generating output from the dependencyManager. Instead of listening
    // for the DependencyManager, we should listen to some global controller of output that lets us know when we
    // should write out our output.

    /**
     * @private
     * @param {Event} event
     */
    hearDependencyManagerDependenciesUpdatedEvent: function(event) {

        //TEST
        console.log("Dependencies updated: writing output");
        if (!this.dependencyManager.isDependenciesError()) {
            this.writeOutput();
        } else {
            console.log("There is an error in the dependencies");
        }
    }
});
Class.implement(OutputNodeJsModule, ICompilerModule);


//-------------------------------------------------------------------------------
// Static Variables
//-------------------------------------------------------------------------------

OutputNodeJsModule.MODULE_NAME = "OutputNodeJsModule";


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = OutputNodeJsModule;
