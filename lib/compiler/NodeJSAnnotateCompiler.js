//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var AnnotateCompiler = require('./AnnotateCompiler');
var Class = require('../Class');
var CompilerProperties = require('./CompilerProperties');
var Directory = require('./Directory');
var OutputNodeJsModule = require('./module/nodejs/OutputNodeJsModule');
var Set = require('../Set');
var SourceHome = require("./source/SourceHome");


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var NodeJsAnnotateCompiler = Class.extend(AnnotateCompiler, {

    //-------------------------------------------------------------------------------
    // Constructor
    //-------------------------------------------------------------------------------

    _constructor: function() {

        this._super();


        //-------------------------------------------------------------------------------
        // Declare Variables
        //-------------------------------------------------------------------------------

        this.addCompilerModule(new OutputNodeJsModule());
    }
});


//-------------------------------------------------------------------------------
// Static Methods
//-------------------------------------------------------------------------------

/**
 * @param {Array<string>} sourceHomePaths File paths to where your source code lives. Should be the root of your source files. Source files can be broken up in to multiple homes.
 * @param {string} outputPath
 */
NodeJsAnnotateCompiler.compile = function(sourceHomePaths, outputPath) {
    var sourceHomeSet = new Set();
    sourceHomePaths.forEach(function(sourceHomePath) {
        var sourceHome = new SourceHome(sourceHomePath);
        sourceHomeSet.add(sourceHome);
    });
    var compilerProperties = new CompilerProperties();
    compilerProperties.setProperty('outputDirectory', new Directory(outputPath));
    var compiler = new NodeJsAnnotateCompiler();
    compiler.compile(sourceHomeSet, compilerProperties);
};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = NodeJsAnnotateCompiler;
