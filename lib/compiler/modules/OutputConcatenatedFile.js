//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Class = require('../../Class');
var Compiler = require('../Compiler');
var DependencyManager = require('./DependencyManager');
var ICompilerModule = require('./ICompilerModule');
var Obj = require('../../Obj');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

// NOTE BRN: Output generation is one of the few operations that we currently perform all at once. Since file writing
// is expensive, we wait till we are given the green light and then perform one full walk of the application output
// nodes.

var OutputConcatenatedFile = Class.extend(Obj, {

    //-------------------------------------------------------------------------------
    // Constructor
    //-------------------------------------------------------------------------------

    _constructor: function() {

        this._super();


        //-------------------------------------------------------------------------------
        // Declare Variables
        //-------------------------------------------------------------------------------

        this.dependencyManager = null;

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
        return OutputConcatenatedFile.MODULE_NAME;
    },

    /**
     * @param {Compiler} compiler
     */
    initialize: function(compiler) {
        //TODO BRN: Make the name of this file configurable

        this.outputFile = compiler.getApplication().createOutputFile("app.js");

        // TODO BRN: We should be using a Spring style injection of dependencies instead of having to grab dependencies
        // from the compiler like this. We'll have to wait until we have completed the first version of the compiler
        // though so that we can use annotations for declaring our dependencies.

        this.dependencyManager = compiler.getCompilerModule(DependencyManager.MODULE_NAME);

        compiler.addEventListener(DependencyManager.EventTypes.DEPENDENCIES_UPDATED,
            this.hearDependencyManagerDependenciesUpdatedEvent, this);
    },


    //-------------------------------------------------------------------------------
    // Private Class Methods
    //-------------------------------------------------------------------------------

    writeOutput: function() {
        var scriptList = this.dependencyManager.getScriptsInDependentOrder();
        var output = "";
        scriptList.forEach(function(script) {
            var source = script.getSourceFile().getSource();
            output += source;
        });
        this.outputFile.writeFile(output);
    },


    //-------------------------------------------------------------------------------
    // Event Listeners
    //-------------------------------------------------------------------------------

    /**
     * @private
     * @param {Event} event
     */
    hearDependencyManagerDependenciesUpdatedEvent: function(event) {

        // TODO BRN: Check the ErrorManager for errors before outputting code. If there are errors, we shouldn't
        // write to the output files.

        this.writeOutput();
    }
});
Class.implement(OutputConcatenatedFile, ICompilerModule);


//-------------------------------------------------------------------------------
// Static Variables
//-------------------------------------------------------------------------------

OutputConcatenatedFile.MODULE_NAME = "OutputConcatenatedFile";


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = OutputConcatenatedFile;
