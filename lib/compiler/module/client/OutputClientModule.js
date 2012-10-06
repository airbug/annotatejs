//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Class = require('../../../Class');
var Compiler = require('../../Compiler');
var DependencyManager = require('../dependency/DependencyManager');
var ICompilerModule = require('../ICompilerModule');
var Map = require('../../../Map');
var Obj = require('../../../Obj');
var OutputFile = require('../../OutputFile');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

// NOTE BRN: Output generation is one of the few operations that we currently perform all at once. Since file writing
// is expensive, we wait till we are given the green light and then perform one full walk of the application output
// nodes.

var OutputClientModule = Class.extend(Obj, {

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
         * @type {OutputFile}
         */
        this.outputFile = null;
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
        return OutputClientModule.MODULE_NAME;
    },

    /**
     * @param {Compiler} compiler
     */
    initialize: function(compiler) {
        this.createOutputFile(compiler.getCompilerProperties().getProperty('outputDirectory'),
            compiler.getCompilerProperties().getProperty('outputFileName'));

        // TODO BRN: We should be using a Spring style injection of dependencies instead of having to grab dependencies
        // from the compiler like this. We'll have to wait until we have completed the first version of the compiler
        // though so that we can use annotations for declaring our dependencies.

        this.dependencyManager = compiler.getCompilerModule(DependencyManager.MODULE_NAME);

        this.dependencyManager.addEventListener(DependencyManager.EventTypes.DEPENDENCIES_UPDATED,
            this.hearDependencyManagerDependenciesUpdatedEvent, this);
    },


    //-------------------------------------------------------------------------------
    // Private Class Methods
    //-------------------------------------------------------------------------------

    /**
     * @private
     * @param {Directory} outputDirectory
     * @param {string} relativeFilePath
     */
    createOutputFile: function(outputDirectory, relativeFilePath) {
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
        this.outputFile = new OutputFile(outputDirectory, relativeFilePath);
    },

    /**
     * @private
     */
    writeOutput: function() {
        var scriptList = this.dependencyManager.getScriptsInDependentOrder();
        var output = "";
        scriptList.forEach(function(script) {
            var source = script.getSource();
            output += source;
        });
        this.outputFile.writeFile(output);
    },


    //-------------------------------------------------------------------------------
    // Event Listeners
    //-------------------------------------------------------------------------------

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
Class.implement(OutputClientModule, ICompilerModule);


//-------------------------------------------------------------------------------
// Static Variables
//-------------------------------------------------------------------------------

OutputClientModule.MODULE_NAME = "OutputClientModule";


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = OutputClientModule;
