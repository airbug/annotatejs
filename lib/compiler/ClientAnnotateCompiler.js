//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var AnnotateCompiler = require('./AnnotateCompiler');
var Class = require('../Class');
var CompilerProperties = require('./CompilerProperties');
var Directory = require('./Directory');
var OutputClientModule = require('./module/OutputClientModule');
var Set = require('../Set');
var SourceHome = require("./SourceHome");


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var ClientAnnotateCompiler = Class.extend(AnnotateCompiler, {

    //-------------------------------------------------------------------------------
    // Constructor
    //-------------------------------------------------------------------------------

    _constructor: function() {

        this._super();


        //-------------------------------------------------------------------------------
        // Declare Variables
        //-------------------------------------------------------------------------------

        this.addCompilerModule(new OutputClientModule());
    }
});


//-------------------------------------------------------------------------------
// Static Methods
//-------------------------------------------------------------------------------

/**
 * @param {Array<string>} sourceHomePaths File paths to where your source code lives. Should be the root of your source files. Source files can be broken up in to multiple homes.
 * @param {string} outputPath
 */
ClientAnnotateCompiler.compile = function(sourceHomePaths, outputPath, outputFileName) {
    var sourceHomeSet = new Set();
    sourceHomePaths.forEach(function(sourceHomePath) {
        var sourceHome = new SourceHome(sourceHomePath);
        sourceHomeSet.add(sourceHome);
    });
    var compilerProperties = new CompilerProperties();
    compilerProperties.setProperty('outputDirectory', new Directory(outputPath));
    compilerProperties.setProperty('outputFileName', outputFileName);
    var compiler = new ClientAnnotateCompiler();
    compiler.compile(sourceHomeSet, compilerProperties);
};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = ClientAnnotateCompiler;
