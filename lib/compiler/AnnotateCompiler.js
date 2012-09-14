//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Class = require('../Class');
var Compiler = require('./Compiler');
var DependencyManager = require('./modules/DependencyManager');
var Directory = require('./Directory');
var OutputConcatenatedFile = require('./modules/OutputConcatenatedFile');
var Set = require('../Set');
var SourceHome = require("./SourceHome");


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var AnnotateCompiler = Class.extend(Compiler, {

    //-------------------------------------------------------------------------------
    // Constructor
    //-------------------------------------------------------------------------------

    _constructor: function() {

        this._super();


        //-------------------------------------------------------------------------------
        // Declare Variables
        //-------------------------------------------------------------------------------

        this.addCompilerModule(new DependencyManager());
        this.addCompilerModule(new OutputConcatenatedFile());
    }
});


//-------------------------------------------------------------------------------
// Static Methods
//-------------------------------------------------------------------------------

/**
 * @param {Array<string>} sourceHomePaths File paths to where your source code lives. Should be the root of your source files. Source files can be broken up in to multiple homes.
 * @param {string} outputPath
 */
AnnotateCompiler.compile = function(sourceHomePaths, outputPath) {
    var sourceHomeSet = new Set();
    sourceHomePaths.forEach(function(sourceHomePath) {
        var sourceHome = new SourceHome(sourceHomePath);
        sourceHomeSet.add(sourceHome);
    });
    var outputDirectory = new Directory(outputPath);
    var compiler = new AnnotateCompiler();
    return compiler.compile(sourceHomeSet, outputDirectory);
};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = AnnotateCompiler;
