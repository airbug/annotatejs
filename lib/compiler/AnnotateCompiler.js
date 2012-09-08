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

var MapAnnotations = require('./modules/MapAnnotations');
var OrderDependencies = require('./modules/OrderDependencies');
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

        this.addCompilerModule(new MapAnnotations());
        this.addCompilerModule(new OrderDependencies());
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


        // TODO BRN: Search through the source tree for annotate js annotations.
        // TODO BRN: Create Annotation objects for each one
        // TODO BRN: Pass each Annotation object to the CompilerAnnotationProcessors

        return this.application;
    },

    addCompilerModule: function(compilerModule) {
        this.compilerModuleList.add(compilerModule);
    },

    initialize: function() {

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
