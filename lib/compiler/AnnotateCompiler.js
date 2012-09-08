//-------------------------------------------------------------------------------
// Requires
//-------------------------------------------------------------------------------

var Application = require('./Application');
var Class = require('../Class');
var Directory = require('./Directory');
var JavascriptParser = require('./JavascriptParser');
var List = require('../List');
var Script = require('./Script');
var Set = require('../Set');
var SourcePath = require("./SourcePath");

var DependencyManager = require('./modules/DependencyManager');
var OutputConcatenatedFile = require('./modules/OutputConcatenatedFile');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

var AnnotateCompiler = Class.declare({

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
         * @type {Application}
         */
        this.application = new Application();

        /**
         * @private
         * @type {List}
         */
        this.compilerModuleList = new List();

        // TODO BRN: These should be broken out in to a file that's responsible for wiring up all the necessary modules
        // for outputting a client side js application. We'll then want to create another set of modules that are
        // responsible for outputting

        this.addCompilerModule(new DependencyManager());
        this.addCompilerModule(new OutputConcatenatedFile());
    },


    //-------------------------------------------------------------------------------
    // Getters and Setters
    //-------------------------------------------------------------------------------


    //-------------------------------------------------------------------------------
    // Class Methods
    //-------------------------------------------------------------------------------

    /**
     * @param {Set<SourcePath>} sourcePathSet
     * @param {Directory} outputDirectory
     */
    compile: function(sourcePathSet, outputDirectory) {
        this.application.setOutputDirectory(outputDirectory);
        var finalSourceFileSet = new Set();
        sourcePathSet.forEach(function(sourcePath) {
            var sourceFileSet = sourcePath.getSourceFiles();
            finalSourceFileSet.addAll(sourceFileSet);
        });

        this.initialize();

        var _this = this;
        finalSourceFileSet.forEach(function(sourceFile) {
            var sourceString = sourceFile.getSource();
            var javascriptParser = new JavascriptParser();

            //TEST
            var startTime = (new Date()).getTime();

            var sourceTree = javascriptParser.parse(sourceString);

            //TEST
            var endTime = (new Date()).getTime();
            console.log("Parsing completed in " + (endTime - startTime) + "ms");

            //TEST
            console.log(sourceTree.toString());

            var script = new Script(sourceTree, sourceFile);
            _this.application.addScript(script);
        });

        return this.application;
    },

    /**
     * @param {CompilerModule} compilerModule
     */
    addCompilerModule: function(compilerModule) {
        this.compilerModuleList.add(compilerModule);
    },

    /**
     *
     */
    initialize: function() {
        var _this = this;
        this.compilerModuleList.forEach(function(compilerModule) {
            compilerModule.initialize(_this.application);
        });
    }
});


//-------------------------------------------------------------------------------
// Static Methods
//-------------------------------------------------------------------------------

/**
 * @param {Array<string>} sourcePaths
 * @param {string} outputPath
 */
AnnotateCompiler.compile = function(sourcePaths, outputPath) {
    var sourcePathSet = new Set();
    sourcePaths.forEach(function(sourcePathString) {
        var sourcePath = new SourcePath(sourcePathString);
        sourcePathSet.add(sourcePath);
    });
    var outputDirectory = new Directory(outputPath);
    var compiler = new AnnotateCompiler();
    return compiler.compile(sourcePathSet, outputDirectory);
};


//-------------------------------------------------------------------------------
// Module Export
//-------------------------------------------------------------------------------

module.exports = AnnotateCompiler;
